package com.example.CareerPath_BE.dtos.Assessment;

import java.util.Date;

public record TestAttemptListItemDto(
        Integer attemptId,
        Integer testId,
        String testName,
        String mbtiType,
        Integer totalQuestions,
        Integer completedQuestions,
        Date completedAt,
        String resultSummary,
        boolean hasFeedback
) {
}
