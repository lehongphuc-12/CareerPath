package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.blog.BlogAiResponseDto;

public interface IGeminiService {
    String generateBlogContent(String title, String requirements);
    BlogAiResponseDto generateFullBlog(String requirements);
}
