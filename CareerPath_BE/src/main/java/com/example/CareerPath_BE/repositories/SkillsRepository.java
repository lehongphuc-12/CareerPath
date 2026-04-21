package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepository extends JpaRepository<Skills, Integer> {
}
