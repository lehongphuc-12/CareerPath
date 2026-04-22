package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Assessment.QuestionResponseDto;

import java.util.List;

public interface IQuestionService {
    List<QuestionResponseDto> getAllQuestions();
}
