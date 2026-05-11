package com.example.CareerPath_BE.dtos.blog;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogResponseDto {
    private Integer blogId;
    private String title;
    private String content;
    private String thumbnail;
    private String authorName;
    private String categoryName;
    private Date createdAt;
}
