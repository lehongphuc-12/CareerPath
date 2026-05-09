package com.example.CareerPath_BE.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.CreateBlogRequestDto;
import com.example.CareerPath_BE.dtos.blog.BlogCategoryResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCommentResponseDto;
import com.example.CareerPath_BE.dtos.blog.CreateCommentDto;
import com.example.CareerPath_BE.services.IBlogService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final IBlogService blogService;
    private final JwtUtil jwtUtil;

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

    @PostMapping("/{id}/like")
    public ResponseEntity<ApiResponse<Integer>> likeBlog(
            @PathVariable int id,
            @RequestParam boolean isLike) {
        int newLikeCount = blogService.likeBlog(id, isLike);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Blog liked successfully", newLikeCount));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<ApiResponse<List<BlogCommentResponseDto>>> getComments(@PathVariable int id) {
        List<BlogCommentResponseDto> comments = blogService.getComments(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Comments fetched successfully", comments));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<ApiResponse<BlogCommentResponseDto>> addComment(
            @PathVariable int id,
            @CookieValue(name = "token", required = false) String token,
            @RequestBody CreateCommentDto dto) {
        
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(
                    new ApiResponse<>(false, 401, "Unauthorized: Invalid or missing token", null));
        }
        
        int userId = jwtUtil.extractUserId(token).intValue();
        BlogCommentResponseDto comment = blogService.addComment(id, userId, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(true, 200, "Comment added successfully", comment));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<BlogDetailResponseDto>> createBlog(
        @ModelAttribute CreateBlogRequestDto request,
        @CookieValue(name = "token", required = true) String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(
                new ApiResponse<>(false, 401, "Unauthorized: Invalid or missing token", null));
        }
        int userId = jwtUtil.extractUserId(token).intValue();
        BlogDetailResponseDto blogDetail = blogService.createBlog(request, userId);
        return ResponseEntity.ok(
            new ApiResponse<>(true, 200, "Blog created successfully", blogDetail));
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<ApiResponse<Void>> incrementViewCount(@PathVariable int id) {
        blogService.incrementViewCount(id);
        return ResponseEntity.ok(
            new ApiResponse<>(true, 200, "View count incremented", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable int id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok(
            new ApiResponse<>(true, 200, "Blog deleted successfully", null));
    }

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<BlogDetailResponseDto>> updateBlog(
        @PathVariable int id,
        @ModelAttribute CreateBlogRequestDto request) {
        BlogDetailResponseDto blogDetail = blogService.updateBlog(id, request);
        return ResponseEntity.ok(
            new ApiResponse<>(true, 200, "Blog updated successfully", blogDetail));
    }
}
