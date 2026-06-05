package com.example.CareerPath_BE.utils;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ErrorCode;
import com.example.CareerPath_BE.exceptions.AppException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public final class AuthUtils {

    private AuthUtils() {
    }

    public static String extractToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    public static String extractToken(String cookieToken) {
        return cookieToken;
    }

    public static Integer requireUserId(JwtUtil jwtUtil, String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED, "Yêu cầu đăng nhập");
        }
        return jwtUtil.extractUserId(token).intValue();
    }

    public static void requireRole(JwtUtil jwtUtil, String token, String roleName) {
        if (token == null || !jwtUtil.validateToken(token)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED, "Yêu cầu đăng nhập");
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean hasRole = roles.stream().anyMatch(r -> r.equalsIgnoreCase(roleName));
        if (!hasRole) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }
}
