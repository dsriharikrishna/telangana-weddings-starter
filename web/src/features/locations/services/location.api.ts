import apiService from '@/services/apiService';
import { LOCATION_ENDPOINTS } from './locationEndpoints';
import { District, Mandal, Village, LocationSearchResult } from '../types/location.types';
import { ApiResponse } from '@/types/api';

export const locationApi = {
  getDistricts: async (): Promise<District[]> => {
    const res = await apiService.get<ApiResponse<District[]>>(LOCATION_ENDPOINTS.DISTRICTS);
    return res.data;
  },

  getMandals: async (districtId: string): Promise<Mandal[]> => {
    const res = await apiService.get<ApiResponse<Mandal[]>>(LOCATION_ENDPOINTS.MANDALS(districtId));
    return res.data;
  },

  getVillages: async (mandalId: string): Promise<Village[]> => {
    const res = await apiService.get<ApiResponse<Village[]>>(LOCATION_ENDPOINTS.VILLAGES(mandalId));
    return res.data;
  },

  searchLocations: async (query: string): Promise<LocationSearchResult> => {
    const res = await apiService.get<ApiResponse<LocationSearchResult>>(LOCATION_ENDPOINTS.SEARCH(query));
    return res.data;
  },
};

