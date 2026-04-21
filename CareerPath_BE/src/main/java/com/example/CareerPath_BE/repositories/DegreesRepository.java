package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Degrees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreesRepository extends JpaRepository<Degrees, Integer> {
}
