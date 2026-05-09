package com.example.CareerPath_BE.services.imple;

import java.util.Optional;
import java.util.Set;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.CareerPath_BE.dtos.blog.BlogDetailResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogResponseDto;
import com.example.CareerPath_BE.dtos.blog.CreateBlogRequestDto;
import com.example.CareerPath_BE.dtos.blog.BlogCategoryResponseDto;
import com.example.CareerPath_BE.dtos.blog.BlogCommentResponseDto;
import com.example.CareerPath_BE.dtos.blog.CreateCommentDto;
import com.example.CareerPath_BE.entities.Blogs;
import com.example.CareerPath_BE.entities.BlogCategories;
import com.example.CareerPath_BE.entities.BlogComments;
import com.example.CareerPath_BE.entities.Users;
import com.example.CareerPath_BE.repositories.BlogRepository;
import com.example.CareerPath_BE.repositories.BlogCategoriesRepository;
import com.example.CareerPath_BE.repositories.BlogCommentsRepository;
import com.example.CareerPath_BE.repositories.UsersRepository;
import com.example.CareerPath_BE.services.IBlogService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BlogService implements IBlogService {

    private final BlogRepository blogRepository;
    private final BlogCategoriesRepository blogCategoriesRepository;
    private final BlogCommentsRepository blogCommentsRepository;
    private final UsersRepository usersRepository;
    private final CloudinarySerivce cloudinarySerivce;

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
            dto.setThumbnail(blog.getThumbnail());
            dto.setAuthorName(blog.getUsers() != null ? blog.getUsers().getFullName() : "Admin");
            dto.setCategoryName(blog.getBlogCategories() != null && !blog.getBlogCategories().isEmpty() 
                                ? blog.getBlogCategories().iterator().next().getName() 
                                : "Khác");
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

    @Override
    public int likeBlog(int blogId, boolean isLike) {
        Blogs blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        int currentLikes = blog.getLikeCount() != null ? blog.getLikeCount() : 0;
        if (isLike) {
            blog.setLikeCount(currentLikes + 1);
        } else {
            blog.setLikeCount(Math.max(0, currentLikes - 1));
        }
        blogRepository.save(blog);
        return blog.getLikeCount();
    }

    @Override
    public List<BlogCommentResponseDto> getComments(int blogId) {
        return blogCommentsRepository.findByBlogs_BlogIdOrderByCreatedAtDesc(blogId)
                .stream()
                .map(comment -> {
                    BlogCommentResponseDto dto = new BlogCommentResponseDto();
                    dto.setCommentId(comment.getCommentId());
                    dto.setBlogId(comment.getBlogs().getBlogId());
                    dto.setUserId(comment.getUsers().getUserId());
                    dto.setUserName(comment.getUsers().getFullName());
                    dto.setContent(comment.getContent());
                    dto.setCreatedAt(comment.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public BlogCommentResponseDto addComment(int blogId, int userId, CreateCommentDto dto) {
        Blogs blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BlogComments comment = new BlogComments();
        comment.setBlogs(blog);
        comment.setUsers(user);
        comment.setContent(dto.getContent());
        comment.setCreatedAt(new java.util.Date());

        BlogComments saved = blogCommentsRepository.save(comment);

        BlogCommentResponseDto responseDto = new BlogCommentResponseDto();
        responseDto.setCommentId(saved.getCommentId());
        responseDto.setBlogId(saved.getBlogs().getBlogId());
        responseDto.setUserId(saved.getUsers().getUserId());
        responseDto.setUserName(saved.getUsers().getFullName());
        responseDto.setContent(saved.getContent());
        responseDto.setCreatedAt(saved.getCreatedAt());

        return responseDto;
    }

    @Override
    public BlogDetailResponseDto createBlog(CreateBlogRequestDto request, int userId) {

        BlogCategories category = blogCategoriesRepository.findByName(request.getCategoryName())
                                    .orElseGet(() -> {
                                        BlogCategories newCategories = new BlogCategories();
                                        newCategories.setName(request.getCategoryName());
                                        return blogCategoriesRepository.save(newCategories);
                                    });

        Users user = usersRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
        
        String imgUrl = null;
        if (request.getBlogImage() != null && !request.getBlogImage().isEmpty()) {
            imgUrl = cloudinarySerivce.uploadFile(request.getBlogImage(), "/exe/blogs");
        }

        Blogs blog = new Blogs();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setThumbnail(imgUrl);
        blog.setCreatedAt(new Date());
        blog.setUpdatedAt(new Date());
        blog.setUsers(user);
        blog.setViewCount(0);
        blog.setLikeCount(0);

        Set<BlogCategories> categories = new HashSet<>();
        categories.add(category);
        blog.setBlogCategories(categories);

        Blogs saved = blogRepository.save(blog);

        BlogDetailResponseDto responseDto = new BlogDetailResponseDto();
        responseDto.setBlogId(saved.getBlogId());
        responseDto.setTitle(saved.getTitle());
        responseDto.setContent(saved.getContent());
        responseDto.setImageUrl(saved.getThumbnail());
        responseDto.setCreatedAt(saved.getCreatedAt());
        responseDto.setUpdatedAt(saved.getUpdatedAt());
        responseDto.setAuthorId(saved.getUsers().getUserId());
        responseDto.setAuthorName(saved.getUsers().getFullName());
        responseDto.setViewCount(saved.getViewCount());
        responseDto.setCommentCount(saved.getBlogComments().size());
        responseDto.setLikeCount(saved.getLikeCount());
        return responseDto;
    }

    @Override
    public void incrementViewCount(int blogId) {
        blogRepository.findById(blogId).ifPresent(blog -> {
            blog.setViewCount((blog.getViewCount() == null ? 0 : blog.getViewCount()) + 1);
            blogRepository.save(blog);
        });
    }

    @Override
    public void deleteBlog(int blogId) {
        blogRepository.findById(blogId).ifPresent(blog -> {
            blog.setIsDeleted(true);
            blogRepository.save(blog);
        });
    }

    @Override
    public BlogDetailResponseDto updateBlog(int blogId, CreateBlogRequestDto request) {
        Blogs blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setUpdatedAt(new Date());

        if (request.getBlogImage() != null && !request.getBlogImage().isEmpty()) {
            if (blog.getThumbnail() != null && !blog.getThumbnail().isEmpty()) {
                try {
                    cloudinarySerivce.deleteFile(blog.getThumbnail());
                } catch (Exception e) {
                    System.err.println("Failed to delete old image: " + e.getMessage());
                }
            }
            String imgUrl = cloudinarySerivce.uploadFile(request.getBlogImage(), "/exe/blogs");
            blog.setThumbnail(imgUrl);
        }

        if (request.getCategoryName() != null) {
            BlogCategories category = blogCategoriesRepository.findByName(request.getCategoryName())
                    .orElseGet(() -> {
                        BlogCategories newCategories = new BlogCategories();
                        newCategories.setName(request.getCategoryName());
                        return blogCategoriesRepository.save(newCategories);
                    });
            Set<BlogCategories> categories = new HashSet<>();
            categories.add(category);
            blog.setBlogCategories(categories);
        }

        Blogs saved = blogRepository.save(blog);

        BlogDetailResponseDto responseDto = new BlogDetailResponseDto();
        responseDto.setBlogId(saved.getBlogId());
        responseDto.setTitle(saved.getTitle());
        responseDto.setContent(saved.getContent());
        responseDto.setImageUrl(saved.getThumbnail());
        responseDto.setCreatedAt(saved.getCreatedAt());
        responseDto.setUpdatedAt(saved.getUpdatedAt());
        responseDto.setAuthorId(saved.getUsers().getUserId());
        responseDto.setAuthorName(saved.getUsers().getFullName());
        responseDto.setViewCount(saved.getViewCount());
        responseDto.setCommentCount(saved.getBlogComments().size());
        responseDto.setLikeCount(saved.getLikeCount());
        return responseDto;
    }
}
