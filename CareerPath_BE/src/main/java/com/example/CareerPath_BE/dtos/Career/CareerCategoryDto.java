package com.example.CareerPath_BE.dtos.Career;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareerCategoryDto {
    private Integer categoryId;
    private String name;
    private String description;
    private String image;
}
