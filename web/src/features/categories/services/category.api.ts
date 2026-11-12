import apiService from '@/services/apiService';
import { CATEGORY_ENDPOINTS } from './categoryEndpoints';
import { Category } from '../types/category.types';
import { ApiResponse } from '@/types/api';

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const res = await apiService.get<ApiResponse<Category[]>>(CATEGORY_ENDPOINTS.LIST);
    return res.data;
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const res = await apiService.get<ApiResponse<Category>>(CATEGORY_ENDPOINTS.BY_SLUG(slug));
    return res.data;
  },
};

