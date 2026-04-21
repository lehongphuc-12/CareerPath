package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Choices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoicesRepository extends JpaRepository<Choices, Integer> {
}
