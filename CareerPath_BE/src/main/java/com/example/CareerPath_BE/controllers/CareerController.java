package com.example.CareerPath_BE.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CareerPath_BE.dtos.ApiResponse;
import com.example.CareerPath_BE.dtos.Career.CareerDetailsResponseDto;
import com.example.CareerPath_BE.dtos.Career.CareerResponseDto;
import com.example.CareerPath_BE.services.ICareerService;
import com.example.CareerPath_BE.config.JwtUtil;
import com.example.CareerPath_BE.repositories.CareersRepository;
import com.example.CareerPath_BE.entities.Careers;

import java.util.List;

@RestController
@RequestMapping("/api/careers")
public class CareerController {
    @Autowired
    private ICareerService careerService;

    @Autowired
    private CareersRepository careersRepository;

    @Autowired
    private JwtUtil jwtUtil;


    @GetMapping
    public ResponseEntity<ApiResponse<Page<CareerResponseDto>>> getCareers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "") String sortField,  
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(required = false) Integer categoryId) {
        Page<CareerResponseDto> careers = careerService.getCareers(page, size, search, sortField, sortOrder, categoryId);
        return ResponseEntity.ok(
                new ApiResponse<>(true,200,"Careers fetched successfully", careers)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CareerDetailsResponseDto>> getCareerById(@PathVariable(value = "id") int id) {
        CareerDetailsResponseDto career = careerService.getCareerById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(true,200,"Career fetched successfully", career)
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Careers>> createCareer(
            @CookieValue(name = "token", required = false) String token,
            @RequestBody Careers career) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }
        // Note: For create, category object should be mapped properly if we send category ID from client. 
        // For simplicity we save what is bound to the entity (e.g. { category: { categoryId: 1 } })
        Careers savedCareer = careersRepository.save(career);
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Career created successfully", savedCareer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Careers>> updateCareer(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id,
            @RequestBody Careers careerDetails) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }
        Careers career = careersRepository.findById(id).orElse(null);
        if (career == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, 404, "Career not found", null));
        }
        career.setName(careerDetails.getName());
        career.setDescription(careerDetails.getDescription());
        career.setMinSalary(careerDetails.getMinSalary());
        career.setMaxSalary(careerDetails.getMaxSalary());
        career.setDemandLevel(careerDetails.getDemandLevel());
        career.setImage(careerDetails.getImage());
        if (careerDetails.getCategory() != null) {
            career.setCategory(careerDetails.getCategory());
        } else {
            career.setCategory(null);
        }
        Careers updatedCareer = careersRepository.save(career);
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Career updated successfully", updatedCareer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCareer(
            @CookieValue(name = "token", required = false) String token,
            @PathVariable int id) {
        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, 401, "Invalid token", null));
        }
        List<String> roles = jwtUtil.extractRoles(token);
        boolean isAdmin = roles.stream().anyMatch(r -> r.equalsIgnoreCase("Admin"));
        if (!isAdmin) {
            return ResponseEntity.status(403).body(new ApiResponse<>(false, 403, "Access denied: Admin role required", null));
        }
        Careers career = careersRepository.findById(id).orElse(null);
        if (career == null) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, 404, "Career not found", null));
        }
        careersRepository.delete(career);
        return ResponseEntity.ok(new ApiResponse<>(true, 200, "Career deleted successfully", null));
    }
}

