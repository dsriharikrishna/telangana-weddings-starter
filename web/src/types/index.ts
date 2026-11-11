export interface Subcategory {
  id: string;
  slug: string;
  nameEn: string;
  nameTe: string;
  descriptionEn: string;
  descriptionTe: string;
  features: string[];
}

export interface Category {
  id: string;
  slug: string;
  number: number;
  nameEn: string;
  nameTe: string;
  descriptionEn: string;
  descriptionTe: string;
  iconName: string;
  image: string;
  subcategories?: Subcategory[];
  tags: string[];
}

export interface LocationHierarchy {
  state: string;
  districts: {
    id: string;
    nameEn: string;
    nameTe: string;
    mandals: {
      id: string;
      nameEn: string;
      nameTe: string;
      villages: {
        id: string;
        nameEn: string;
        nameTe: string;
        isTown?: boolean;
      }[];
    }[];
  }[];
}

export type VendorCoverageType = 
  | "village"        // In Your Village
  | "nearby-village"  // Nearby Village
  | "mandal"          // Mandal-Level Vendor
  | "town"            // Town-Level Vendor
  | "serves-area";    // Serves Your Area

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  categorySlug: string;
  subcategorySlug?: string;
  district: string;
  mandal: string;
  townOrVillage: string;
  businessType?: "village" | "town" | "mandal";
  // Service coverage fields
  servesVillages?: string[]; // IDs or names of villages served
  servesMandals?: string[];  // IDs or names of mandals served
  willTravel: boolean;
  travelChargesPolicyEn?: string;
  travelChargesPolicyTe?: string;
  minimumBookingNoticeDays?: number;
  // Trust & Transparency
  isVerified: boolean;
  verificationBadgeType?: "field_verified" | "phone_verified" | "master_artisan";
  yearsOfExperience: number;
  image: string;
  portfolioImages?: string[];
  startingPricePaise?: number; // optional: only shown if provided by vendor
  pricingUnitEn?: string;
  pricingUnitTe?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  aboutEn: string;
  aboutTe: string;
  sampleNotice?: string;
  phone?: string;
  whatsapp?: string;
  approxDistanceKm?: number; // Distance in km when reliable location data is available
}

export type AssistedEnquirySource = 
  | "callback_request" 
  | "whatsapp_assisted" 
  | "simple_enquiry" 
  | "family_contact" 
  | "direct_quote";

export interface AssistedEnquiry {
  id: string;
  referenceNumber: string; // e.g. TW-VILL-2026-XXXX
  source: AssistedEnquirySource;
  customerName: string;
  customerPhone: string;
  familyMemberName?: string;
  familyMemberPhone?: string;
  villageOrTown: string;
  mandal: string;
  district: string;
  categorySlug: string;
  subcategorySlug?: string;
  weddingDate?: string;
  vendorId?: string;
  vendorBusinessName?: string;
  preferredLanguage: "te" | "en";
  notes?: string;
  createdAt: string;
  status: "received" | "coordinator_assigned" | "contacted" | "quotation_sent" | "completed";
}

