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
public class ChatMessageResponse {
    private Integer messageId;
    private Integer roomId;
    private Integer senderId;
    private String senderName;
    private String content;
    private Date createdAt;
}
