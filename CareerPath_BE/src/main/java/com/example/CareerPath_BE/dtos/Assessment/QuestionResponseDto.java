package com.example.CareerPath_BE.dtos.Assessment;

import java.util.List;

public record QuestionResponseDto(
        Integer questionId,
        String content,
        String dimension,
        List<ChoiceResponseDto> choices
) {
}
