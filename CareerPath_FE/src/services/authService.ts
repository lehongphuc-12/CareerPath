import { AuthResponse } from '../types/auth';

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

export const authService = {
  saveAuth: (data: any) => {
    if (data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
  },

  clearAuth: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY) || !!localStorage.getItem(USER_KEY),
};
