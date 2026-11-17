import apiService, { API_ENDPOINTS } from './apiService';

export interface Subcategory {
  id: string;
  slug: string;
  nameEn: string;
  nameTe: string;
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameTe: string;
  iconName?: string;
  sortOrder: number;
  subcategories?: Subcategory[];
}

export interface VendorServiceItem {
  id: string;
  title: string;
  description?: string;
  pricePaise: number;
  inclusions?: string;
  experienceYrs?: number;
  completedDeals?: number;
  sampleImages?: string[];
  isActive?: boolean;
}

export interface VendorPortfolioItem {
  id: string;
  mediaUrl: string;
  mediaType: string;
  caption?: string;
  sortOrder: number;
}

export interface VendorReviewItem {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  village?: string;
  createdAt: string;
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
    id?: string;
    slug?: string;
    nameEn: string;
    nameTe: string;
  };
  services?: VendorServiceItem[];
  portfolioMedia?: VendorPortfolioItem[];
  reviews?: VendorReviewItem[];
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
  subcategory?: string;
  district?: string;
  mandal?: string;
  page?: number;
}): Promise<{ items: Vendor[]; pagination: any }> => {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.subcategory) query.append('subcategory', params.subcategory);
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

// -------------------------------------------------------------
// VENDOR PORTAL API METHODS
// -------------------------------------------------------------

export interface VendorWalletDetails {
  id: string;
  vendorId: string;
  balanceCredits: number;
  balancePaise: number;
  transactions?: {
    id: string;
    type: string;
    amount: number;
    amountPaise: number;
    description: string;
    createdAt: string;
  }[];
}

export const fetchVendorPortalProfile = async (vendorId?: string): Promise<Vendor> => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_PROFILE}?userId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_PROFILE;
  const res = await apiService.get<ApiResponse<Vendor>>(url);
  return res.data;
};

export const fetchVendorPortalServices = async (vendorId?: string): Promise<VendorServiceItem[]> => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_SERVICES}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_SERVICES;
  const res = await apiService.get<ApiResponse<VendorServiceItem[]>>(url);
  return res.data;
};

export const createVendorPortalService = async (
  data: {
    title: string;
    description?: string;
    pricePaise: number;
    inclusions?: string;
    subcategoryId?: string;
    experienceYrs?: number;
    completedDeals?: number;
    sampleImages?: string[];
  },
  vendorId?: string
) => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_SERVICES}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_SERVICES;
  const res = await apiService.post<ApiResponse<any>>(url, data);
  return res.data;
};

export const updateVendorPortalService = async (
  serviceId: string,
  data: {
    title?: string;
    description?: string;
    pricePaise?: number;
    inclusions?: string;
    isActive?: boolean;
  },
  vendorId?: string
) => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_SERVICE_BY_ID(serviceId)}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_SERVICE_BY_ID(serviceId);
  const res = await apiService.put<ApiResponse<any>>(url, data);
  return res.data;
};

export const deleteVendorPortalService = async (serviceId: string, vendorId?: string) => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_SERVICE_BY_ID(serviceId)}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_SERVICE_BY_ID(serviceId);
  const res = await apiService.delete<ApiResponse<any>>(url);
  return res.data;
};

export const fetchVendorPortalWallet = async (vendorId?: string): Promise<VendorWalletDetails> => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_WALLET}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_WALLET;
  const res = await apiService.get<ApiResponse<VendorWalletDetails>>(url);
  return res.data;
};

export const rechargeVendorWallet = async (
  amountPaise: number,
  vendorId?: string
) => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_WALLET_RECHARGE}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_WALLET_RECHARGE;
  const res = await apiService.post<ApiResponse<any>>(url, { amountPaise });
  return res.data;
};

export const fetchVendorPortalReviews = async (vendorId?: string): Promise<VendorReviewItem[]> => {
  const url = vendorId
    ? `${API_ENDPOINTS.VENDOR_PORTAL_REVIEWS}?vendorId=${vendorId}`
    : API_ENDPOINTS.VENDOR_PORTAL_REVIEWS;
  const res = await apiService.get<ApiResponse<VendorReviewItem[]>>(url);
  return res.data;
};

