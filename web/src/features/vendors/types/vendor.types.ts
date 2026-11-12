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

export interface VendorLead {
  assignmentId: string;
  status: 'ASSIGNED' | 'UNLOCKED' | 'DECLINED' | 'CONTACTED';
  categorySlug: string;
  categoryName?: string;
  district: string;
  mandal: string;
  villageOrTown: string;
  eventDate: string;
  budgetPaise: number;
  guestCount?: number;
  serviceRequested?: string;
  isUnlocked: boolean;
  customerName: string;
  customerPhone: string;
  notes?: string;
  receivedAt?: string;
}

export interface VendorLeadsData {
  walletBalance: number;
  leads: VendorLead[];
}

export interface UnlockLeadResponse {
  assignmentId: string;
  status: string;
  unlockedAt: string;
  remainingCredits: number;
  lead: {
    customerName: string;
    customerPhone: string;
    villageOrTown: string;
    mandal: string;
    district: string;
    eventDate: string;
    budgetPaise: number;
    guestCount?: number;
    notes?: string;
  };
}

