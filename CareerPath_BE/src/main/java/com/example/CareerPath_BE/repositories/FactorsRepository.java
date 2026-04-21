package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Factors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactorsRepository extends JpaRepository<Factors, Integer> {
}
