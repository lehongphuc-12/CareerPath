package com.example.CareerPath_BE.dtos.Assessment;

import java.util.List;
import java.util.Map;

public record AssessmentResultResponseDto(
        AssessmentTraitScoresDto traitScores,
        AssessmentTraitScoresDto preTestResult,
        Integer biasPercentage,
        Map<String, Integer> factorScores,
        AssessmentInsightDto insight,
        List<AssessmentCareerMatchDto> recommendedCareers,
        Integer attemptId,
        String mbtiType,
        Integer scoreE,
        Integer scoreI,
        Integer scoreS,
        Integer scoreN,
        Integer scoreT,
        Integer scoreF,
        Integer scoreJ,
        Integer scoreP,
        Integer totalQuestions,
        Integer completedQuestions,
        String resultSummary
) {
}
