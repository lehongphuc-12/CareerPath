package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Chat.ChatMessageResponse;
import com.example.CareerPath_BE.dtos.Chat.ChatRoomResponse;
import com.example.CareerPath_BE.dtos.Chat.CreatePrivateRoomRequest;
import com.example.CareerPath_BE.dtos.Chat.ParticipantResponse;
import com.example.CareerPath_BE.services.ChatService;
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
    public ResponseEntity<ApiResponse<List<ParticipantResponse>>> getMentors() {
        List<ParticipantResponse> mentors = chatService.getMentors();
        return ResponseEntity.ok(ApiResponse.<List<ParticipantResponse>>builder()
                .success(true)
                .code(200)
                .message("Mentors retrieved successfully")
                .data(mentors)
                .build());
    }

    @GetMapping("/rooms")
    public ResponseEntity<ApiResponse<List<ChatRoomResponse>>> getRooms(@CookieValue(name = "token", required = false) String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
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
            @CookieValue(name = "token", required = false) String token,
            @PathVariable Integer roomId) {
        if (token == null || !jwtUtil.validateToken(token)) {
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
            @CookieValue(name = "token", required = false) String token,
            @RequestBody CreatePrivateRoomRequest request) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(ApiResponse.<ChatRoomResponse>builder()
                    .success(false)
                    .code(401)
                    .message("Yêu cầu đăng nhập")
                    .build());
        }
        Integer userId = jwtUtil.extractUserId(token).intValue();
        ChatRoomResponse room = chatService.getOrCreatePrivateRoom(userId, request.getTargetUserId());
        return ResponseEntity.ok(ApiResponse.<ChatRoomResponse>builder()
                .success(true)
                .code(200)
                .message("Lấy phòng trò chuyện thành công")
                .data(room)
                .build());
    }
}
