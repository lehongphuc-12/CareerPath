package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.CareerFactors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerFactorsRepository extends JpaRepository<CareerFactors, Integer> {
}
