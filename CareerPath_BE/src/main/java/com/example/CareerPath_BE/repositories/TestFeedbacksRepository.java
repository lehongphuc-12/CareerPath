package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.TestFeedbacks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestFeedbacksRepository extends JpaRepository<TestFeedbacks, Integer> {

    Optional<TestFeedbacks> findByTestAttempts_AttemptId(Integer attemptId);

    boolean existsByTestAttempts_AttemptId(Integer attemptId);

    @Query("select avg(tf.rating) from TestFeedbacks tf")
    Double findAverageRating();

    long count();
}
