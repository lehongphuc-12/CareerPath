package com.example.CareerPath_BE.services.imple;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCategoryResponseDto;
import com.example.CareerPath_BE.entities.Blogs;
import com.example.CareerPath_BE.entities.BlogCategories;
import com.example.CareerPath_BE.repositories.BlogRepository;
import com.example.CareerPath_BE.repositories.BlogCategoriesRepository;
import com.example.CareerPath_BE.services.IBlogService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BlogService implements IBlogService {

    private final BlogRepository blogRepository;
    private final BlogCategoriesRepository blogCategoriesRepository;

    @Override
    public Page<BlogResponseDto> getBlogs(int page, int size, Integer categoryId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Blogs> blogs;
        
        if (categoryId != null) {
            blogs = blogRepository.findByBlogCategories_CategoryIdAndIsDeletedFalse(categoryId, pageable);
        } else {
            blogs = blogRepository.findByIsDeletedFalse(pageable);
        }

        return blogs.map(blog -> {
            BlogResponseDto dto = new BlogResponseDto();
            dto.setBlogId(blog.getBlogId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setThumnail(blog.getThumbnail());
            dto.setAuthorName(blog.getUsers() != null ? blog.getUsers().getFullName() : "Admin");
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

    @Override
    public List<BlogCategoryResponseDto> getCategories() {
        List<BlogCategories> categories = blogCategoriesRepository.findAll();
        if (categories.isEmpty()) {
            // Seed default categories
            blogCategoriesRepository.save(new BlogCategories("Xu hướng", "xu-huong"));
            blogCategoriesRepository.save(new BlogCategories("Kỹ năng mềm", "ky-nang-mem"));
            blogCategoriesRepository.save(new BlogCategories("Bí quyết học tập", "bi-quyet-hoc-tap"));
            blogCategoriesRepository.save(new BlogCategories("Câu chuyện Mentor", "cau-chuyen-mentor"));
            categories = blogCategoriesRepository.findAll();
        }
        return categories.stream().map(cat -> {
            BlogCategoryResponseDto dto = new BlogCategoryResponseDto();
            dto.setCategoryId(cat.getCategoryId());
            dto.setName(cat.getName());
            dto.setSlug(cat.getSlug());
            return dto;
        }).collect(Collectors.toList());
    }
}
