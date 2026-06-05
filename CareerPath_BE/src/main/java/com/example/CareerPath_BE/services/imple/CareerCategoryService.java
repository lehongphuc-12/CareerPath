package com.example.CareerPath_BE.services.imple;

import com.example.CareerPath_BE.entities.CareerCategories;
import com.example.CareerPath_BE.repositories.CareerCategoriesRepository;
import com.example.CareerPath_BE.services.ICareerCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CareerCategoryService implements ICareerCategoryService {

    @Autowired
    private CareerCategoriesRepository categoryRepository;

    @Override
    public List<CareerCategories> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CareerCategories getCategoryById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public CareerCategories createCategory(CareerCategories category) {
        return categoryRepository.save(category);
    }

    @Override
    public CareerCategories updateCategory(int id, CareerCategories categoryDetails) {
        CareerCategories category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setName(categoryDetails.getName());
            category.setDescription(categoryDetails.getDescription());
            category.setImage(categoryDetails.getImage());
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}
