package com.example.CareerPath_BE.repositories;

import com.example.CareerPath_BE.entities.TestAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestAttemptsRepository extends JpaRepository<TestAttempts, Integer> {

    List<TestAttempts> findByUsers_UserIdOrderByCompletedAtDesc(Integer userId);

    Optional<TestAttempts> findByAttemptIdAndUsers_UserId(Integer attemptId, Integer userId);

    @Query("select ta from TestAttempts ta join fetch ta.users join fetch ta.tests order by ta.completedAt desc")
    List<TestAttempts> findAllWithUserOrderByCompletedAtDesc();

    @Query("select count(ta) from TestAttempts ta where ta.completedAt is not null")
    long countCompletedAttempts();

    @Query("select count(distinct ta.users.userId) from TestAttempts ta where ta.completedAt is not null")
    long countDistinctUsersWhoCompleted();

    @Query("select count(ta) from TestAttempts ta")
    long countAllAttempts();

    @Query("select count(ta) from TestAttempts ta where ta.completedAt is not null and ta.completedQuestions >= ta.totalQuestions")
    long countFullyCompletedAttempts();

    @Query(value = """
            SELECT TOP 1 ta.mbti_type
            FROM test_attempts ta
            WHERE ta.mbti_type IS NOT NULL
            GROUP BY ta.mbti_type
            ORDER BY COUNT(*) DESC
            """, nativeQuery = true)
    String findMostCommonMbtiType();

    @Query(value = """
            SELECT ta.mbti_type, COUNT(*) as cnt
            FROM test_attempts ta
            WHERE ta.mbti_type IS NOT NULL
            GROUP BY ta.mbti_type
            ORDER BY cnt DESC
            """, nativeQuery = true)
    List<Object[]> countByMbtiType();

    @Query(value = """
            SELECT CAST(ta.completed_at AS DATE) as period, COUNT(*) as cnt
            FROM test_attempts ta
            WHERE ta.completed_at IS NOT NULL
            GROUP BY CAST(ta.completed_at AS DATE)
            ORDER BY period DESC
            """, nativeQuery = true)
    List<Object[]> countByDay();

    @Query(value = """
            SELECT FORMAT(ta.completed_at, 'yyyy-MM') as period, COUNT(*) as cnt
            FROM test_attempts ta
            WHERE ta.completed_at IS NOT NULL
            GROUP BY FORMAT(ta.completed_at, 'yyyy-MM')
            ORDER BY period DESC
            """, nativeQuery = true)
    List<Object[]> countByMonth();
}
