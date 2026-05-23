package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentResultResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentSubmitRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.QuestionResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.ChoiceResponseDto;
import com.example.CareerPath_BE.services.IAssessmentService;
import com.example.CareerPath_BE.services.IQuestionService;
import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.repositories.QuestionsRepository;
import com.example.CareerPath_BE.repositories.TestDimensionsRepository;
import com.example.CareerPath_BE.repositories.ChoicesRepository;
import com.example.CareerPath_BE.repositories.TestsRepository;
import com.example.CareerPath_BE.repositories.UserAnswersRepository;
import com.example.CareerPath_BE.entities.Questions;
import com.example.CareerPath_BE.entities.Choices;
import com.example.CareerPath_BE.entities.Tests;
import com.example.CareerPath_BE.entities.TestDimensions;
import com.example.CareerPath_BE.entities.UserAnswers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import lombok.Data;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final IQuestionService questionService;
    private final IAssessmentService assessmentService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private QuestionsRepository questionsRepository;
    @Autowired
    private TestDimensionsRepository testDimensionsRepository;
    @Autowired
    private ChoicesRepository choicesRepository;
    @Autowired
    private TestsRepository testsRepository;
    @Autowired
    private UserAnswersRepository userAnswersRepository;

    public QuestionController(IQuestionService questionService, IAssessmentService assessmentService) {
        this.questionService = questionService;
        this.assessmentService = assessmentService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<QuestionResponseDto>>> getQuestions() {
        List<QuestionResponseDto> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Questions fetched successfully", questions)
        );
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<AssessmentResultResponseDto>> submitAssessment(
            @Valid @RequestBody AssessmentSubmitRequestDto request
    ) {
        AssessmentResultResponseDto result = assessmentService.submitAssessment(request);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Assessment submitted successfully", result)
        );
    }

    @Data
    public static class CreateQuestionRequest {
        private String content;
        private String dimensionCode;
        private String direction;
        private Integer questionOrder;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<ApiResponse<QuestionResponseDto>> createQuestion(
            @CookieValue(name = "token", required = false) String token,
            @RequestBody CreateQuestionRequest request) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }

        Questions question = new Questions();
        question.setContent(request.getContent());
        question.setDirection(request.getDirection());
        question.setQuestionOrder(request.getQuestionOrder());

        // Fetch MBTI test (id = 1)
        Tests test = testsRepository.findById(1)
                .orElseGet(() -> testsRepository.findAll().stream().findFirst().orElse(null));
        question.setTests(test);

        // Fetch Dimension
        if (request.getDimensionCode() != null) {
            TestDimensions dim = testDimensionsRepository.findByCode(request.getDimensionCode()).orElse(null);
            question.setTestDimensions(dim);
        }

        Questions savedQuestion = questionsRepository.save(question);

        // Add 5 default choices
        String[] choiceContents = {
            "Hoàn toàn không đồng ý",
            "Không đồng ý",
            "Trung lập",
            "Đồng ý",
            "Hoàn toàn đồng ý"
        };
        for (int i = 0; i < 5; i++) {
            Choices choice = new Choices();
            choice.setQuestions(savedQuestion);
            choice.setContent(choiceContents[i]);
            choice.setScoreValue(i + 1);
            choice.setChoiceOrder(i + 1);
            choicesRepository.save(choice);
        }

        // Map to QuestionResponseDto
        List<ChoiceResponseDto> choiceDtos = choicesRepository.findAll().stream()
                .filter(c -> c.getQuestions() != null && c.getQuestions().getQuestionId().equals(savedQuestion.getQuestionId()))
                .map(c -> new ChoiceResponseDto(c.getChoiceId(), c.getContent(), c.getScoreValue()))
                .toList();

        QuestionResponseDto responseDto = new QuestionResponseDto(
                savedQuestion.getQuestionId(),
                savedQuestion.getContent(),
                savedQuestion.getTestDimensions() != null ? savedQuestion.getTestDimensions().getCode() : null,
                choiceDtos
        );

        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Question created successfully", responseDto));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<ApiResponse<QuestionResponseDto>> updateQuestion(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id,
            @RequestBody CreateQuestionRequest request) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }

        Questions question = questionsRepository.findById(id).orElse(null);
        if (question == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, 404, "Question not found", null));
        }

        question.setContent(request.getContent());
        question.setDirection(request.getDirection());
        if (request.getQuestionOrder() != null) {
            question.setQuestionOrder(request.getQuestionOrder());
        }

        if (request.getDimensionCode() != null) {
            TestDimensions dim = testDimensionsRepository.findByCode(request.getDimensionCode()).orElse(null);
            question.setTestDimensions(dim);
        }

        Questions updatedQuestion = questionsRepository.save(question);

        List<ChoiceResponseDto> choiceDtos = choicesRepository.findAll().stream()
                .filter(c -> c.getQuestions() != null && c.getQuestions().getQuestionId().equals(updatedQuestion.getQuestionId()))
                .map(c -> new ChoiceResponseDto(c.getChoiceId(), c.getContent(), c.getScoreValue()))
                .toList();

        QuestionResponseDto responseDto = new QuestionResponseDto(
                updatedQuestion.getQuestionId(),
                updatedQuestion.getContent(),
                updatedQuestion.getTestDimensions() != null ? updatedQuestion.getTestDimensions().getCode() : null,
                choiceDtos
        );

        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Question updated successfully", responseDto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }

        Questions question = questionsRepository.findById(id).orElse(null);
        if (question == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, 404, "Question not found", null));
        }

        // Delete choices and user answers referencing it
        List<Choices> choices = choicesRepository.findAll().stream()
                .filter(c -> c.getQuestions() != null && c.getQuestions().getQuestionId().equals(id))
                .toList();
        
        List<UserAnswers> answers = userAnswersRepository.findAll().stream()
                .filter(a -> a.getQuestions() != null && a.getQuestions().getQuestionId().equals(id))
                .toList();

        userAnswersRepository.deleteAll(answers);
        choicesRepository.deleteAll(choices);
        questionsRepository.delete(question);

        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Question deleted successfully", null));
    }
}

