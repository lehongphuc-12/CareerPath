export interface Mentor {
  userId: number;
  fullName: string;
  email: string;
  image?: string;
  role: string;
}

interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}

export const mentorApi = {
  getMentors: async (careerId?: number): Promise<Mentor[]> => {
    const params = careerId != null ? `?careerId=${careerId}` : '';
    const response = await fetch(`/api/chat/mentors${params}`);
    const result: ApiResponse<Mentor[]> = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || 'Không thể tải danh sách mentor.');
    }

    return result.data;
  },
};
