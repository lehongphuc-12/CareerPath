package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.TestDimensions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestDimensionsRepository extends JpaRepository<TestDimensions, Integer> {
}
