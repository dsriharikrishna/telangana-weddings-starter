import apiService from '@/services/apiService';
import { ADMIN_VENDOR_ENDPOINTS } from './adminVendorEndpoints';
import { AdminVendor, VerifyVendorPayload, GrantCreditsPayload } from '../types/adminVendor.types';
import { ApiResponse } from '@/types/api';
import { SAMPLE_VENDORS } from '@/data';
import { Vendor } from '@/types';

export const adminVendorApi = {
  getVendors: async (status?: string): Promise<Vendor[]> => {
    try {
      const url = status ? `${ADMIN_VENDOR_ENDPOINTS.LIST}?status=${status}` : ADMIN_VENDOR_ENDPOINTS.LIST;
      const res = await apiService.get<ApiResponse<any[]>>(url);
      if (res.data && res.data.length > 0) {
        return res.data.map((item: any): Vendor => ({
          id: item.id,
          businessName: item.businessName,
          ownerName: item.businessName?.split(' ')[0] + ' Garu',
          phone: item.phone,
          categorySlug: item.primaryCategory?.slug || 'band-melam-sannai',
          district: item.baseDistrict || 'Narayanpet',
          mandal: item.baseMandal || 'Makthal',
          townOrVillage: item.baseVillageOrTown || 'Town Center',
          startingPricePaise: item.startingPricePaise || 2000000,
          rating: item.ratingAverage || 4.8,
          reviewCount: item.ratingCount || 1,
          isVerified: item.verificationStatus === 'VERIFIED',
          yearsOfExperience: 8,
          willTravel: true,
          image: '/images/categories/band-melam.jpg',
          aboutEn: item.description || 'Experienced local wedding vendor.',
          aboutTe: 'విశ్వసనీయమైన వివాహ సేవలు.',
        }));
      }
    } catch (err) {
      console.warn('Backend vendors fetch failed, using sample dataset:', err);
    }
    return SAMPLE_VENDORS;
  },

  getVendorDetail: async (vendorId: string): Promise<Vendor | null> => {
    const vendor = SAMPLE_VENDORS.find((v: Vendor) => v.id === vendorId);
    return vendor || null;
  },

  verifyVendor: async (payload: VerifyVendorPayload): Promise<AdminVendor> => {
    const res = await apiService.patch<ApiResponse<AdminVendor>>(
      ADMIN_VENDOR_ENDPOINTS.VERIFY(payload.vendorId),
      {
        status: payload.status,
        notes: payload.notes,
      },
    );
    return res.data;
  },

  grantCredits: async (payload: GrantCreditsPayload): Promise<any> => {
    const res = await apiService.patch<ApiResponse<any>>(
      ADMIN_VENDOR_ENDPOINTS.CREDITS(payload.vendorId),
      {
        credits: payload.amount,
        reason: payload.reason,
      },
    );
    return res.data;
  },
};
