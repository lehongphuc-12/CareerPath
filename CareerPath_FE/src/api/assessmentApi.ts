import { AssessmentAnswerRequest, AssessmentResult, Question, TraitScores } from '../types/assessment';

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

  submitAssessment: async (
    answers: AssessmentAnswerRequest[],
    preTestResult: TraitScores | null,
    academicScores?: Record<string, number> | null
  ): Promise<AssessmentResult> => {
    const response = await fetch(`${BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers,
        preTestResult,
        academicScores,
      }),
    });

    const result: ApiResponse<AssessmentResult> = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Failed to submit assessment');
    }

    return result.data;
  },
};
