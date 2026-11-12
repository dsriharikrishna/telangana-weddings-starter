export interface MockAdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'moderator' | 'support' | 'finance';
  avatarInitials: string;
  badgeLabel: string;
  description: string;
  password: string; // for one-click fill
}

export const SAMPLE_ADMIN_USERS: MockAdminAccount[] = [
  {
    id: 'ADM-SUPER-01',
    name: 'Ramesh Reddy (SuperAdmin)',
    email: 'admin@telanganaweddings.com',
    role: 'superadmin',
    avatarInitials: 'RR',
    badgeLabel: 'Super Admin',
    description: 'Full access to all districts, finance settlements & platform settings',
    password: 'admin@telangana2026',
  },
  {
    id: 'ADM-MOD-02',
    name: 'K. Somanna (KYC Moderator)',
    email: 'moderator@telanganaweddings.com',
    role: 'moderator',
    avatarInitials: 'KS',
    badgeLabel: 'KYC Moderator',
    description: 'Verifies rural vendor documents, Aadhaar cards & certificates',
    password: 'moderator@telangana2026',
  },
  {
    id: 'ADM-SUP-03',
    name: 'B. Venkatamma (Rural Concierge)',
    email: 'support@telanganaweddings.com',
    role: 'support',
    avatarInitials: 'BV',
    badgeLabel: 'Customer Support',
    description: 'Assisted phone callback desk & Mandal coordinator',
    password: 'support@telangana2026',
  },
  {
    id: 'ADM-FIN-04',
    name: 'L. Narsimha (Finance Lead)',
    email: 'finance@telanganaweddings.com',
    role: 'finance',
    avatarInitials: 'LN',
    badgeLabel: 'Finance & Subscriptions',
    description: 'Vendor subscriptions, lead credit packages & invoice records',
    password: 'finance@telangana2026',
  },
];

