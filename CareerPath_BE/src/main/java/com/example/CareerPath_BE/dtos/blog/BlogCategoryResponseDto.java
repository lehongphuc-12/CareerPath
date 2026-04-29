package com.example.CareerPath_BE.dtos.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogCategoryResponseDto {
    private Integer categoryId;
    private String name;
    private String slug;
}
