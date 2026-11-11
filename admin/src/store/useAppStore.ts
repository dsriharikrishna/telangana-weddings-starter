import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssistedEnquiry } from '@/types';

export type Language = 'en' | 'te';

export interface LocationState {
  state: string;    // "telangana"
  district: string; // e.g. "narayanpet", "mahabubnagar"
  mandal: string;   // e.g. "all", "narayanpet-mandal"
  village: string;  // e.g. "all", "singaram", "narayanpet-town"
}

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  location: LocationState;
  setLocation: (loc: LocationState) => void;
  
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  
  enquiries: AssistedEnquiry[];
  submitAssistedEnquiry: (enquiry: Omit<AssistedEnquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => AssistedEnquiry;
  
  formatCurrency: (paise?: number) => string;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'te',
      setLanguage: (language) => set({ language }),

      location: {
        state: 'telangana',
        district: 'narayanpet',
        mandal: 'all',
        village: 'all',
      },
      setLocation: (location) => set({ location }),

      selectedCategory: 'all',
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

      selectedSubcategory: 'all',
      setSelectedSubcategory: (selectedSubcategory) => set({ selectedSubcategory }),

      enquiries: [],
      submitAssistedEnquiry: (data) => {
        const id = `enq-${Date.now()}`;
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const referenceNumber = `TW-${data.district.substring(0, 3).toUpperCase()}-${randomSuffix}`;
        
        const newEnquiry: AssistedEnquiry = {
          ...data,
          id,
          referenceNumber,
          createdAt: new Date().toISOString(),
          status: 'received',
        };

        set((state) => ({
          enquiries: [newEnquiry, ...state.enquiries],
        }));

        return newEnquiry;
      },

      formatCurrency: (paise?: number) => {
        if (typeof paise !== 'number' || isNaN(paise)) return '';
        const rupees = paise / 100;
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(rupees);
      },
    }),
    {
      name: 'telangana-weddings-app-store',
      partialize: (state) => ({
        language: state.language,
        location: state.location,
        enquiries: state.enquiries,
      }),
    }
  )
);

