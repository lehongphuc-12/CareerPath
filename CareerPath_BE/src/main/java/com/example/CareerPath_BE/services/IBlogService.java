package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCategoryResponseDto;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IBlogService {
    Page<BlogResponseDto> getBlogs(int page, int size, Integer categoryId);
    BlogDetailResponseDto getBlogDetail(int blogId);
    List<BlogCategoryResponseDto> getCategories();
}

