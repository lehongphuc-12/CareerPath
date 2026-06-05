package com.example.CareerPath_BE.dtos.Assessment;

import java.util.Date;
import java.util.List;

public record TestAttemptDetailDto(
        Integer attemptId,
        Integer testId,
        String testName,
        String mbtiType,
        Integer totalQuestions,
        Integer completedQuestions,
        Integer scoreE,
        Integer scoreI,
        Integer scoreS,
        Integer scoreN,
        Integer scoreT,
        Integer scoreF,
        Integer scoreJ,
        Integer scoreP,
        Date completedAt,
        String resultSummary,
        TestFeedbackResponseDto feedback,
        List<TestAttemptAnswerDto> answers
) {
}
