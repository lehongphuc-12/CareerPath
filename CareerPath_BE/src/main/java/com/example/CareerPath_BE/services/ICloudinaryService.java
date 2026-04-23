package com.example.CareerPath_BE.services;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryService {
    String uploadFile(MultipartFile file, String folder);
    void deleteFile(String imageUrl);
    void validateFile(MultipartFile file);
    String extractPublicId(String imageUrl);
}
