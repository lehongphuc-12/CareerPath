package com.example.CareerPath_BE.services;

import com.example.CareerPath_BE.entities.CareerCategories;
import java.util.List;

public interface ICareerCategoryService {
    List<CareerCategories> getAllCategories();
    CareerCategories getCategoryById(int id);
    CareerCategories createCategory(CareerCategories category);
    CareerCategories updateCategory(int id, CareerCategories category);
    void deleteCategory(int id);
}
