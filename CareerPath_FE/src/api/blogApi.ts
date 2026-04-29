import { PageResponse, Blog, BlogDetail, BlogCategory, BlogComment } from '../types/blog';
import axios from 'axios';
const BASE_URL = '/api/blogs';
interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
}
export const blogApi = {
  getBlogs: async (page: number, size: number, categoryId?: number): Promise<PageResponse<Blog>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }
    const response = await axios.get<ApiResponse<PageResponse<Blog>>>(
      `${BASE_URL}?${params.toString()}`
    );
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to loads blogs');
  },

  getCategories: async (): Promise<BlogCategory[]> => {
    const response = await axios.get<ApiResponse<BlogCategory[]>>(`${BASE_URL}/categories`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to load categories');
  },


  getBlogDetail: async (blogId: number): Promise<BlogDetail> => {
    const response = await axios.get<ApiResponse<BlogDetail>>(`${BASE_URL}/${blogId}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to load blog detail');
  },

  likeBlog: async (blogId: number, isLike: boolean): Promise<number> => {
    const response = await axios.post<ApiResponse<number>>(`${BASE_URL}/${blogId}/like?isLike=${isLike}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to like blog');
  },

  getComments: async (blogId: number): Promise<BlogComment[]> => {
    const response = await axios.get<ApiResponse<BlogComment[]>>(`${BASE_URL}/${blogId}/comments`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to load comments');
  },

  addComment: async (blogId: number, content: string): Promise<BlogComment> => {
    const response = await axios.post<ApiResponse<BlogComment>>(`${BASE_URL}/${blogId}/comments`, { content });
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to add comment');
  },
};
