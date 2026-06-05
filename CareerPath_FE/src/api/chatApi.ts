import { authService } from '../services/authService';

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

async function chatFetch<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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

  return result;
}

export const chatApi = {
  getRooms: () => chatFetch<unknown[]>('/api/chat/rooms'),

  getMessages: (roomId: number) =>
    chatFetch<unknown[]>(`/api/chat/rooms/${roomId}/messages`),

  createPrivateRoom: (targetUserId: number) =>
    chatFetch<{ roomId: number }>('/api/chat/rooms/private', {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
    }),
};
