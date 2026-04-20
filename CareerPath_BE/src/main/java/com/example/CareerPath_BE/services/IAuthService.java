package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Auth.LoginRequest;
import com.example.CareerPath_BE.dtos.Auth.RegisterRequest;
import com.example.CareerPath_BE.dtos.Auth.AuthResponse;

public interface IAuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
    AuthResponse.UserResponse getMe(String token);
}
