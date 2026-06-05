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

    // ===== CAREER CATEGORY API =====
    public static final String CAREER_CATEGORY_BASE = "/api/career-categories";
    public static final String CAREER_CATEGORY_ALL = "/api/career-categories/**";

    // ===== TEST ATTEMPT API =====
    public static final String TEST_ATTEMPT_BASE = "/api/test-attempts";
    public static final String TEST_ATTEMPT_ALL = "/api/test-attempts/**";

    // ===== ADMIN TEST DASHBOARD API =====
    public static final String ADMIN_TEST_DASHBOARD_BASE = "/api/admin/test-dashboard";
    public static final String ADMIN_TEST_DASHBOARD_ALL = "/api/admin/test-dashboard/**";

    // ===== PUBLIC ENDPOINTS (không cần xác thực) =====
    public static final String[] PUBLIC_ENDPOINTS = {
        AUTH_ALL,
        CAREER_BASE,
        CAREER_ALL,
        QUESTION_BASE,
        CAREER_CATEGORY_BASE,
        CAREER_CATEGORY_ALL
    };
}
