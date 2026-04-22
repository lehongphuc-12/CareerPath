package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Integer> {
    @Query("select distinct q from Questions q left join fetch q.choiceses")
    List<Questions> findAllWithChoices();
}
