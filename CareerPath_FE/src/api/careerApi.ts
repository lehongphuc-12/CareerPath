import { Career, PageResponse } from '../types/career';

const BASE_URL = '/api/careers';

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}

export const careerApi = {
  getCareers: async (
    page = 0,
    size = 9,
    search = '',
    sortField = '',
    sortOrder = 'asc'
  ): Promise<PageResponse<Career>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      search,
      sortField,
      sortOrder,
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      method: 'GET',
    });

    const result: ApiResponse<PageResponse<Career>> = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Failed to fetch careers');
    }

    return result.data;
  },
};
