package com.example.CareerPath_BE.services.imple;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.entities.Blogs;
import com.example.CareerPath_BE.repositories.BlogRepository;
import com.example.CareerPath_BE.services.IBlogService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BlogService implements IBlogService {

    private final BlogRepository blogRepository;

    @Override
    public Page<BlogResponseDto> getBlogs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Blogs> blogs = blogRepository.findByIsDeletedFalse(pageable);

        return blogs.map(blog -> {
            BlogResponseDto dto = new BlogResponseDto();
            dto.setBlogId(blog.getBlogId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setThumnail(blog.getThumbnail());
            dto.setAuthorName(blog.getUsers().getFullName());
            dto.setCreatedAt(blog.getCreatedAt());
            return dto;
        });
    }

}
