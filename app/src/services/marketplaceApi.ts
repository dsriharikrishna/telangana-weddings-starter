import apiService, { API_ENDPOINTS } from './apiService';

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameTe: string;
  iconName?: string;
  sortOrder: number;
}

export interface Vendor {
  id: string;
  businessName: string;
  slug: string;
  description?: string;
  phone: string;
  whatsappNumber?: string;
  baseDistrict: string;
  baseMandal: string;
  baseVillageOrTown: string;
  startingPricePaise: number;
  ratingAverage: number;
  ratingCount: number;
  primaryCategory?: {
    nameEn: string;
    nameTe: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await apiService.get<ApiResponse<Category[]>>(API_ENDPOINTS.CATEGORIES);
  return res.data;
};

export const fetchVendors = async (params: {
  category?: string;
  district?: string;
  mandal?: string;
  page?: number;
}): Promise<{ items: Vendor[]; pagination: any }> => {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.district) query.append('district', params.district);
  if (params.mandal) query.append('mandal', params.mandal);
  if (params.page) query.append('page', params.page.toString());

  const url = `${API_ENDPOINTS.VENDORS}${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await apiService.get<ApiResponse<{ items: Vendor[]; pagination: any }>>(url);
  return res.data;
};

export const fetchVendorBySlug = async (slug: string): Promise<Vendor> => {
  const res = await apiService.get<ApiResponse<Vendor>>(API_ENDPOINTS.VENDOR_BY_SLUG(slug));
  return res.data;
};

export const submitEnquiry = async (data: {
  categorySlug: string;
  vendorId?: string;
  district: string;
  mandal: string;
  villageOrTown?: string;
  eventDate: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
}) => {
  const res = await apiService.post<ApiResponse<any>>(API_ENDPOINTS.ENQUIRIES, data);
  return res.data;
};

export const requestCallback = async (data: {
  customerName: string;
  customerPhone: string;
  district: string;
  mandal?: string;
  categorySlug?: string;
  notes?: string;
}) => {
  const res = await apiService.post<ApiResponse<any>>(API_ENDPOINTS.REQUEST_CALL, data);
  return res.data;
};
