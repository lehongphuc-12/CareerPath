import axios from 'axios';
import { AdminTestAttemptDetail, AdminTestAttemptListItem, TestDashboardStats } from '../types/testAttempt';

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}

export const testDashboardApi = {
  getStats: async (): Promise<TestDashboardStats> => {
    const response = await axios.get<ApiResponse<TestDashboardStats>>(
      '/api/admin/test-dashboard/stats',
      { withCredentials: true }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Không thể tải thống kê bài test');
    }

    return response.data.data;
  },

  getAllAttempts: async (): Promise<AdminTestAttemptListItem[]> => {
    const response = await axios.get<ApiResponse<AdminTestAttemptListItem[]>>(
      '/api/admin/test-dashboard/attempts',
      { withCredentials: true }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Không thể tải danh sách kết quả bài test');
    }

    return response.data.data;
  },

  getAttemptDetail: async (attemptId: number): Promise<AdminTestAttemptDetail> => {
    const response = await axios.get<ApiResponse<AdminTestAttemptDetail>>(
      `/api/admin/test-dashboard/attempts/${attemptId}`,
      { withCredentials: true }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Không thể tải chi tiết kết quả');
    }

    return response.data.data;
  },
};
