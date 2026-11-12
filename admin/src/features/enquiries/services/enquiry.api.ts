import apiService from '@/services/apiService';
import { ENQUIRY_ENDPOINTS } from './enquiryEndpoints';
import { AdminEnquiry } from '../types/enquiry.types';
import { ApiResponse } from '@/types/api';

export const MOCK_ADMIN_ENQUIRIES: AdminEnquiry[] = [
  {
    id: 'TW-ENQ-104',
    referenceNumber: 'TW-VILL-2026-104',
    source: 'callback_request',
    customerName: 'K. Somanna',
    customerPhone: '+91 98480 12345',
    categorySlug: 'band-melam-sannai',
    district: 'narayanpet',
    mandal: 'makthal',
    villageOrTown: 'Maganoor Village',
    preferredLanguage: 'te',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TW-ENQ-103',
    referenceNumber: 'TW-VILL-2026-103',
    source: 'whatsapp_assisted',
    customerName: 'B. Venkatamma',
    customerPhone: '+91 94401 54321',
    categorySlug: 'catering',
    district: 'mahabubnagar',
    mandal: 'koilkonda',
    villageOrTown: 'Koilkonda Village',
    preferredLanguage: 'te',
    status: 'contacted',
    createdAt: new Date().toISOString(),
  },
];

export const enquiryApi = {
  getAdminEnquiries: async (): Promise<AdminEnquiry[]> => {
    try {
      const res = await apiService.get<ApiResponse<any[]>>(ENQUIRY_ENDPOINTS.ADMIN_ENQUIRIES);
      if (res.data && res.data.length > 0) {
        return res.data.map((item: any) => ({
          id: item.id,
          referenceNumber: item.referenceNumber || item.id,
          source: item.source ? item.source.toLowerCase() : 'website',
          customerName: item.customerName,
          customerPhone: item.customerPhone,
          categorySlug: item.categorySlug,
          district: item.district,
          mandal: item.mandal,
          villageOrTown: item.villageOrTown,
          preferredLanguage: 'te',
          status: item.status ? item.status.toLowerCase() : 'pending',
          createdAt: item.createdAt,
        }));
      }
    } catch (err) {
      console.warn('Backend admin enquiries failed, falling back:', err);
    }
    return MOCK_ADMIN_ENQUIRIES;
  },
};

