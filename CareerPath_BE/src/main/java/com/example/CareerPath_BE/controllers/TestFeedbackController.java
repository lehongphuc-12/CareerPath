package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackResponseDto;
import com.example.CareerPath_BE.services.ITestFeedbackService;
import com.example.CareerPath_BE.utils.AuthUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test-attempts")
@RequiredArgsConstructor
public class TestFeedbackController {

    private final ITestFeedbackService testFeedbackService;
    private final JwtUtil jwtUtil;

    @PostMapping("/{attemptId}/feedback")
    public ResponseEntity<ApiResponse<TestFeedbackResponseDto>> submitFeedback(
            HttpServletRequest request,
            @PathVariable Integer attemptId,
            @Valid @RequestBody TestFeedbackRequestDto body
    ) {
        Integer userId = AuthUtils.requireUserId(jwtUtil, AuthUtils.extractToken(request));
        TestFeedbackResponseDto feedback = testFeedbackService.submitFeedback(userId, attemptId, body);
        return ResponseEntity.ok(ApiResponse.<TestFeedbackResponseDto>builder()
                .success(true)
                .code(200)
                .message("Gửi đánh giá bài test thành công")
                .data(feedback)
                .build());
    }
}
