package com.example.CareerPath_BE.dtos.Chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantResponse {
    private Integer userId;
    private String fullName;
    private String email;
    private String image;
    private String role;
}
