package com.example.CareerPath_BE.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Career.CareerResponseDto;
import com.example.CareerPath_BE.services.ICareerService;

@RestController
@RequestMapping("/api/careers")
public class CareerController {
    @Autowired
    private ICareerService careerService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CareerResponseDto>>> getCareers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String sortField,  
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Page<CareerResponseDto> careers = careerService.getCareers(page, size, search, sortField, sortOrder);
        return ResponseEntity.ok(
                new ApiResponse<>(true,200,"Careers fetched successfully", careers)
        );
    }
}
