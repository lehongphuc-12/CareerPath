package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.dtos.Chat.ChatMessageRequest;
import com.example.CareerPath_BE.dtos.Chat.ChatMessageResponse;
import com.example.CareerPath_BE.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class WebSocketChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessageRequest request, Principal principal) {
        if (principal == null) {
            System.out.println("WebSocket message sender is anonymous or unauthenticated");
            return;
        }
        
        try {
            Integer senderId = Integer.valueOf(principal.getName());
            
            // Lưu tin nhắn vào Database
            ChatMessageResponse response = chatService.saveMessage(request.getRoomId(), senderId, request.getContent());
            
            // Broadcast tin nhắn tới toàn bộ client đã subscribe phòng này
            messagingTemplate.convertAndSend("/topic/room/" + request.getRoomId(), response);
        } catch (Exception e) {
            System.err.println("Lỗi xử lý gửi tin nhắn qua WebSocket: " + e.getMessage());
        }
    }
}
