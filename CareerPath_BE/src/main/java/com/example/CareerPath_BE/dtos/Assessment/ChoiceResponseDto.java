package com.example.CareerPath_BE.dtos.Assessment;

public record ChoiceResponseDto(
        Integer choiceId,
        String content,
        Integer scoreValue
) {
}
