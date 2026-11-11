import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssistedEnquiry } from '@/types';
import { MockWebAccount } from '@/data/sample-users';

export type Language = 'en' | 'te';

export interface LocationState {
  state: string;    // "telangana"
  district: string; // e.g. "narayanpet", "mahabubnagar"
  mandal: string;   // e.g. "all", "narayanpet-mandal"
  village: string;  // e.g. "all", "singaram", "narayanpet-town"
}

interface AppState {
  // Multilingual preference
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  // Geographic location filter
  location: LocationState;
  setLocation: (loc: LocationState) => void;
  setDistrict: (district: string) => void;
  setMandal: (mandal: string) => void;
  setVillage: (village: string) => void;
  
  // Category & subcategory filter
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  
  // Search query
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Active User Auth State
  currentUser: MockWebAccount | null;
  setCurrentUser: (user: MockWebAccount | null) => void;
  loginUser: (user: MockWebAccount) => void;
  logoutUser: () => void;

  // Assisted Enquiries State
  enquiries: AssistedEnquiry[];
  submitAssistedEnquiry: (enquiry: Omit<AssistedEnquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => AssistedEnquiry;
  
  // Currency Formatter
  formatCurrency: (paise?: number) => string;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'te',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'te' : 'en' })),

      location: {
        state: 'telangana',
        district: 'narayanpet',
        mandal: 'all',
        village: 'all',
      },
      setLocation: (location) => set({ location }),
      setDistrict: (district) =>
        set((state) => ({
          location: { ...state.location, district, mandal: 'all', village: 'all' },
        })),
      setMandal: (mandal) =>
        set((state) => ({
          location: { ...state.location, mandal, village: 'all' },
        })),
      setVillage: (village) =>
        set((state) => ({
          location: { ...state.location, village },
        })),

      selectedCategory: 'all',
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

      selectedSubcategory: 'all',
      setSelectedSubcategory: (selectedSubcategory) => set({ selectedSubcategory }),

      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      currentUser: null,
      setCurrentUser: (currentUser) => set({ currentUser }),

      loginUser: (user: MockWebAccount) => {
        if (typeof document !== 'undefined') {
          document.cookie = `tw_user_token=${user.id}; path=/; max-age=86400; SameSite=Lax`;
          document.cookie = `tw_user_role=${user.role}; path=/; max-age=86400; SameSite=Lax`;
        }
        set({ currentUser: user });
      },

      logoutUser: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'tw_user_token=; path=/; max-age=0; SameSite=Lax';
          document.cookie = 'tw_user_role=; path=/; max-age=0; SameSite=Lax';
        }
        set({ currentUser: null });
      },

      enquiries: [],
      submitAssistedEnquiry: (data) => {
        const id = `enq_${Date.now()}`;
        const refNumber = `TW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newEnquiry: AssistedEnquiry = {
          ...data,
          id,
          referenceNumber: refNumber,
          createdAt: new Date().toISOString(),
          status: 'received',
        };

        set((state) => ({
          enquiries: [newEnquiry, ...state.enquiries],
        }));

        return newEnquiry;
      },

      formatCurrency: (paise?: number) => {
        if (paise === undefined || paise === null) return '₹0';
        const rupees = Math.round(paise / 100);
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(rupees);
      },
    }),
    {
      name: 'tw-marketplace-storage',
      partialize: (state) => ({
        language: state.language,
        location: state.location,
        selectedCategory: state.selectedCategory,
        currentUser: state.currentUser,
        enquiries: state.enquiries,
      }),
    }
  )
);
