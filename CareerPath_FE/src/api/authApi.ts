import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';

const BASE_URL = '/api'; // Placeholder for actual API base URL

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // In a real app, this would be a fetch call:
    // const response = await fetch(`${BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Login failed');
    // return response.json();

    // Mock response for now to ensure UI still works
    console.log('API Login calling with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-jwt-token',
          user: { id: '1', name: 'Mock User', email: data.email, role: 'USER' },
        });
      }, 1000);
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    console.log('API Register calling with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-jwt-token',
          user: { id: '2', name: data.name, email: data.email, role: 'USER' },
        });
      }, 1000);
    });
  },
};
