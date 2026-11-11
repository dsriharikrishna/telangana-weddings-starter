import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockAdminAccount } from '@/data/sample-logins';

export type Language = 'en' | 'te';

interface AdminState {
  // Sidebar State
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Language & UI Preferences
  language: Language;
  setLanguage: (lang: Language) => void;

  // Selected Filter State for Admin Lists
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedMandal: string;
  setSelectedMandal: (mandal: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Active Admin Auth State
  adminUser: MockAdminAccount | null;
  setAdminUser: (user: MockAdminAccount | null) => void;
  loginWithAccount: (account: MockAdminAccount) => void;
  logout: () => void;

  // Utility helpers
  formatCurrency: (amount?: number) => string;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      // Sidebar default open on desktop
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (isSidebarCollapsed) => set({ isSidebarCollapsed }),

      language: 'en',
      setLanguage: (language) => set({ language }),

      selectedDistrict: 'all',
      setSelectedDistrict: (selectedDistrict) => set({ selectedDistrict, selectedMandal: 'all' }),
      selectedMandal: 'all',
      setSelectedMandal: (selectedMandal) => set({ selectedMandal }),
      selectedCategory: 'all',
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      adminUser: {
        id: 'ADM-SUPER-01',
        name: 'Ramesh Reddy (SuperAdmin)',
        email: 'admin@telanganaweddings.com',
        role: 'superadmin',
        avatarInitials: 'RR',
        badgeLabel: 'Super Admin',
        description: 'Full access to all districts, finance settlements & platform settings',
        password: 'admin@telangana2026',
      },
      setAdminUser: (adminUser) => set({ adminUser }),

      loginWithAccount: (account: MockAdminAccount) => {
        if (typeof document !== 'undefined') {
          document.cookie = `tw_admin_token=${account.id}; path=/; max-age=86400; SameSite=Lax`;
        }
        set({ adminUser: account });
      },

      logout: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'tw_admin_token=; path=/; max-age=0; SameSite=Lax';
        }
        set({ adminUser: null });
      },

      formatCurrency: (amount?: number) => {
        if (amount === undefined || amount === null) return '₹0';
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(amount);
      },
    }),
    {
      name: 'tw-admin-storage',
    }
  )
);
