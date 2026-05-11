package com.example.CareerPath_BE.dtos.Assessment;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.Map;

public record AssessmentSubmitRequestDto(
        @NotEmpty List<@Valid AssessmentAnswerRequestDto> answers,
        AssessmentTraitScoresDto preTestResult,
        Map<String, Double> academicScores
) {
}
