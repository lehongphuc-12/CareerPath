package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCategoryResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCommentResponseDto;
import com.example.CareerPath_BE.dtos.blog.CreateCommentDto;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IBlogService {
    Page<BlogResponseDto> getBlogs(int page, int size, Integer categoryId);
    BlogDetailResponseDto getBlogDetail(int blogId);
    List<BlogCategoryResponseDto> getCategories();
    int likeBlog(int blogId, boolean isLike);
    List<BlogCommentResponseDto> getComments(int blogId);
    BlogCommentResponseDto addComment(int blogId, int userId, CreateCommentDto dto);
}

