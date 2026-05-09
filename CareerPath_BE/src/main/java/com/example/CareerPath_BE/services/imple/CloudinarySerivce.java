package com.example.CareerPath_BE.services.imple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.CareerPath_BE.services.ICloudinaryService;

import java.util.Map;

@Service
public class CloudinarySerivce implements ICloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file, String folder) {
        // TODO Auto-generated method stub
        try {
            validateFile(file);
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folder));
            return (String) uploadResult.get("secure_url");
        } catch (Exception e) {
            // TODO: handle exception
            throw new RuntimeException("Upload file failed", e);
        }
    }

    @Override
    public void deleteFile(String imageUrl) {
        try {
            String publicId = extractPublicId(imageUrl);

            cloudinary.uploader().destroy(
                publicId,
                ObjectUtils.emptyMap()
            );
        } catch (Exception e) {
            throw new RuntimeException("Delete file failed", e);
        }
    }

    @Override
    public void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        if (!file.getContentType().startsWith("image/")) {
            throw new RuntimeException("Only image files are allowed");
        }
        // max 5MB
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new RuntimeException("File size exceeds 5MB");
        }
    }
    @Override
    public String extractPublicId(String imageUrl) {
        try {
            String[] parts = imageUrl.split("/upload/");
            if (parts.length < 2) return null;
            
            String pathAfterUpload = parts[1];
            String[] pathParts = pathAfterUpload.split("/");
            
            StringBuilder publicIdBuilder = new StringBuilder();
            for (int i = 1; i < pathParts.length; i++) {
                if (i > 1) publicIdBuilder.append("/");
                publicIdBuilder.append(pathParts[i]);
            }
            
            String publicIdWithExtension = publicIdBuilder.toString();
            int lastDotIndex = publicIdWithExtension.lastIndexOf(".");
            if (lastDotIndex != -1) {
                return publicIdWithExtension.substring(0, lastDotIndex);
            }
            return publicIdWithExtension;
        } catch (Exception e) {
            throw new RuntimeException("Extract publicId failed", e);
        }
    }
}
