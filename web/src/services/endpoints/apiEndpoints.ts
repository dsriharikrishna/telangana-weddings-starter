export const API_ENDPOINTS = {
  // System Health
  HEALTH: '/health',

  // Authentication & Context
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  REFRESH_TOKEN: '/auth/refresh',
  SWITCH_ROLE: '/auth/switch-role',
  ME: '/auth/me',

  // Customer Profile
  CUSTOMER_PROFILE: '/customers/profile',

  // Category Taxonomy
  CATEGORIES: '/categories',
  CATEGORY_BY_SLUG: (slug: string) => `/categories/${slug}`,

  // Locations Hierarchy
  DISTRICTS: '/locations/districts',
  MANDALS: (districtId: string) => `/locations/districts/${districtId}/mandals`,
  VILLAGES: (mandalId: string) => `/locations/mandals/${mandalId}/villages`,
  LOCATIONS_SEARCH: '/locations/search',

  // Vendor Discovery
  VENDORS: '/vendors',
  VENDOR_BY_SLUG: (slug: string) => `/vendors/${slug}`,
  VENDOR_REGISTER: '/vendors/register',

  // Enquiries & Assisted Concierge
  ENQUIRIES: '/enquiries',
  REQUEST_CALL: '/enquiries/request-call',
  MY_ENQUIRIES: '/enquiries/my',

  // Vendor Lead Management & Monetization
  VENDOR_LEADS: '/vendor/leads',
  UNLOCK_LEAD: (assignmentId: string) => `/vendor/leads/${assignmentId}/unlock`,

  // Admin Backoffice Operations
  ADMIN_METRICS: '/admin/metrics',
  ADMIN_VENDORS: '/admin/vendors',
  ADMIN_VERIFY_VENDOR: (vendorId: string) => `/admin/vendors/${vendorId}/verification`,
  ADMIN_CREDITS: (vendorId: string) => `/admin/vendors/${vendorId}/credits`,
};

export default API_ENDPOINTS;

