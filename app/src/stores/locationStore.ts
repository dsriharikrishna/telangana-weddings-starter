import { create } from 'zustand';

interface LocationState {
  district: string;
  mandal: string;
  villageOrTown: string;
  language: 'te' | 'en';
  setLocation: (loc: { district?: string; mandal?: string; villageOrTown?: string }) => void;
  setLanguage: (lang: 'te' | 'en') => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  district: 'Narayanpet',
  mandal: 'Makthal',
  villageOrTown: 'Maganoor',
  language: 'te',
  setLocation: (loc) => set((state) => ({ ...state, ...loc })),
  setLanguage: (lang) => set({ language: lang }),
}));

