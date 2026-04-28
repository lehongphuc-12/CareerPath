import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '../api/blogApi';
import { toast } from '../store/useToastStore';
import { Blog, PageResponse } from '../types/blog';

export const useBlog = () => {
  const [blogPage, setBlogPage] = useState<PageResponse<Blog> | null>(null);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await blogApi.getBlogs(page, 8);
      setBlogPage(response);
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogPage,
    isLoading,
    page,
    setPage,
    fetchBlogs,
  };
};
