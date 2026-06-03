package com.example.CareerPath_BE.services.imple;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;

import com.example.CareerPath_BE.dtos.Career.CareerDetailsResponseDto;
import com.example.CareerPath_BE.dtos.Career.CareerResponseDto;
import com.example.CareerPath_BE.dtos.Career.MajorDto;
import com.example.CareerPath_BE.entities.CareerMajor;
import com.example.CareerPath_BE.entities.Careers;
import com.example.CareerPath_BE.repositories.CareerMajorRepository;
import com.example.CareerPath_BE.repositories.CareersRepository;
import com.example.CareerPath_BE.services.ICareerService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CareerService implements ICareerService {

    private final CareersRepository careersRepository;
    private final CareerMajorRepository careerMajorRepository;

    public CareerService(CareersRepository careersRepository, CareerMajorRepository careerMajorRepository) {
        this.careersRepository = careersRepository;
        this.careerMajorRepository = careerMajorRepository;
    }

    @Override
    public Page<CareerResponseDto> getCareers(int page, int size, String search, String sortField, String sortOrder) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("careerId").descending());

        if (sortField != null && !sortField.isEmpty()) {
            Sort.Direction direction = 
                (sortOrder != null && sortOrder.equalsIgnoreCase("desc"))
                ? Sort.Direction.DESC 
                : Sort.Direction.ASC;

            pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        }

        Page<Careers> careersPage;

        if (search != null && !search.isEmpty()) {
            careersPage = careersRepository.findByNameContainingIgnoreCase(search, pageable);
        } else {
            careersPage = careersRepository.findAll(pageable);
        }

        return careersPage.map(career ->
            new CareerResponseDto(
                career.getCareerId(),
                career.getName(),
                career.getDescription(),
                career.getImage(),
                career.getMinSalary(),
                career.getMaxSalary(),
                career.getDemandLevel()
            )
        );
    }

    @Override
    public CareerDetailsResponseDto getCareerById(int id) {
        Careers career = careersRepository.findById(id).orElse(null);
        if (career == null) {
            return null;
        }

        // Lấy danh sách ngành học liên quan qua bảng Career_Major
        List<CareerMajor> careerMajors = careerMajorRepository.findByCareerId(id);
        List<MajorDto> majorDtos = careerMajors.stream()
            .map(cm -> new MajorDto(
                cm.getMajor().getId(),
                cm.getMajor().getMajorCode(),
                cm.getMajor().getMajorName(),
                cm.getMajor().getGroupCode(),
                cm.getIsPrimary()
            ))
            .collect(Collectors.toList());

        return new CareerDetailsResponseDto(
            career.getCareerId(),
            career.getName(),
            career.getDescription(),
            career.getImage(),
            career.getMinSalary(),
            career.getMaxSalary(),
            career.getDemandLevel(),
            majorDtos
        );
    }
}
