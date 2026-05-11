package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.AssessmentAnswerRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentCareerMatchDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentInsightDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentResultResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentSubmitRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentTraitScoresDto;
import com.example.CareerPath_BE.entities.CareerFactors;
import com.example.CareerPath_BE.entities.Choices;
import com.example.CareerPath_BE.entities.QuestionFactors;
import com.example.CareerPath_BE.entities.Questions;
import com.example.CareerPath_BE.repositories.CareerFactorsRepository;
import com.example.CareerPath_BE.repositories.QuestionFactorsRepository;
import com.example.CareerPath_BE.repositories.QuestionsRepository;
import com.example.CareerPath_BE.services.IAssessmentService;
import com.example.CareerPath_BE.services.IGeminiInsightService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AssessmentService implements IAssessmentService {

    private final QuestionsRepository questionsRepository;
    private final QuestionFactorsRepository questionFactorsRepository;
    private final CareerFactorsRepository careerFactorsRepository;
    private final IGeminiInsightService geminiInsightService;

    public AssessmentService(
            QuestionsRepository questionsRepository,
            QuestionFactorsRepository questionFactorsRepository,
            CareerFactorsRepository careerFactorsRepository,
            IGeminiInsightService geminiInsightService
    ) {
        this.questionsRepository = questionsRepository;
        this.questionFactorsRepository = questionFactorsRepository;
        this.careerFactorsRepository = careerFactorsRepository;
        this.geminiInsightService = geminiInsightService;
    }

    @Override
    @Transactional
    public AssessmentResultResponseDto submitAssessment(AssessmentSubmitRequestDto request) {
        List<Questions> questions = questionsRepository.findAllWithChoices();
        Map<Integer, Questions> questionMap = questions.stream()
                .collect(Collectors.toMap(Questions::getQuestionId, question -> question));

        Map<Integer, List<QuestionFactors>> questionFactorsMap = questionFactorsRepository.findAllWithDetails()
                .stream()
                .collect(Collectors.groupingBy(qf -> qf.getQuestions().getQuestionId()));

        Map<String, BigDecimal> factorWeightedScores = new LinkedHashMap<>();
        Map<String, BigDecimal> factorWeightedMaxScores = new LinkedHashMap<>();

        for (AssessmentAnswerRequestDto answer : request.answers()) {
            Questions question = questionMap.get(answer.questionId());
            if (question == null) {
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

            for (QuestionFactors questionFactor : questionFactorsMap.getOrDefault(answer.questionId(), List.of())) {
                String factorName = questionFactor.getFactors().getName();
                BigDecimal weight = safeDecimal(questionFactor.getWeight());
                BigDecimal scoreContribution = BigDecimal.valueOf(selectedChoice.getScoreValue()).multiply(weight);
                BigDecimal maxContribution = BigDecimal.valueOf(5).multiply(weight);

                factorWeightedScores.merge(factorName, scoreContribution, BigDecimal::add);
                factorWeightedMaxScores.merge(factorName, maxContribution, BigDecimal::add);
            }
        }

        Map<String, Integer> factorScores = factorWeightedScores.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> toPercent(entry.getValue(), factorWeightedMaxScores.get(entry.getKey())),
                        (left, right) -> left,
                        LinkedHashMap::new
                ));

        AssessmentTraitScoresDto traitScores = buildTraitScores(factorScores);
        List<AssessmentCareerMatchDto> recommendedCareers = buildCareerRecommendations(factorScores);
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

    private List<AssessmentCareerMatchDto> buildCareerRecommendations(Map<String, Integer> factorScores) {
        Map<Integer, List<CareerFactors>> careerFactorMap = careerFactorsRepository.findAllWithDetails()
                .stream()
                .collect(Collectors.groupingBy(cf -> cf.getCareers().getCareerId()));

        return careerFactorMap.values()
                .stream()
                .map(factors -> {
                    CareerFactors first = factors.get(0);
                    BigDecimal weightedSum = BigDecimal.ZERO;
                    BigDecimal weightSum = BigDecimal.ZERO;

                    for (CareerFactors factor : factors) {
                        String factorName = factor.getFactors().getName();
                        BigDecimal careerWeight = safeDecimal(factor.getWeight());
                        BigDecimal userFactorScore = BigDecimal.valueOf(factorScores.getOrDefault(factorName, 0))
                                .divide(BigDecimal.valueOf(100), 6, RoundingMode.HALF_UP);

                        weightedSum = weightedSum.add(userFactorScore.multiply(careerWeight));
                        weightSum = weightSum.add(careerWeight);
                    }

                    int matchScore = weightSum.compareTo(BigDecimal.ZERO) == 0
                            ? 0
                            : weightedSum
                            .divide(weightSum, 6, RoundingMode.HALF_UP)
                            .multiply(BigDecimal.valueOf(100))
                            .setScale(0, RoundingMode.HALF_UP)
                            .intValue();

                    return new AssessmentCareerMatchDto(
                            first.getCareers().getCareerId(),
                            first.getCareers().getName(),
                            first.getCareers().getDescription(),
                            matchScore
                    );
                })
                .sorted(Comparator.comparing(AssessmentCareerMatchDto::matchScore).reversed())
                .limit(6)
                .toList();
    }

    private AssessmentTraitScoresDto buildTraitScores(Map<String, Integer> factorScores) {
        int logic = average(factorScores,
                "Thinking", "Analytical Thinking", "Critical Thinking", "Investigative", "Conventional");
        int creativity = average(factorScores,
                "Perceiving", "Artistic", "Enterprising");
        int communication = average(factorScores,
                "Extrovert", "Feeling", "Social", "Enterprising");
        int discipline = average(factorScores,
                "Judging", "Critical Thinking", "Conventional");
        int teamwork = average(factorScores,
                "Extrovert", "Feeling", "Social");
        int selfLearning = average(factorScores,
                "Introvert", "Investigative", "Analytical Thinking", "Perceiving");

        return new AssessmentTraitScoresDto(logic, creativity, communication, discipline, teamwork, selfLearning);
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

    private int average(Map<String, Integer> factorScores, String... factorNames) {
        int sum = 0;
        int count = 0;

        for (String factorName : factorNames) {
            Integer score = factorScores.get(factorName);
            if (score != null) {
                sum += score;
                count++;
            }
        }

        return count == 0 ? 0 : Math.round((float) sum / count);
    }

    private int toPercent(BigDecimal value, BigDecimal maxValue) {
        if (value == null || maxValue == null || maxValue.compareTo(BigDecimal.ZERO) == 0) {
            return 0;
        }

        return value
                .divide(maxValue, 6, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .intValue();
    }

    private BigDecimal safeDecimal(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}
