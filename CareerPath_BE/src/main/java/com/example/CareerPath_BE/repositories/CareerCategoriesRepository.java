package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.CareerCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CareerCategoriesRepository extends JpaRepository<CareerCategories, Integer> {
    Optional<CareerCategories> findByName(String name);
}
