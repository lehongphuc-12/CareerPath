package com.example.CareerPath_BE.dtos.blog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogAiResponseDto {
    private String title;
    private String content;
}
