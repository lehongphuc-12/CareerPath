package com.example.CareerPath_BE.dtos.Career;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareerResponseDto {
    private int careerId;
    private String name;
    private String description;
    private String image;
    private BigDecimal min_salary;
    private BigDecimal max_salary;
    private Integer demand_level;
    private Integer categoryId;
    private String categoryName;
}
