import { Question } from '../types/assessment';

const BASE_URL = '/api/questions';

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}

export const assessmentApi = {
  getQuestions: async (): Promise<Question[]> => {
    const response = await fetch(BASE_URL, {
      method: 'GET',
    });

    const result: ApiResponse<Question[]> = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Failed to fetch questions');
    }

    return result.data;
  },
};
