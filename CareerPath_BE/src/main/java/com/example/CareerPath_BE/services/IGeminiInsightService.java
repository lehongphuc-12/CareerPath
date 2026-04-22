package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Assessment.AssessmentCareerMatchDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentInsightDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentTraitScoresDto;

import java.util.List;
import java.util.Map;

public interface IGeminiInsightService {
    AssessmentInsightDto generateAssessmentInsight(
            AssessmentTraitScoresDto traitScores,
            AssessmentTraitScoresDto preTestResult,
            Map<String, Integer> factorScores,
            List<AssessmentCareerMatchDto> recommendedCareers
    );
}
