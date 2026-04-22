package com.example.CareerPath_BE.dtos.Assessment;

public record AssessmentCareerMatchDto(
        Integer careerId,
        String name,
        String description,
        Integer matchScore
) {
}
