package com.example.CareerPath_BE.dtos.Assessment;

import jakarta.validation.constraints.NotNull;

public record AssessmentAnswerRequestDto(
        @NotNull Integer questionId,
        @NotNull Integer choiceId
) {
}
