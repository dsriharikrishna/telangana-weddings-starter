import apiService from '@/services/apiService';
import { API_ENDPOINTS } from '@/services/endpoints/apiEndpoints';
import { Category } from '@/types/category.types';
import { ApiResponse } from '@/types/api';

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const res = await apiService.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES);
    return res.data;
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const res = await apiService.get<ApiResponse<Category>>(API_ENDPOINTS.CATEGORY_BY_SLUG(slug));
    return res.data;
  },
};

