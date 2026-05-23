package com.example.CareerPath_BE.dtos.Chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePrivateRoomRequest {
    private Integer targetUserId;
}
