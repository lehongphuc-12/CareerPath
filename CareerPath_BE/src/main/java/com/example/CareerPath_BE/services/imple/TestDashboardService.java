package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.MbtiCountDto;
import com.example.CareerPath_BE.dtos.Assessment.PeriodCountDto;
import com.example.CareerPath_BE.dtos.Assessment.TestDashboardStatsDto;
import com.example.CareerPath_BE.repositories.TestAttemptsRepository;
import com.example.CareerPath_BE.repositories.TestFeedbacksRepository;
import com.example.CareerPath_BE.services.ITestDashboardService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestDashboardService implements ITestDashboardService {

    private final TestAttemptsRepository testAttemptsRepository;
    private final TestFeedbacksRepository testFeedbacksRepository;

    public TestDashboardService(
            TestAttemptsRepository testAttemptsRepository,
            TestFeedbacksRepository testFeedbacksRepository
    ) {
        this.testAttemptsRepository = testAttemptsRepository;
        this.testFeedbacksRepository = testFeedbacksRepository;
    }

    @Override
    public TestDashboardStatsDto getDashboardStats() {
        long totalAttempts = testAttemptsRepository.countCompletedAttempts();
        long totalUsers = testAttemptsRepository.countDistinctUsersWhoCompleted();
        String mostCommonMbti = testAttemptsRepository.findMostCommonMbtiType();

        List<MbtiCountDto> mbtiDistribution = testAttemptsRepository.countByMbtiType().stream()
                .map(row -> new MbtiCountDto(
                        row[0] != null ? row[0].toString() : null,
                        row[1] != null ? ((Number) row[1]).longValue() : 0L
                ))
                .toList();

        List<PeriodCountDto> attemptsByDay = testAttemptsRepository.countByDay().stream()
                .map(row -> new PeriodCountDto(
                        row[0] != null ? row[0].toString() : null,
                        row[1] != null ? ((Number) row[1]).longValue() : 0L
                ))
                .toList();

        List<PeriodCountDto> attemptsByMonth = testAttemptsRepository.countByMonth().stream()
                .map(row -> new PeriodCountDto(
                        row[0] != null ? row[0].toString() : null,
                        row[1] != null ? ((Number) row[1]).longValue() : 0L
                ))
                .toList();

        long allAttempts = testAttemptsRepository.countAllAttempts();
        long fullyCompleted = testAttemptsRepository.countFullyCompletedAttempts();
        double completionRate = allAttempts == 0 ? 0.0 : (fullyCompleted * 100.0) / allAttempts;

        Double averageRating = testFeedbacksRepository.findAverageRating();
        long totalFeedbacks = testFeedbacksRepository.count();

        return new TestDashboardStatsDto(
                totalAttempts,
                totalUsers,
                mostCommonMbti,
                mbtiDistribution,
                attemptsByDay,
                attemptsByMonth,
                Math.round(completionRate * 100.0) / 100.0,
                averageRating != null ? Math.round(averageRating * 100.0) / 100.0 : 0.0,
                totalFeedbacks
        );
    }
}
