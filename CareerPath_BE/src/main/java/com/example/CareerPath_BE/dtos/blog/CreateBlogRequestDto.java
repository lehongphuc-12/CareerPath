package com.example.CareerPath_BE.dtos.blog;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBlogRequestDto {
    private String title;
    private String categoryName;
    private MultipartFile blogImage;
    private String content;
}
