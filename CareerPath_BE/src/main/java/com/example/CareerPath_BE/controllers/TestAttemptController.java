package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptDetailDto;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptListItemDto;
import com.example.CareerPath_BE.services.ITestAttemptService;
import com.example.CareerPath_BE.utils.AuthUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test-attempts")
@RequiredArgsConstructor
public class TestAttemptController {

    private final ITestAttemptService testAttemptService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TestAttemptListItemDto>>> getMyAttempts(HttpServletRequest request) {
        Integer userId = AuthUtils.requireUserId(jwtUtil, AuthUtils.extractToken(request));
        List<TestAttemptListItemDto> attempts = testAttemptService.getMyAttempts(userId);
        return ResponseEntity.ok(ApiResponse.<List<TestAttemptListItemDto>>builder()
                .success(true)
                .code(200)
                .message("Lấy lịch sử làm bài test thành công")
                .data(attempts)
                .build());
    }

    @GetMapping("/{attemptId}")
    public ResponseEntity<ApiResponse<TestAttemptDetailDto>> getAttemptDetail(
            HttpServletRequest request,
            @PathVariable Integer attemptId
    ) {
        Integer userId = AuthUtils.requireUserId(jwtUtil, AuthUtils.extractToken(request));
        TestAttemptDetailDto detail = testAttemptService.getAttemptDetail(userId, attemptId);
        return ResponseEntity.ok(ApiResponse.<TestAttemptDetailDto>builder()
                .success(true)
                .code(200)
                .message("Lấy chi tiết lần làm bài test thành công")
                .data(detail)
                .build());
    }
}
