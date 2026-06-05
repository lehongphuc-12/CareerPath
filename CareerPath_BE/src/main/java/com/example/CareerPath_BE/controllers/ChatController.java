package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Chat.ChatMessageResponse;
import com.example.CareerPath_BE.dtos.Chat.ChatRoomResponse;
import com.example.CareerPath_BE.dtos.Chat.CreatePrivateRoomRequest;
import com.example.CareerPath_BE.dtos.Chat.ParticipantResponse;
import com.example.CareerPath_BE.services.ChatService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final JwtUtil jwtUtil;

    @GetMapping("/mentors")
    public ResponseEntity<ApiResponse<List<ParticipantResponse>>> getMentors(
            @RequestParam(required = false) Integer careerId) {
        List<ParticipantResponse> mentors = careerId != null
                ? chatService.getMentorsByCareerId(careerId)
                : chatService.getMentors();
        return ResponseEntity.ok(ApiResponse.<List<ParticipantResponse>>builder()
                .success(true)
                .code(200)
                .message("Mentors retrieved successfully")
                .data(mentors)
                .build());
    }

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getRooms(HttpServletRequest request) {
        String token = extractToken(request);
        if (!isValidToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<List<ChatRoomResponse>>builder()
                    .success(false)
                    .code(401)
                    .message("Yêu cầu đăng nhập")
                    .build());
        }
        Integer userId = jwtUtil.extractUserId(token).intValue();
        List<ChatRoomResponse> rooms = chatService.getUserRooms(userId);
        return ResponseEntity.ok(ApiResponse.<List<ChatRoomResponse>>builder()
                .success(true)
                .code(200)
                .message("Lấy danh sách cuộc trò chuyện thành công")
                .data(rooms)
                .build());
    }

    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>> getMessages(
            HttpServletRequest request,
            @PathVariable Integer roomId) {
        if (!isValidToken(extractToken(request))) {
            return ResponseEntity.status(401).body(ApiResponse.<List<ChatMessageResponse>>builder()
                    .success(false)
                    .code(401)
                    .message("Yêu cầu đăng nhập")
                    .build());
        }
        List<ChatMessageResponse> messages = chatService.getRoomMessages(roomId);
        return ResponseEntity.ok(ApiResponse.<List<ChatMessageResponse>>builder()
                .success(true)
                .code(200)
                .message("Lấy lịch sử tin nhắn thành công")
                .data(messages)
                .build());
    }

    @PostMapping("/rooms/private")
    public ResponseEntity<ApiResponse<ChatRoomResponse>> getOrCreatePrivateRoom(
            HttpServletRequest request,
            @RequestBody CreatePrivateRoomRequest body) {
        String token = extractToken(request);
        if (!isValidToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<ChatRoomResponse>builder()
                    .success(false)
                    .code(401)
                    .message("Yêu cầu đăng nhập")
                    .build());
        }
        Integer userId = jwtUtil.extractUserId(token).intValue();
        ChatRoomResponse room = chatService.getOrCreatePrivateRoom(userId, body.getTargetUserId());
        return ResponseEntity.ok(ApiResponse.<ChatRoomResponse>builder()
                .success(true)
                .code(200)
                .message("Lấy phòng trò chuyện thành công")
                .data(room)
                .build());
    }

    private String extractToken(HttpServletRequest request) {
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

    private boolean isValidToken(String token) {
        return token != null && jwtUtil.validateToken(token);
    }
}
