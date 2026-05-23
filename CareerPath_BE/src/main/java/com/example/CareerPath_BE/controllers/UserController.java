package com.example.CareerPath_BE.controllers;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.User.UpdateProfileRequest;
import com.example.CareerPath_BE.dtos.User.UserDetailResponse;
import com.example.CareerPath_BE.dtos.Auth.AuthResponse;
import com.example.CareerPath_BE.services.imple.UserService;
import com.example.CareerPath_BE.repositories.UsersRepository;
import com.example.CareerPath_BE.repositories.RolesRepository;
import com.example.CareerPath_BE.repositories.UserProfilesRepository;
import com.example.CareerPath_BE.entities.Users;
import com.example.CareerPath_BE.entities.Roles;
import com.example.CareerPath_BE.entities.UserProfiles;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UsersRepository usersRepository;
    private final RolesRepository rolesRepository;
    private final UserProfilesRepository userProfilesRepository;


    @GetMapping("/profile/{id}")
    public ResponseEntity<ApiResponse<UserDetailResponse>> getProfile(@PathVariable int id) {
        UserDetailResponse userDetailResponse = userService.getUserProfile(id);
        return ResponseEntity.ok(ApiResponse.<UserDetailResponse>builder()
                .code(200)
                .message("Get profile successfully")
                .data(userDetailResponse)
                .build());
    }

    @GetMapping("/profile/me")
    public ResponseEntity<ApiResponse<UserDetailResponse>> getMyProfile(@CookieValue("token") String token) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<UserDetailResponse>builder()
                    .code(401)
                    .message("Invalid token")
                    .build());
        }
        int id = jwtUtil.extractUserId(token).intValue();
        UserDetailResponse userDetailResponse = userService.getUserProfile(id);
        return ResponseEntity.ok(ApiResponse.<UserDetailResponse>builder()
                .code(200)
                .message("Get profile successfully")
                .data(userDetailResponse)
                .build());
    }

    @PutMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<UserDetailResponse>> updateProfile(
            @CookieValue("token") String token,
            @ModelAttribute UpdateProfileRequest request) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<UserDetailResponse>builder()
                    .code(401)
                    .message("Invalid token")
                    .build());
        }
        int id = jwtUtil.extractUserId(token).intValue();
        UserDetailResponse updatedProfile = userService.updateProfile(id, request);
        return ResponseEntity.ok(ApiResponse.<UserDetailResponse>builder()
                .code(200)
                .message("Update profile successfully")
                .data(updatedProfile)
                .build());
    }

    @GetMapping("/roles")
    public ResponseEntity<ApiResponse<List<String>>> getAllRoles(@CookieValue(name = "token", required = false) String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<List<String>>builder()
                    .code(401)
                    .message("Invalid token")
                    .build());
        }
        List<String> roleNames = rolesRepository.findAll().stream()
                .map(Roles::getName)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.<List<String>>builder()
                .code(200)
                .message("Get all roles successfully")
                .success(true)
                .data(roleNames)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AuthResponse.UserResponse>>> getAllUsers(@CookieValue(name = "token", required = false) String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<List<AuthResponse.UserResponse>>builder()
                    .code(401)
                    .message("Invalid token")
                    .build());
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(ApiResponse.<List<AuthResponse.UserResponse>>builder()
                    .code(403)
                    .message("Access denied: Admin role required")
                    .build());
        }
        List<Users> users = usersRepository.findAll();
        List<AuthResponse.UserResponse> userResponses = users.stream().map(u -> new AuthResponse.UserResponse(
                String.valueOf(u.getUserId()),
                u.getFullName(),
                u.getEmail(),
                u.getRoles() != null ? u.getRoles().getName() : "User"
        )).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.<List<AuthResponse.UserResponse>>builder()
                .code(200)
                .message("Get all users successfully")
                .success(true)
                .data(userResponses)
                .build());
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<ApiResponse<Void>> updateUserRole(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id,
            @RequestParam String roleName) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<Void>builder().code(401).message("Invalid token").build());
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(ApiResponse.<Void>builder().code(403).message("Access denied: Admin role required").build());
        }
        Users user = usersRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(ApiResponse.<Void>builder().code(404).message("User not found").build());
        }
        Roles role = rolesRepository.findByName(roleName)
                .orElseGet(() -> rolesRepository.save(new Roles(roleName)));
        user.setRoles(role);
        usersRepository.save(user);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("User role updated successfully")
                .success(true)
                .build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<Void>builder().code(401).message("Invalid token").build());
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(ApiResponse.<Void>builder().code(403).message("Access denied: Admin role required").build());
        }
        Users user = usersRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(ApiResponse.<Void>builder().code(404).message("User not found").build());
        }
        // Delete profile first to satisfy foreign keys
        UserProfiles profile = userProfilesRepository.findByUsersUserId(id);
        if (profile != null) {
            userProfilesRepository.delete(profile);
        }
        usersRepository.delete(user);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .code(200)
                .message("User deleted successfully")
                .success(true)
                .build());
    }
}

