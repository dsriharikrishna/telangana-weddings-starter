import { create } from 'zustand';

interface LocationModalState {
  draftDistrictId: string;
  draftMandalId: string;
  draftVillageId: string;
  
  setDraftDistrictId: (id: string) => void;
  setDraftMandalId: (id: string) => void;
  setDraftVillageId: (id: string) => void;
  initializeDraft: (district: string, mandal: string, village: string) => void;
  resetDraftToDistrict: (districtId: string) => void;
}

export const useLocationModalStore = create<LocationModalState>((set) => ({
  draftDistrictId: 'narayanpet',
  draftMandalId: 'all',
  draftVillageId: 'all',

  setDraftDistrictId: (draftDistrictId) => set({ draftDistrictId, draftMandalId: 'all', draftVillageId: 'all' }),
  setDraftMandalId: (draftMandalId) => set({ draftMandalId, draftVillageId: 'all' }),
  setDraftVillageId: (draftVillageId) => set({ draftVillageId }),

  initializeDraft: (draftDistrictId, draftMandalId, draftVillageId) =>
    set({ draftDistrictId, draftMandalId, draftVillageId }),

  resetDraftToDistrict: (draftDistrictId) =>
    set({ draftDistrictId, draftMandalId: 'all', draftVillageId: 'all' }),
}));

