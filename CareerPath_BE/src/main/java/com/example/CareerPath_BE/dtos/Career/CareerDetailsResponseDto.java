package com.example.CareerPath_BE.dtos.Career;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CareerDetailsResponseDto {
    private int careerId;
    private String name;
    private String description;
    private String image;
    private BigDecimal min_salary;
    private BigDecimal max_salary;
    private Integer demand_level;
    private List<MajorDto> relatedMajors;
}
