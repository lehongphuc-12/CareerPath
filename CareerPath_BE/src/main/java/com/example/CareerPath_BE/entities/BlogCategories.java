package com.example.CareerPath_BE.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "blog_categories")
public class BlogCategories implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "slug", unique = true, length = 100)
    private String slug;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "blogCategories")
    private Set<Blogs> blogses = new HashSet<>(0);

    public BlogCategories() {
    }

    public BlogCategories(String name, String slug) {
        this.name = name;
        this.slug = slug;
    }

    public Integer getCategoryId() {
        return this.categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return this.slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Set<Blogs> getBlogses() {
        return this.blogses;
    }

    public void setBlogses(Set<Blogs> blogses) {
        this.blogses = blogses;
    }
}
