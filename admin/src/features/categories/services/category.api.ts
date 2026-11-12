import apiService from '@/services/apiService';
import { CATEGORY_ENDPOINTS } from './categoryEndpoints';
import { AdminCategory } from '../types/category.types';
import { ApiResponse } from '@/types/api';
import { WEDDING_CATEGORIES } from '@/data';

export const categoryApi = {
  getCategories: async (): Promise<AdminCategory[]> => {
    try {
      const res = await apiService.get<ApiResponse<AdminCategory[]>>(CATEGORY_ENDPOINTS.LIST);
      if (res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn('Backend categories failed, falling back to local dataset:', err);
    }
    return WEDDING_CATEGORIES as unknown as AdminCategory[];
  },
};

