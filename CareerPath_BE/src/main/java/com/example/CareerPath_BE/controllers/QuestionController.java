package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentResultResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentSubmitRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.QuestionResponseDto;
import com.example.CareerPath_BE.services.IAssessmentService;
import com.example.CareerPath_BE.services.IQuestionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final IQuestionService questionService;
    private final IAssessmentService assessmentService;

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
}
