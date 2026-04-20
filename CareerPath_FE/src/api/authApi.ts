import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';
import { authService } from '../services/authService';

const BASE_URL = '/api/auth';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  getMe: async (): Promise<AuthResponse['user']> => {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch user session');
    return response.json();
  },
};
