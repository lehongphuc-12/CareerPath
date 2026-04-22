package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.QuestionFactors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionFactorsRepository extends JpaRepository<QuestionFactors, Integer> {
    @Query("select qf from QuestionFactors qf join fetch qf.questions join fetch qf.factors")
    List<QuestionFactors> findAllWithDetails();
}
