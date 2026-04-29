package com.example.CareerPath_BE.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCategoryResponseDto;
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
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) Integer categoryId) {
        Page<BlogResponseDto> blogs = blogService.getBlogs(page, size, categoryId);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Blogs fetched successfully", blogs));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<BlogCategoryResponseDto>>> getCategories() {
        List<BlogCategoryResponseDto> categories = blogService.getCategories();
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Categories fetched successfully", categories));
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDetailResponseDto>> getBlogDetail(@PathVariable int id) {
        BlogDetailResponseDto blogDetail = blogService.getBlogDetail(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Blog fetched successfully", blogDetail));
    }
}
