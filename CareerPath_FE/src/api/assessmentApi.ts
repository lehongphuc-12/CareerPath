import { authService } from '../services/authService';
import { AssessmentAnswerRequest, AssessmentResult, Question, TraitScores } from '../types/assessment';

const BASE_URL = '/api/questions';

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}

function buildHeaders(extra?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = authService.getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return { ...headers, ...(extra as Record<string, string>) };
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

  submitAssessment: async (
    answers: AssessmentAnswerRequest[],
    preTestResult: TraitScores | null,
    academicScores?: Record<string, number> | null
  ): Promise<AssessmentResult> => {
    const response = await fetch(`${BASE_URL}/submit`, {
      method: 'POST',
      credentials: 'include',
      headers: buildHeaders(),
      body: JSON.stringify({
        answers,
        preTestResult,
        academicScores,
      }),
    });

    const result: ApiResponse<AssessmentResult> = await response.json().catch(() => null);

    if (response.status === 401) {
      throw new Error(result?.message || 'Yêu cầu đăng nhập để làm bài test');
    }

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Failed to submit assessment');
    }

    return result.data;
  },
};
