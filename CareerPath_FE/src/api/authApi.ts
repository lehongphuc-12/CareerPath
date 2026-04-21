import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { authService } from '../services/authService';

const BASE_URL = '/api/auth';

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const result: ApiResponse<AuthResponse> = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Login failed');
    }
    return result.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const result: ApiResponse<AuthResponse> = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Registration failed');
    }
    return result.data;
  },

  loginWithGoogle: async (idToken: string): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
      credentials: 'include',
    });
    const result: ApiResponse<AuthResponse> = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Google login failed');
    }
    return result.data;
  },

  getMe: async (): Promise<AuthResponse['user']> => {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    });
    const result: ApiResponse<AuthResponse['user']> = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error('Failed to fetch user session');
    }
    return result.data;
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Logout failed');
  },
};
