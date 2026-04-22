package com.example.CareerPath_BE.services.imple;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;
import com.example.CareerPath_BE.dtos.Career.CareerResponseDto;
import com.example.CareerPath_BE.entities.Careers;
import com.example.CareerPath_BE.repositories.CareersRepository;
import com.example.CareerPath_BE.services.ICareerService;

@Service
public class CareerService implements ICareerService {

    private final CareersRepository careersRepository;

    public CareerService(CareersRepository careersRepository) {
        this.careersRepository = careersRepository;
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
                "",
                career.getAvgSalary(),
                career.getDemandLevel()
            )
        );
    }
}
