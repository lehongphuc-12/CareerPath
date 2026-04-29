package com.example.CareerPath_BE.services.imple;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
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

    @Override
    public BlogDetailResponseDto getBlogDetail(int blogId) {
        Optional<Blogs> blogOpt = blogRepository.findById(blogId);
        
        if (!blogOpt.isPresent()) {
            throw new RuntimeException("Blog not found with id: " + blogId);
        }
        BlogDetailResponseDto dto =  new BlogDetailResponseDto();
        dto.setBlogId(blogOpt.get().getBlogId());
        dto.setTitle(blogOpt.get().getTitle());
        dto.setContent(blogOpt.get().getContent());
        dto.setImageUrl(blogOpt.get().getThumbnail());
        dto.setCreatedAt(blogOpt.get().getCreatedAt());
        dto.setUpdatedAt(blogOpt.get().getUpdatedAt());
        dto.setAuthorId(blogOpt.get().getUsers().getUserId());
        dto.setAuthorName(blogOpt.get().getUsers().getFullName());
        dto.setViewCount(blogOpt.get().getViewCount());
        dto.setCommentCount(blogOpt.get().getBlogComments().size());
        dto.setLikeCount(blogOpt.get().getLikeCount());
        return dto;
    }

}
