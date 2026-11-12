import apiService from '@/services/apiService';
import { DASHBOARD_ENDPOINTS } from './dashboardEndpoints';
import { PlatformMetrics } from '../types/dashboard.types';
import { ApiResponse } from '@/types/api';

export const dashboardApi = {
  getMetrics: async (): Promise<PlatformMetrics> => {
    const res = await apiService.get<ApiResponse<PlatformMetrics>>(DASHBOARD_ENDPOINTS.METRICS);
    return res.data;
  },
};

