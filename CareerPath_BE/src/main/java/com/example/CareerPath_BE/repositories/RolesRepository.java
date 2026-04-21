package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Integer> {
    Optional<Roles> findByName(String name);
}
