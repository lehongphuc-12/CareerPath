package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import org.springframework.data.domain.Page;

public interface IBlogService {
    Page<BlogResponseDto> getBlogs(int page, int size);
    BlogDetailResponseDto getBlogDetail(int blogId);
}
