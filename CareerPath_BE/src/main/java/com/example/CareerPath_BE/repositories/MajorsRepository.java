package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Majors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorsRepository extends JpaRepository<Majors, Integer> {
}
