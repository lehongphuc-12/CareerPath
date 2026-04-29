import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '../api/blogApi';
import { toast } from '../store/useToastStore';
import { Blog, PageResponse, BlogCategory } from '../types/blog';

export const useBlog = () => {
  const [blogPage, setBlogPage] = useState<PageResponse<Blog> | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await blogApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await blogApi.getBlogs(page, 8, selectedCategory || undefined);
      setBlogPage(response);
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogPage,
    categories,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    page,
    setPage,
    fetchBlogs,
  };
};

