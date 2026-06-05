package com.example.CareerPath_BE.dtos.Assessment;

import java.util.Date;

public record AdminTestAttemptListItemDto(
        Integer attemptId,
        Integer userId,
        String userName,
        String userEmail,
        Integer testId,
        String testName,
        String mbtiType,
        Integer totalQuestions,
        Integer completedQuestions,
        Date completedAt,
        String resultSummary,
        boolean hasFeedback,
        Integer rating,
        String feedback
) {
}
