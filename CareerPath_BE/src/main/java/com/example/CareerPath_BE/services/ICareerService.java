package com.example.CareerPath_BE.services;

import org.springframework.data.domain.Page;

import com.example.CareerPath_BE.dtos.Career.CareerDetailsResponseDto;
import com.example.CareerPath_BE.dtos.Career.CareerResponseDto;

public interface ICareerService {
    Page<CareerResponseDto> getCareers(int page, int size, String search, String sortField, String sortOrder);
    CareerDetailsResponseDto getCareerById(int id);
}
