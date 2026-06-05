package com.example.CareerPath_BE.dtos.Assessment;

import java.util.Date;

public record TestFeedbackResponseDto(
        Integer feedbackId,
        Integer attemptId,
        Integer rating,
        String feedback,
        Date createdAt
) {
}
