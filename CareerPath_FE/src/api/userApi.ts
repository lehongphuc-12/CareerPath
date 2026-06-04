import axios from 'axios';
import { UserProfile, UpdateProfileRequest } from '../types/user';
import { ApiResponse } from '../types/api';
import { authService } from '../services/authService';

const BASE_URL = '/api/users';

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    try {
      const token = authService.getToken();
      const response = await axios.get<ApiResponse<UserProfile>>(BASE_URL + '/profile/me', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;

      if (key === 'image') {
        if (value instanceof File && value.size > 0) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, String(value));
      }
    });

    const token = authService.getToken();
    const response = await axios.put<ApiResponse<UserProfile>>(`${BASE_URL}/profile`, formData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });
    return response.data.data;
  },
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const token = authService.getToken();
    const response = await axios.post<ApiResponse<{ avatarUrl: string }>>(
      `${BASE_URL}/avatar`,
      formData,
      {
        headers: { 
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  },
};
