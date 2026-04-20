package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Auth.LoginRequest;
import com.example.CareerPath_BE.dtos.Auth.RegisterRequest;
import com.example.CareerPath_BE.dtos.Auth.AuthResponse;
import com.example.CareerPath_BE.services.IAuthService;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.repositories.UsersRepository;
import com.example.CareerPath_BE.entities.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final UsersRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse login(LoginRequest request) {
        return null;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        return null;
    }

    @Override
    public AuthResponse.UserResponse getMe(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }

        Long userId = jwtUtil.extractUserId(token);
        Users user = userRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse.UserResponse(
                String.valueOf(user.getUserId()),
                user.getFullName(),
                user.getEmail(),
                user.getRoles().getName()
        );
    }
}
