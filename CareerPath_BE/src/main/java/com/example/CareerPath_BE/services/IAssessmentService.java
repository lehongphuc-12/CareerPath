package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Assessment.AssessmentResultResponseDto;
import com.example.CareerPath_BE.dtos.Assessment.AssessmentSubmitRequestDto;

public interface IAssessmentService {
    AssessmentResultResponseDto submitAssessment(AssessmentSubmitRequestDto request);
}
