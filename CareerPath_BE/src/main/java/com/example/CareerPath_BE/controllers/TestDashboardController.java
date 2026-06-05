package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Assessment.AdminTestAttemptDetailDto;
import com.example.CareerPath_BE.dtos.Assessment.AdminTestAttemptListItemDto;
import com.example.CareerPath_BE.dtos.Assessment.TestDashboardStatsDto;
import com.example.CareerPath_BE.services.ITestAttemptService;
import com.example.CareerPath_BE.services.ITestDashboardService;
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
@RequestMapping("/api/admin/test-dashboard")
@RequiredArgsConstructor
public class TestDashboardController {

    private final ITestDashboardService testDashboardService;
    private final ITestAttemptService testAttemptService;
    private final JwtUtil jwtUtil;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<TestDashboardStatsDto>> getDashboardStats(
            HttpServletRequest request
    ) {
        AuthUtils.requireRole(jwtUtil, AuthUtils.extractToken(request), "Admin");
        TestDashboardStatsDto stats = testDashboardService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.<TestDashboardStatsDto>builder()
                .success(true)
                .code(200)
                .message("Lấy thống kê bài test thành công")
                .data(stats)
                .build());
    }

    @GetMapping("/attempts")
    public ResponseEntity<ApiResponse<List<AdminTestAttemptListItemDto>>> getAllAttempts(
            HttpServletRequest request
    ) {
        AuthUtils.requireRole(jwtUtil, AuthUtils.extractToken(request), "Admin");
        List<AdminTestAttemptListItemDto> attempts = testAttemptService.getAllAttemptsForAdmin();
        return ResponseEntity.ok(ApiResponse.<List<AdminTestAttemptListItemDto>>builder()
                .success(true)
                .code(200)
                .message("Lấy danh sách kết quả bài test thành công")
                .data(attempts)
                .build());
    }

    @GetMapping("/attempts/{attemptId}")
    public ResponseEntity<ApiResponse<AdminTestAttemptDetailDto>> getAttemptDetail(
            HttpServletRequest request,
            @PathVariable Integer attemptId
    ) {
        AuthUtils.requireRole(jwtUtil, AuthUtils.extractToken(request), "Admin");
        AdminTestAttemptDetailDto detail = testAttemptService.getAttemptDetailForAdmin(attemptId);
        return ResponseEntity.ok(ApiResponse.<AdminTestAttemptDetailDto>builder()
                .success(true)
                .code(200)
                .message("Lấy chi tiết kết quả bài test thành công")
                .data(detail)
                .build());
    }
}
