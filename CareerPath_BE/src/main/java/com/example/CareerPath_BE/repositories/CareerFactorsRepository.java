package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.CareerFactors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerFactorsRepository extends JpaRepository<CareerFactors, Integer> {
    @Query("select cf from CareerFactors cf join fetch cf.careers join fetch cf.factors")
    List<CareerFactors> findAllWithDetails();
}
