import { apiClient } from '../services/apiClient';

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

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await apiClient.get('/categories');
  return res.data;
};

export const fetchVendors = async (params: {
  category?: string;
  district?: string;
  mandal?: string;
  page?: number;
}): Promise<{ items: Vendor[]; pagination: any }> => {
  const res = await apiClient.get('/vendors', { params });
  return res.data;
};

export const fetchVendorBySlug = async (slug: string): Promise<Vendor> => {
  const res = await apiClient.get(`/vendors/${slug}`);
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
  const res = await apiClient.post('/enquiries', data);
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
  const res = await apiClient.post('/enquiries/request-call', data);
  return res.data;
};

