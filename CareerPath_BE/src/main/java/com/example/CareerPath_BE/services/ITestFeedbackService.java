package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackRequestDto;
import com.example.CareerPath_BE.dtos.Assessment.TestFeedbackResponseDto;

public interface ITestFeedbackService {

    TestFeedbackResponseDto submitFeedback(Integer userId, Integer attemptId, TestFeedbackRequestDto request);
}
