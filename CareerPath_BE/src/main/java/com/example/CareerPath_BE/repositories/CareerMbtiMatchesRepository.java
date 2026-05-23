package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.CareerMbtiMatches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerMbtiMatchesRepository extends JpaRepository<CareerMbtiMatches, Integer> {
    @Query("select cmm from CareerMbtiMatches cmm join fetch cmm.careers where cmm.mbtiType = :mbtiType")
    List<CareerMbtiMatches> findAllByMbtiTypeWithCareers(@Param("mbtiType") String mbtiType);
}
