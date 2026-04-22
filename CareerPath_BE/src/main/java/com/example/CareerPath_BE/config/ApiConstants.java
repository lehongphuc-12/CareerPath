package com.example.CareerPath_BE.config;

/**
 * API Constants - Quản lý tất cả các đường dẫn API
 * Dễ dàng sửa đổi, thêm hoặc xóa API endpoints
 */
public class ApiConstants {

    // ===== AUTH API =====
    public static final String AUTH_BASE = "/api/auth";
    public static final String AUTH_ALL = "/api/auth/**";

    // ===== CAREER API =====
    public static final String CAREER_BASE = "/api/careers";
    public static final String CAREER_ALL = "/api/careers/**";

    // ===== QUESTION API =====
    public static final String QUESTION_BASE = "/api/questions";
    public static final String QUESTION_ALL = "/api/questions/**";

    // ===== PUBLIC ENDPOINTS (không cần xác thực) =====
    public static final String[] PUBLIC_ENDPOINTS = {
        AUTH_ALL,
        CAREER_BASE,
        CAREER_ALL,
        QUESTION_BASE,
        QUESTION_ALL
    };
}
