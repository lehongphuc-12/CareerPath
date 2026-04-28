package com.example.CareerPath_BE.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.services.IBlogService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final IBlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<BlogResponseDto>>> getBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Page<BlogResponseDto> blogs = blogService.getBlogs(page, size);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Blogs fetched successfully", blogs));
    }
}
