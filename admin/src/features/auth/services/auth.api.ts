import apiService from '@/services/apiService';
import { AUTH_ENDPOINTS } from './authEndpoints';
import { SendOtpPayload, VerifyOtpPayload, AuthSession, User } from '../types/auth.types';
import { ApiResponse } from '@/types/api';

export const authApi = {
  sendOtp: async (payload: SendOtpPayload): Promise<{ phone: string; message: string }> => {
    const res = await apiService.post<ApiResponse<{ phone: string; message: string }>>(
      AUTH_ENDPOINTS.SEND_OTP,
      payload,
    );
    return res.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthSession> => {
    const res = await apiService.post<ApiResponse<AuthSession>>(
      AUTH_ENDPOINTS.VERIFY_OTP,
      payload,
    );
    if (typeof window !== 'undefined' && res.data?.accessToken) {
      localStorage.setItem('tw_access_token', res.data.accessToken);
      if (res.data.refreshToken) {
        localStorage.setItem('tw_refresh_token', res.data.refreshToken);
      }
      localStorage.setItem('tw_user', JSON.stringify(res.data.user));
      // Set auth cookie for Next.js middleware
      document.cookie = `tw_admin_token=${res.data.accessToken}; path=/; max-age=604800; SameSite=Lax`;
    }
    return res.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const res = await apiService.get<ApiResponse<{ user: User }>>(AUTH_ENDPOINTS.ME);
    return res.data?.user || (res.data as any);
  },

  switchRole: async (targetRole: string): Promise<AuthSession> => {
    const res = await apiService.post<ApiResponse<AuthSession>>(
      AUTH_ENDPOINTS.SWITCH_ROLE,
      { targetRole },
    );
    if (typeof window !== 'undefined' && res.data?.accessToken) {
      localStorage.setItem('tw_access_token', res.data.accessToken);
      localStorage.setItem('tw_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tw_access_token');
      localStorage.removeItem('tw_refresh_token');
      localStorage.removeItem('tw_user');
      localStorage.removeItem('telangana_weddings_admin_user');
      document.cookie = 'tw_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },
};
