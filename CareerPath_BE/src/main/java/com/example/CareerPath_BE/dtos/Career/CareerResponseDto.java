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
    private BigDecimal avgSalary;
    private Integer demandLevel;
}
