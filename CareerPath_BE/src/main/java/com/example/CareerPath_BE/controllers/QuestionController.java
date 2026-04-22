package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Assessment.QuestionResponseDto;
import com.example.CareerPath_BE.services.IQuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final IQuestionService questionService;

    public QuestionController(IQuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<QuestionResponseDto>>> getQuestions() {
        List<QuestionResponseDto> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Questions fetched successfully", questions)
        );
    }
}
