package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.FactorTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactorTypesRepository extends JpaRepository<FactorTypes, Integer> {
}
