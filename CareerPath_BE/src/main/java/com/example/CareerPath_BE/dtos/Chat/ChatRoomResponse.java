package com.example.CareerPath_BE.dtos.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomResponse {
    private Integer roomId;
    private String name;
    private Boolean isGroup;
    private Date createdAt;
    private Date updatedAt;
    private ParticipantResponse otherParticipant;
    private ChatMessageResponse lastMessage;
}
