package com.example.CareerPath_BE.dtos.Career;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MajorDto {
    private Integer id;
    private String majorCode;
    private String majorName;
    private String groupCode;
    private Boolean isPrimary;
}
