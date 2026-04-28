import { useState, useEffect, useCallback } from 'react';
import { careerApi } from '../api/careerApi';
import { Career, PageResponse } from '../types/career';

export function useCareers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [careerPage, setCareerPage] = useState<PageResponse<Career> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  // Debounce search term to avoid spamming API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0); // Reset page when search changes
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchCareers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await careerApi.getCareers(page, 8, debouncedSearch);
      setCareerPage(data);
    } catch (error) {
      console.error('Failed to fetch careers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  return {
    searchTerm,
    setSearchTerm,
    careerPage,
    isLoading,
    page,
    setPage,
  };
}
