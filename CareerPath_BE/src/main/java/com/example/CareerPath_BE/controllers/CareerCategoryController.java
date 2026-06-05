package com.example.CareerPath_BE.controllers;

import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.entities.CareerCategories;
import com.example.CareerPath_BE.services.ICareerCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/career-categories")
public class CareerCategoryController {

    @Autowired
    private ICareerCategoryService categoryService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CareerCategories>>> getAllCategories() {
        List<CareerCategories> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Categories fetched successfully", categories));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CareerCategories>> getCategoryById(@PathVariable int id) {
        CareerCategories category = categoryService.getCategoryById(id);
        if (category == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, 404, "Category not found", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Category fetched successfully", category));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CareerCategories>> createCategory(
            @CookieValue(name = "token", required = false) String token,
            @RequestBody CareerCategories category) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        if (roles.stream().noneMatch(r -> r.equalsIgnoreCase("Admin"))) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }
        CareerCategories savedCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Category created successfully", savedCategory));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CareerCategories>> updateCategory(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id,
            @RequestBody CareerCategories category) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        if (roles.stream().noneMatch(r -> r.equalsIgnoreCase("Admin"))) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }
        CareerCategories updatedCategory = categoryService.updateCategory(id, category);
        if (updatedCategory == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, 404, "Category not found", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Category updated successfully", updatedCategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        if (roles.stream().noneMatch(r -> r.equalsIgnoreCase("Admin"))) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Category deleted successfully", null));
    }
}
