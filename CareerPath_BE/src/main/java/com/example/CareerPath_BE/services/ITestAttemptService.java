package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.dtos.Assessment.AdminTestAttemptDetailDto;
import com.example.CareerPath_BE.dtos.Assessment.AdminTestAttemptListItemDto;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptDetailDto;
import com.example.CareerPath_BE.dtos.Assessment.TestAttemptListItemDto;

import java.util.List;

public interface ITestAttemptService {

    List<TestAttemptListItemDto> getMyAttempts(Integer userId);

    TestAttemptDetailDto getAttemptDetail(Integer userId, Integer attemptId);

    List<AdminTestAttemptListItemDto> getAllAttemptsForAdmin();

    AdminTestAttemptDetailDto getAttemptDetailForAdmin(Integer attemptId);
}
