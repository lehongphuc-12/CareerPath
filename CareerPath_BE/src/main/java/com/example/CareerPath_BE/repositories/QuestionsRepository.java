package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Integer> {
}
