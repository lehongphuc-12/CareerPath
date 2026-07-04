package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackResponseDto;
import com.example.CareerPath_BE.dtos.ErrorCode;
import com.example.CareerPath_BE.entities.TestAttempts;
import com.example.CareerPath_BE.entities.TestFeedbacks;
import com.example.CareerPath_BE.entities.Users;
import com.example.CareerPath_BE.exceptions.AppException;
import com.example.CareerPath_BE.repositories.TestAttemptsRepository;
import com.example.CareerPath_BE.repositories.TestFeedbacksRepository;
import com.example.CareerPath_BE.repositories.UsersRepository;
import com.example.CareerPath_BE.services.ITestFeedbackService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class TestFeedbackService implements ITestFeedbackService {

    private final TestAttemptsRepository testAttemptsRepository;
    private final TestFeedbacksRepository testFeedbacksRepository;
    private final UsersRepository usersRepository;

    public TestFeedbackService(
            TestAttemptsRepository testAttemptsRepository,
            TestFeedbacksRepository testFeedbacksRepository,
            UsersRepository usersRepository
    ) {
        this.testAttemptsRepository = testAttemptsRepository;
        this.testFeedbacksRepository = testFeedbacksRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    @Transactional
    public TestFeedbackResponseDto submitFeedback(Integer userId, Integer attemptId, TestFeedbackRequestDto request) {
        TestAttempts attempt = testAttemptsRepository.findByAttemptIdAndUsers_UserId(attemptId, userId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_ATTEMPT_NOT_FOUND));

        if (attempt.getCompletedAt() == null) {
            throw new AppException(ErrorCode.TEST_NOT_COMPLETED);
        }

        if (testFeedbacksRepository.existsByTestAttempts_AttemptId(attemptId)) {
            throw new AppException(ErrorCode.FEEDBACK_ALREADY_EXISTS);
        }

        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        TestFeedbacks feedback = new TestFeedbacks();
        feedback.setTestAttempts(attempt);
        feedback.setUsers(user);
        feedback.setRating(request.rating());
        feedback.setFeedback(request.feedback());

        TestFeedbacks saved = testFeedbacksRepository.save(feedback);

        return new TestFeedbackResponseDto(
                saved.getFeedbackId(),
                attemptId,
                saved.getRating(),
                saved.getFeedback(),
                saved.getCreatedAt()
        );
    }
}
