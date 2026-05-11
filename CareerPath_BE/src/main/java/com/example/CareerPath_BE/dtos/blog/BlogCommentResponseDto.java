package com.example.CareerPath_BE.dtos.blog;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogCommentResponseDto {
    private Integer commentId;
    private Integer blogId;
    private Integer userId;
    private String userName;
    private String content;
    private Date createdAt;
}
