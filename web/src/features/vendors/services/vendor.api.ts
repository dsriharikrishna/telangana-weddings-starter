import apiService from '@/services/apiService';
import { VENDOR_ENDPOINTS } from './vendorEndpoints';
import { Vendor, VendorQueryParams, VendorLeadsData, UnlockLeadResponse } from '../types/vendor.types';
import { ApiResponse, PaginatedData } from '@/types/api';

export const vendorApi = {
  getVendors: async (params: VendorQueryParams = {}): Promise<PaginatedData<Vendor>> => {
    const query = new URLSearchParams();
    if (params.district) query.append('district', params.district);
    if (params.mandal) query.append('mandal', params.mandal);
    if (params.category) query.append('category', params.category);
    if (params.page) query.append('page', params.page.toString());
    if (params.limit) query.append('limit', params.limit.toString());

    const url = `${VENDOR_ENDPOINTS.LIST}${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await apiService.get<ApiResponse<PaginatedData<Vendor>>>(url);
    return res.data;
  },

  getVendorBySlug: async (slug: string): Promise<Vendor> => {
    const res = await apiService.get<ApiResponse<Vendor>>(VENDOR_ENDPOINTS.BY_SLUG(slug));
    return res.data;
  },

  registerVendor: async (data: any): Promise<Vendor> => {
    const res = await apiService.post<ApiResponse<Vendor>>(VENDOR_ENDPOINTS.REGISTER, data);
    return res.data;
  },

  getVendorLeads: async (): Promise<VendorLeadsData> => {
    const res = await apiService.get<ApiResponse<VendorLeadsData>>(VENDOR_ENDPOINTS.LEADS);
    return res.data;
  },

  unlockLead: async (assignmentId: string): Promise<UnlockLeadResponse> => {
    const res = await apiService.post<ApiResponse<UnlockLeadResponse>>(VENDOR_ENDPOINTS.UNLOCK_LEAD(assignmentId));
    return res.data;
  },
};


