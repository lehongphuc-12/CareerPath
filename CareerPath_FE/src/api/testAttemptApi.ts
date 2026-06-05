import { authService } from '../services/authService';
import {
  TestAttemptDetail,
  TestAttemptListItem,
  TestFeedbackRequest,
  TestFeedback,
} from '../types/testAttempt';

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

async function authFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: buildHeaders(options.headers),
  });

  const result: ApiResponse<T> = await response.json().catch(() => ({
    success: false,
    code: response.status,
    message: 'Không thể kết nối máy chủ.',
    data: null as T,
  }));

  if (response.status === 401) {
    throw new Error(result.message || 'Yêu cầu đăng nhập');
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Yêu cầu thất bại.');
  }

  return result.data;
}

export const testAttemptApi = {
  getMyAttempts: (): Promise<TestAttemptListItem[]> =>
    authFetch('/api/test-attempts'),

  getAttemptDetail: (attemptId: number): Promise<TestAttemptDetail> =>
    authFetch(`/api/test-attempts/${attemptId}`),

  submitFeedback: (attemptId: number, data: TestFeedbackRequest): Promise<TestFeedback> =>
    authFetch(`/api/test-attempts/${attemptId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
