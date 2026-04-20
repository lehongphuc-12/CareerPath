package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.dtos.Auth.LoginRequest;
import com.example.CareerPath_BE.dtos.Auth.RegisterRequest;
import com.example.CareerPath_BE.dtos.Auth.AuthResponse;
import com.example.CareerPath_BE.services.IAuthService;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.repositories.UsersRepository;
import com.example.CareerPath_BE.entities.Users;
import com.example.CareerPath_BE.repositories.RolesRepository;
import com.example.CareerPath_BE.entities.Users;
import com.example.CareerPath_BE.entities.Roles;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final UsersRepository userRepository;
    private final RolesRepository roleRepository;
    private final JwtUtil jwtUtil;

    @Value("${google.client.id:placeholder}")
    private String googleClientId;

    @Override
    public AuthResponse login(LoginRequest request) {
        return null;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        return null;
    }

    @Override
    public AuthResponse loginWithGoogle(String idToken) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken googleIdToken = verifier.verify(idToken);
            if (googleIdToken == null) {
                throw new RuntimeException("Invalid Google ID Token");
            }

            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            String email = payload.getEmail();
            String fullName = (String) payload.get("name");

            Users user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        Users newUser = new Users();
                        newUser.setEmail(email);
                        newUser.setFullName(fullName);
                        newUser.setCreatedAt(new Date());
                        
                        // Default role: USER
                        Roles userRole = roleRepository.findByName("USER")
                                .orElseGet(() -> roleRepository.save(new Roles("USER")));
                        newUser.setRoles(userRole);
                        
                        return userRepository.save(newUser);
                    });

            String token = jwtUtil.generateToken(Long.valueOf(user.getUserId()), 
                    Collections.singletonList(user.getRoles().getName()));
                    
            AuthResponse response = new AuthResponse();
            response.setToken(token);
            response.setUser(new AuthResponse.UserResponse(
                    String.valueOf(user.getUserId()),
                    user.getFullName(),
                    user.getEmail(),
                    user.getRoles().getName()
            ));
            
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Google Authentication failed", e);
        }
    }

    @Override
    public AuthResponse.UserResponse getMe(String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (!jwtUtil.validateToken(token)) {
            return null;
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
