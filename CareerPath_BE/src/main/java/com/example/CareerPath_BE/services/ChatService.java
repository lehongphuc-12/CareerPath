package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Chat.ChatMessageResponse;
import com.example.CareerPath_BE.dtos.Chat.ChatRoomResponse;
import com.example.CareerPath_BE.dtos.Chat.ParticipantResponse;

import java.util.List;

public interface ChatService {
    
    // Lấy tất cả Mentor từ database
    List<ParticipantResponse> getMentors();

    // Lấy Mentor theo ngành nghề (career_id)
    List<ParticipantResponse> getMentorsByCareerId(Integer careerId);
    
    // Lấy danh sách các cuộc trò chuyện của một User
    List<ChatRoomResponse> getUserRooms(Integer userId);
    
    // Lấy hoặc tạo phòng chat 1:1 giữa 2 User
    ChatRoomResponse getOrCreatePrivateRoom(Integer userId1, Integer userId2);
    
    // Lưu tin nhắn mới và broadcast qua WebSocket
    ChatMessageResponse saveMessage(Integer roomId, Integer senderId, String content);
    
    // Lấy lịch sử tin nhắn trong phòng
    List<ChatMessageResponse> getRoomMessages(Integer roomId);
}
