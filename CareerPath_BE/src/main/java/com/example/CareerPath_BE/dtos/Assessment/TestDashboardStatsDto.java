package com.example.CareerPath_BE.dtos.Assessment;

import java.util.List;

public record TestDashboardStatsDto(
        Long totalAttempts,
        Long totalUsersWhoTookTest,
        String mostCommonMbtiType,
        List<MbtiCountDto> mbtiDistribution,
        List<PeriodCountDto> attemptsByDay,
        List<PeriodCountDto> attemptsByMonth,
        Double completionRate,
        Double averageRating,
        Long totalFeedbacks
) {
}
