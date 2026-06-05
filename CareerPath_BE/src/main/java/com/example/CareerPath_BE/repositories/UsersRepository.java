package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);

    java.util.List<Users> findByRoles_Name(String roleName);

    java.util.List<Users> findByRoles_NameAndCareers_CareerId(String roleName, Integer careerId);
}
