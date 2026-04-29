package com.example.CareerPath_BE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.CareerPath_BE.entities.BlogComments;
import java.util.List;

@Repository
public interface BlogCommentsRepository extends JpaRepository<BlogComments, Integer> {
    List<BlogComments> findByBlogs_BlogIdOrderByCreatedAtDesc(Integer blogId);
}
