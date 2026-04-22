package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Careers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareersRepository extends JpaRepository<Careers, Integer> {
    Page<Careers> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
