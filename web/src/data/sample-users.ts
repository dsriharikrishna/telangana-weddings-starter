export interface MockWebAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'customer' | 'vendor';
  badgeLabel: string;
  avatarInitials: string;
  location: string;
  description: string;
  vendorDetails?: {
    businessName: string;
    categorySlug: string;
    isVerified: boolean;
  };
}

export const SAMPLE_WEB_ACCOUNTS: MockWebAccount[] = [
  {
    id: 'CUST-01',
    name: 'K. Somanna (Groom Family)',
    phone: '9848012345',
    email: 'somanna@telanganaweddings.com',
    role: 'customer',
    badgeLabel: 'Customer',
    avatarInitials: 'KS',
    location: 'Makthal Mandal, Narayanpet',
    description: 'Planning groom wedding ceremony in Makthal village.',
  },
  {
    id: 'CUST-02',
    name: 'B. Venkatamma (Bride Family)',
    phone: '9989098765',
    email: 'venkatamma@telanganaweddings.com',
    role: 'customer',
    badgeLabel: 'Customer',
    avatarInitials: 'BV',
    location: 'Koilkonda, Mahabubnagar',
    description: 'Looking for Kalyana Mandapam and traditional catering.',
  },
  {
    id: 'VEND-01',
    name: 'Sri Raghavendra Band & Sannai Melam',
    phone: '9440154321',
    email: 'vendor.melam@telanganaweddings.com',
    role: 'vendor',
    badgeLabel: 'Master Artisan Vendor',
    avatarInitials: 'SR',
    location: 'Narayanpet Town',
    description: 'Generational Sannai Melam & Brass Band troupe with 25+ years experience.',
    vendorDetails: {
      businessName: 'Sri Raghavendra Band & Sannai Melam',
      categorySlug: 'band-melam-sannai',
      isVerified: true,
    },
  },
  {
    id: 'VEND-02',
    name: 'Maa Telangana Ruchulu Caterers',
    phone: '9866011223',
    email: 'vendor.catering@telanganaweddings.com',
    role: 'vendor',
    badgeLabel: 'Verified Caterer',
    avatarInitials: 'MT',
    location: 'Mahabubnagar Town',
    description: 'Traditional Telangana Pindi Vantalu, Bagara Rice & Dalcha catering.',
    vendorDetails: {
      businessName: 'Maa Telangana Ruchulu Caterers',
      categorySlug: 'catering',
      isVerified: true,
    },
  },
];
