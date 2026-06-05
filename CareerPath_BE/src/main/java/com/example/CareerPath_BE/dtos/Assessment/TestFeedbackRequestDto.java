package com.example.CareerPath_BE.dtos.Assessment;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record TestFeedbackRequestDto(
        @Min(1) @Max(5) Integer rating,
        @Size(max = 1000) String feedback
) {
}
