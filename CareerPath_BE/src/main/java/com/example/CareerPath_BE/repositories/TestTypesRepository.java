package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.TestTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestTypesRepository extends JpaRepository<TestTypes, Integer> {
}
