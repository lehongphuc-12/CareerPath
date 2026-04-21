package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Genders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GendersRepository extends JpaRepository<Genders, Integer> {
}
