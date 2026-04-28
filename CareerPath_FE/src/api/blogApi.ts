import { PageResponse, Blog } from '../types/blog';
import axios from 'axios';
const BASE_URL = '/api/blogs';
interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}
export const blogApi = {
  getBlogs: async (page: number, size: number): Promise<PageResponse<Blog>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    const response = await axios.get<ApiResponse<PageResponse<Blog>>>(
      `${BASE_URL}?${params.toString()}`
    );
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to loads blogs');
  },
};
