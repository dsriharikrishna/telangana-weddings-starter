import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

export const API_BASE_URL = 'http://10.0.2.2:3000/api/v1'; // Default Android emulator local bridge

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

