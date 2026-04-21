package com.example.CareerPath_BE.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * Standard generic API response wrapper.
 * 
 * @param <T> The type of the result payload.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    
    @Builder.Default
    boolean success = true;

    @Builder.Default
    int code = 1000; // Success code: 1000
    
    String message;
    
    T data;
}
