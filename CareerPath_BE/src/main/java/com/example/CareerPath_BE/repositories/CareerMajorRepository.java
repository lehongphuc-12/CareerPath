package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.CareerMajor;
import com.example.CareerPath_BE.entities.CareerMajorId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerMajorRepository extends JpaRepository<CareerMajor, CareerMajorId> {

    @Query("SELECT cm FROM CareerMajor cm JOIN FETCH cm.major WHERE cm.career.careerId = :careerId ORDER BY cm.isPrimary DESC")
    List<CareerMajor> findByCareerId(@Param("careerId") Integer careerId);
}
