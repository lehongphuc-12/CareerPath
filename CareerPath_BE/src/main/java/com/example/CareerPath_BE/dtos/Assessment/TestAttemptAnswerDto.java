package com.example.CareerPath_BE.dtos.Assessment;

public record TestAttemptAnswerDto(
        Integer questionId,
        String questionContent,
        Integer choiceId,
        String choiceContent,
        Integer answerScore
) {
}
