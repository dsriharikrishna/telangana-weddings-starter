export interface Vendor {
  id: string;
  slug: string;
  businessName: string;
  description?: string;
  phone: string;
  whatsappNumber?: string;
  baseDistrict: string;
  baseMandal: string;
  baseVillageOrTown: string;
  startingPrice: number;
  ratingAvg: number;
  reviewsCount: number;
  verificationStatus: string;
  primaryCategory?: {
    id: string;
    slug: string;
    nameEn: string;
    nameTe: string;
  };
}

export interface VendorQueryParams {
  district?: string;
  mandal?: string;
  category?: string;
  page?: number;
  limit?: number;
}

