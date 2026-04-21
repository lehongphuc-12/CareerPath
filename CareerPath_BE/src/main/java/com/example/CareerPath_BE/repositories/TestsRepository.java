package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Tests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestsRepository extends JpaRepository<Tests, Integer> {
}
