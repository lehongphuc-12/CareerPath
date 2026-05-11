import { useState, useEffect } from 'react';
import { BlogDetail } from '../types/blog';
import { useParams } from 'react-router-dom';
import { blogApi } from '../api/blogApi';

export function useBlogDetail(blogId: number) {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    blogApi
      .getBlogDetail(Number(id))
      .then((data) => setBlog(data))
      .catch((err) => setError(err.message || 'Không thể tải thông tin blog'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    blog,
    isLoading,
    error,
    id,
  };
}
