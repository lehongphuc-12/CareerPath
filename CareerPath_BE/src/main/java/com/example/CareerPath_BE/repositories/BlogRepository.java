package com.example.CareerPath_BE.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.CareerPath_BE.entities.Blogs;

@Repository
public interface BlogRepository extends JpaRepository<Blogs, Integer> {
    Page<Blogs> findByIsDeletedFalse(Pageable pageable);
}
