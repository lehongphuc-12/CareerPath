import axios from 'axios';
import { UserProfile, UpdateProfileRequest } from '../types/user';
import { ApiResponse } from '../types/api';

const BASE_URL = '/api/users';

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await axios.get<ApiResponse<UserProfile>>(BASE_URL + '/profile/me', {
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

    const response = await axios.put<ApiResponse<UserProfile>>(`${BASE_URL}/profile`, formData, {
      withCredentials: true,
    });
    return response.data.data;
  },
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post<ApiResponse<{ avatarUrl: string }>>(
      `${BASE_URL}/avatar`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    );
    return response.data.data;
  },
};
