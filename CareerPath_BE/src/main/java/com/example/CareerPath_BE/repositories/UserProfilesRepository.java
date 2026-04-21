package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.UserProfiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfilesRepository extends JpaRepository<UserProfiles, Integer> {
}
