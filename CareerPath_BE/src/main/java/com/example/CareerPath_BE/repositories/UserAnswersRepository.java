package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.UserAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAnswersRepository extends JpaRepository<UserAnswers, Integer> {
}
