package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Assessment.AdminTestAttemptDetailDto;
import com.example.CareerPath_BE.dtos.Assessment.AdminTestAttemptListItemDto;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptAnswerDto;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptDetailDto;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptListItemDto;
import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackResponseDto;
import com.example.CareerPath_BE.dtos.ErrorCode;
import com.example.CareerPath_BE.entities.TestAttempts;
import com.example.CareerPath_BE.entities.TestFeedbacks;
import com.example.CareerPath_BE.entities.UserAnswers;
import com.example.CareerPath_BE.exceptions.AppException;
import com.example.CareerPath_BE.repositories.TestAttemptsRepository;
import com.example.CareerPath_BE.repositories.TestFeedbacksRepository;
import com.example.CareerPath_BE.repositories.UserAnswersRepository;
import com.example.CareerPath_BE.services.ITestAttemptService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestAttemptService implements ITestAttemptService {

    private final TestAttemptsRepository testAttemptsRepository;
    private final TestFeedbacksRepository testFeedbacksRepository;
    private final UserAnswersRepository userAnswersRepository;

    public TestAttemptService(
            TestAttemptsRepository testAttemptsRepository,
            TestFeedbacksRepository testFeedbacksRepository,
            UserAnswersRepository userAnswersRepository
    ) {
        this.testAttemptsRepository = testAttemptsRepository;
        this.testFeedbacksRepository = testFeedbacksRepository;
        this.userAnswersRepository = userAnswersRepository;
    }

    @Override
    public List<TestAttemptListItemDto> getMyAttempts(Integer userId) {
        return testAttemptsRepository.findByUsers_UserIdOrderByCompletedAtDesc(userId).stream()
                .map(this::toListItem)
                .toList();
    }

    @Override
    public List<AdminTestAttemptListItemDto> getAllAttemptsForAdmin() {
        return testAttemptsRepository.findAllWithUserOrderByCompletedAtDesc().stream()
                .map(this::toAdminListItem)
                .toList();
    }

    @Override
    public AdminTestAttemptDetailDto getAttemptDetailForAdmin(Integer attemptId) {
        TestAttempts attempt = testAttemptsRepository.findById(attemptId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_ATTEMPT_NOT_FOUND));

        List<UserAnswers> answers = userAnswersRepository.findByAttemptIdWithQuestions(attemptId);
        TestFeedbackResponseDto feedback = testFeedbacksRepository.findByTestAttempts_AttemptId(attemptId)
                .map(this::toFeedbackResponse)
                .orElse(null);

        return new AdminTestAttemptDetailDto(
                attempt.getAttemptId(),
                attempt.getUsers() != null ? attempt.getUsers().getUserId() : null,
                attempt.getUsers() != null ? attempt.getUsers().getFullName() : null,
                attempt.getUsers() != null ? attempt.getUsers().getEmail() : null,
                attempt.getTests() != null ? attempt.getTests().getTestId() : null,
                attempt.getTests() != null ? attempt.getTests().getName() : null,
                attempt.getMbtiType(),
                attempt.getTotalQuestions(),
                attempt.getCompletedQuestions(),
                attempt.getScoreE(),
                attempt.getScoreI(),
                attempt.getScoreS(),
                attempt.getScoreN(),
                attempt.getScoreT(),
                attempt.getScoreF(),
                attempt.getScoreJ(),
                attempt.getScoreP(),
                attempt.getCompletedAt(),
                attempt.getResultSummary(),
                feedback,
                answers.stream().map(this::toAnswerDto).toList()
        );
    }

    @Override
    public TestAttemptDetailDto getAttemptDetail(Integer userId, Integer attemptId) {
        TestAttempts attempt = testAttemptsRepository.findByAttemptIdAndUsers_UserId(attemptId, userId)
                .orElseThrow(() -> new AppException(ErrorCode.TEST_ATTEMPT_NOT_FOUND));

        List<UserAnswers> answers = userAnswersRepository.findByAttemptIdWithQuestions(attemptId);
        TestFeedbackResponseDto feedback = testFeedbacksRepository.findByTestAttempts_AttemptId(attemptId)
                .map(this::toFeedbackResponse)
                .orElse(null);

        return new TestAttemptDetailDto(
                attempt.getAttemptId(),
                attempt.getTests() != null ? attempt.getTests().getTestId() : null,
                attempt.getTests() != null ? attempt.getTests().getName() : null,
                attempt.getMbtiType(),
                attempt.getTotalQuestions(),
                attempt.getCompletedQuestions(),
                attempt.getScoreE(),
                attempt.getScoreI(),
                attempt.getScoreS(),
                attempt.getScoreN(),
                attempt.getScoreT(),
                attempt.getScoreF(),
                attempt.getScoreJ(),
                attempt.getScoreP(),
                attempt.getCompletedAt(),
                attempt.getResultSummary(),
                feedback,
                answers.stream().map(this::toAnswerDto).toList()
        );
    }

    private AdminTestAttemptListItemDto toAdminListItem(TestAttempts attempt) {
        TestFeedbacks feedback = testFeedbacksRepository
                .findByTestAttempts_AttemptId(attempt.getAttemptId())
                .orElse(null);

        return new AdminTestAttemptListItemDto(
                attempt.getAttemptId(),
                attempt.getUsers() != null ? attempt.getUsers().getUserId() : null,
                attempt.getUsers() != null ? attempt.getUsers().getFullName() : null,
                attempt.getUsers() != null ? attempt.getUsers().getEmail() : null,
                attempt.getTests() != null ? attempt.getTests().getTestId() : null,
                attempt.getTests() != null ? attempt.getTests().getName() : null,
                attempt.getMbtiType(),
                attempt.getTotalQuestions(),
                attempt.getCompletedQuestions(),
                attempt.getCompletedAt(),
                attempt.getResultSummary(),
                feedback != null,
                feedback != null ? feedback.getRating() : null,
                feedback != null ? feedback.getFeedback() : null
        );
    }

    private TestAttemptListItemDto toListItem(TestAttempts attempt) {
        boolean hasFeedback = testFeedbacksRepository.existsByTestAttempts_AttemptId(attempt.getAttemptId());
        return new TestAttemptListItemDto(
                attempt.getAttemptId(),
                attempt.getTests() != null ? attempt.getTests().getTestId() : null,
                attempt.getTests() != null ? attempt.getTests().getName() : null,
                attempt.getMbtiType(),
                attempt.getTotalQuestions(),
                attempt.getCompletedQuestions(),
                attempt.getCompletedAt(),
                attempt.getResultSummary(),
                hasFeedback
        );
    }

    private TestAttemptAnswerDto toAnswerDto(UserAnswers answer) {
        return new TestAttemptAnswerDto(
                answer.getQuestions() != null ? answer.getQuestions().getQuestionId() : null,
                answer.getQuestions() != null ? answer.getQuestions().getContent() : null,
                answer.getChoices() != null ? answer.getChoices().getChoiceId() : null,
                answer.getChoices() != null ? answer.getChoices().getContent() : null,
                answer.getAnswerScore()
        );
    }

    private TestFeedbackResponseDto toFeedbackResponse(TestFeedbacks feedback) {
        return new TestFeedbackResponseDto(
                feedback.getFeedbackId(),
                feedback.getTestAttempts() != null ? feedback.getTestAttempts().getAttemptId() : null,
                feedback.getRating(),
                feedback.getFeedback(),
                feedback.getCreatedAt()
        );
    }
}
