package com.example.CareerPath_BE.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CareerPath_BE.dtos.Auth.LoginRequest;
import com.example.CareerPath_BE.dtos.Auth.RegisterRequest;
import com.example.CareerPath_BE.dtos.Auth.GoogleLoginRequest;
import com.example.CareerPath_BE.dtos.Auth.AuthResponse;
import com.example.CareerPath_BE.services.IAuthService;     

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return createResponseWithCookie(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return createResponseWithCookie(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
        AuthResponse response = authService.loginWithGoogle(request.getIdToken());
        return createResponseWithCookie(response);
    }

    @GetMapping("/me")
    public AuthResponse.UserResponse getMe(@CookieValue(name = "token", required = false) String token) {
        return authService.getMe(token);
    }

    private ResponseEntity<AuthResponse> createResponseWithCookie(AuthResponse response) {
        if (response != null && response.getMessage() != null) {
            return ResponseEntity.badRequest().body(response);
        }
        if (response == null || response.getToken() == null) {
            return ResponseEntity.badRequest().body(response);
        }

        ResponseCookie cookie = ResponseCookie.from("token", response.getToken())
                .httpOnly(true)
                .secure(false) // Set to true in production
                .path("/")
                .maxAge(3600) // 1 hour
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }
}
