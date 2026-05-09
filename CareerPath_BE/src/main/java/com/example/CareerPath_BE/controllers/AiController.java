package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.blog.BlogAiResponseDto;
import com.example.CareerPath_BE.services.IGeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/ai")
@RequiredArgsConstructor
public class AiController {

    private final IGeminiService geminiService;

    @PostMapping("/generate-blog")
    public ResponseEntity<ApiResponse<BlogAiResponseDto>> generateBlog(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String requirements = request.get("requirements");
        
        try {
            BlogAiResponseDto result;
            if (title == null || title.isBlank()) {
                result = geminiService.generateFullBlog(requirements);
            } else {
                String content = geminiService.generateBlogContent(title, requirements);
                result = new BlogAiResponseDto(title, content);
            }
            return ResponseEntity.ok(new ApiResponse<>(true, 200, "Content generated successfully", result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, 500, e.getMessage(), null));
        }
    }
}
