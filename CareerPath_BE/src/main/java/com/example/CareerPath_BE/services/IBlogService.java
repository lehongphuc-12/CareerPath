package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.entities.Blogs;
import java.util.List;

import org.springframework.data.domain.Page;

public interface IBlogService {
    Page<BlogResponseDto> getBlogs(int page, int size);
}
