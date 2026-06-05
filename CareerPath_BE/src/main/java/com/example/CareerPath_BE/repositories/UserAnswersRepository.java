package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.UserAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswersRepository extends JpaRepository<UserAnswers, Integer> {

    List<UserAnswers> findByTestAttempts_AttemptId(Integer attemptId);

    @Query("select ua from UserAnswers ua join fetch ua.questions q left join fetch q.choiceses where ua.testAttempts.attemptId = :attemptId")
    List<UserAnswers> findByAttemptIdWithQuestions(@Param("attemptId") Integer attemptId);

    void deleteByQuestions_QuestionId(Integer questionId);
}
