package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.AssessmentAnswerRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentCareerMatchDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentInsightDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentResultResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentSubmitRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentTraitScoresDto;
import com.example.CareerPath_BE.entities.Choices;
import com.example.CareerPath_BE.entities.Questions;
import com.example.CareerPath_BE.entities.CareerMbtiMatches;
import com.example.CareerPath_BE.repositories.QuestionsRepository;
import com.example.CareerPath_BE.repositories.CareerMbtiMatchesRepository;
import com.example.CareerPath_BE.services.IAssessmentService;
import com.example.CareerPath_BE.services.IGeminiInsightService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AssessmentService implements IAssessmentService {

    private final QuestionsRepository questionsRepository;
    private final CareerMbtiMatchesRepository careerMbtiMatchesRepository;
    private final IGeminiInsightService geminiInsightService;

    public AssessmentService(
            QuestionsRepository questionsRepository,
            CareerMbtiMatchesRepository careerMbtiMatchesRepository,
            IGeminiInsightService geminiInsightService
    ) {
        this.questionsRepository = questionsRepository;
        this.careerMbtiMatchesRepository = careerMbtiMatchesRepository;
        this.geminiInsightService = geminiInsightService;
    }

    @Override
    @Transactional
    public AssessmentResultResponseDto submitAssessment(AssessmentSubmitRequestDto request) {
        List<Questions> questions = questionsRepository.findAllWithChoices();
        Map<Integer, Questions> questionMap = questions.stream()
                .collect(Collectors.toMap(Questions::getQuestionId, question -> question));

        Map<String, Integer> sideScores = new LinkedHashMap<>();
        for (String side : List.of("E", "I", "S", "N", "T", "F", "J", "P")) {
            sideScores.put(side, 0);
        }

        for (AssessmentAnswerRequestDto answer : request.answers()) {
            Questions question = questionMap.get(answer.questionId());
            if (question == null || question.getTestDimensions() == null || question.getDirection() == null) {
                continue;
            }

            Choices selectedChoice = question.getChoiceses()
                    .stream()
                    .filter(choice -> answer.choiceId().equals(choice.getChoiceId()))
                    .findFirst()
                    .orElse(null);

            if (selectedChoice == null || selectedChoice.getScoreValue() == null) {
                continue;
            }

            int score = selectedChoice.getScoreValue();
            String direction = question.getDirection().trim().toUpperCase();
            String positiveSide = question.getTestDimensions().getPositiveSide() != null 
                    ? question.getTestDimensions().getPositiveSide().trim().toUpperCase() : "";
            String negativeSide = question.getTestDimensions().getNegativeSide() != null 
                    ? question.getTestDimensions().getNegativeSide().trim().toUpperCase() : "";

            if (direction.equals(positiveSide)) {
                sideScores.put(positiveSide, sideScores.getOrDefault(positiveSide, 0) + score);
                sideScores.put(negativeSide, sideScores.getOrDefault(negativeSide, 0) + (6 - score));
            } else if (direction.equals(negativeSide)) {
                sideScores.put(negativeSide, sideScores.getOrDefault(negativeSide, 0) + score);
                sideScores.put(positiveSide, sideScores.getOrDefault(positiveSide, 0) + (6 - score));
            }
        }

        Map<String, Integer> factorScores = new LinkedHashMap<>();
        autoCalcPct("E", "I", sideScores, factorScores);
        autoCalcPct("S", "N", sideScores, factorScores);
        autoCalcPct("T", "F", sideScores, factorScores);
        autoCalcPct("J", "P", sideScores, factorScores);

        String mbtiEOrI = (factorScores.getOrDefault("E", 0) >= 50) ? "E" : "I";
        String mbtiSOrN = (factorScores.getOrDefault("S", 0) >= 50) ? "S" : "N";
        String mbtiTOrF = (factorScores.getOrDefault("T", 0) >= 50) ? "T" : "F";
        String mbtiJOrP = (factorScores.getOrDefault("J", 0) >= 50) ? "J" : "P";
        String mbtiType = mbtiEOrI + mbtiSOrN + mbtiTOrF + mbtiJOrP;

        int logic = factorScores.getOrDefault("T", 0);
        int creativity = factorScores.getOrDefault("N", 0);
        int communication = factorScores.getOrDefault("E", 0);
        int discipline = factorScores.getOrDefault("J", 0);
        int teamwork = factorScores.getOrDefault("F", 0);
        int selfLearning = factorScores.getOrDefault("I", 0);

        AssessmentTraitScoresDto traitScores = new AssessmentTraitScoresDto(logic, creativity, communication, discipline, teamwork, selfLearning);

        List<CareerMbtiMatches> matches = careerMbtiMatchesRepository.findAllByMbtiTypeWithCareers(mbtiType);
        List<AssessmentCareerMatchDto> recommendedCareers = matches.stream()
                .sorted((a, b) -> b.getCompatibilityScore().compareTo(a.getCompatibilityScore()))
                .map(match -> new AssessmentCareerMatchDto(
                        match.getCareers().getCareerId(),
                        match.getCareers().getName(),
                        match.getCareers().getDescription(),
                        match.getCompatibilityScore()
                ))
                .limit(6)
                .collect(Collectors.toList());

        AssessmentInsightDto insight = geminiInsightService.generateAssessmentInsight(
                traitScores,
                request.preTestResult(),
                factorScores,
                recommendedCareers,
                request.academicScores()
        );

        return new AssessmentResultResponseDto(
                traitScores,
                request.preTestResult(),
                calculateBias(traitScores, request.preTestResult()),
                factorScores,
                insight,
                recommendedCareers
        );
    }

    private void autoCalcPct(String pos, String neg, Map<String, Integer> sideScores, Map<String, Integer> factorScores) {
        int posScore = sideScores.getOrDefault(pos, 0);
        int negScore = sideScores.getOrDefault(neg, 0);
        int total = posScore + negScore;
        if (total == 0) {
            factorScores.put(pos, 50);
            factorScores.put(neg, 50);
        } else {
            int posPct = Math.round(100.0f * posScore / total);
            factorScores.put(pos, posPct);
            factorScores.put(neg, 100 - posPct);
        }
    }

    private int calculateBias(AssessmentTraitScoresDto actual, AssessmentTraitScoresDto perception) {
        if (perception == null) {
            return 0;
        }

        List<Integer> diffs = List.of(
                Math.abs(actual.logic() - perception.logic()),
                Math.abs(actual.creativity() - perception.creativity()),
                Math.abs(actual.communication() - perception.communication()),
                Math.abs(actual.discipline() - perception.discipline()),
                Math.abs(actual.teamwork() - perception.teamwork()),
                Math.abs(actual.selfLearning() - perception.selfLearning())
        );

        return (int) Math.round(diffs.stream().mapToInt(Integer::intValue).average().orElse(0));
    }
}
