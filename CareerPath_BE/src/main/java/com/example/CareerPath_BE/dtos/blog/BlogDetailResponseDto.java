package com.example.CareerPath_BE.dtos.blog;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDetailResponseDto {
    private Integer blogId;
    private String title;
    private String content;
    private String imageUrl;
    private Date createdAt;
    private Date updatedAt;
    private Integer authorId;
    private String authorName;
    private Integer viewCount;
    private Integer commentCount;
    private Integer likeCount;
}
