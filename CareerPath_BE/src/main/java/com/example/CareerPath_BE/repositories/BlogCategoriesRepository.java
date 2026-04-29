package com.example.CareerPath_BE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.CareerPath_BE.entities.BlogCategories;

@Repository
public interface BlogCategoriesRepository extends JpaRepository<BlogCategories, Integer> {
}
