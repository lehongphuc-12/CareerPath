package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.CenterTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterTypesRepository extends JpaRepository<CenterTypes, Integer> {
}
