import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { careerApi } from '../api/careerApi';
import { CareerDetails } from '../types/career';

export function useCareerDetail() {
  const { id } = useParams();
  const [career, setCareer] = useState<CareerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    careerApi
      .getCareerById(Number(id))
      .then((data) => setCareer(data))
      .catch((err) => setError(err.message || 'Không thể tải thông tin ngành nghề.'))
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    career,
    isLoading,
    error,
    id,
  };
}
