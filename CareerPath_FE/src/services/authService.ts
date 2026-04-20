import { AuthResponse } from '../types/auth';

const USER_KEY = 'auth_user';

export const authService = {
  saveAuth: (data: { user: any }) => {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  },

  clearAuth: () => {
    localStorage.removeItem(USER_KEY);
  },

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => !!localStorage.getItem(USER_KEY),
};
