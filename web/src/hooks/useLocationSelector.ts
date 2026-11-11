import { useEffect } from 'react';
import { useLocationModalStore } from '@/store/useLocationModalStore';
import { useAppStore } from '@/store/useAppStore';
import { TELANGANA_LOCATIONS } from '@/data';

export function useLocationSelector(isOpen: boolean, onClose: () => void) {
  const location = useAppStore((state) => state.location);
  const setLocation = useAppStore((state) => state.setLocation);
  const language = useAppStore((state) => state.language);

  const draftDistrictId = useLocationModalStore((state) => state.draftDistrictId);
  const draftMandalId = useLocationModalStore((state) => state.draftMandalId);
  const draftVillageId = useLocationModalStore((state) => state.draftVillageId);

  const setDraftDistrictId = useLocationModalStore((state) => state.setDraftDistrictId);
  const setDraftMandalId = useLocationModalStore((state) => state.setDraftMandalId);
  const setDraftVillageId = useLocationModalStore((state) => state.setDraftVillageId);
  const initializeDraft = useLocationModalStore((state) => state.initializeDraft);
  const resetDraftToDistrict = useLocationModalStore((state) => state.resetDraftToDistrict);

  // Sync draft state with global state when modal opens
  useEffect(() => {
    if (isOpen) {
      initializeDraft(location.district, location.mandal, location.village);
    }
  }, [isOpen, location.district, location.mandal, location.village, initializeDraft]);

  const activeDistrictObj =
    TELANGANA_LOCATIONS.districts.find((d) => d.id === draftDistrictId) ||
    TELANGANA_LOCATIONS.districts[0];

  const activeMandalObj = activeDistrictObj.mandals.find((m) => m.id === draftMandalId);

  const handleApply = () => {
    setLocation({
      state: 'telangana',
      district: draftDistrictId,
      mandal: draftMandalId,
      village: draftVillageId,
    });
    onClose();
  };

  const handleResetToAllDistrict = () => {
    setLocation({
      state: 'telangana',
      district: draftDistrictId,
      mandal: 'all',
      village: 'all',
    });
    resetDraftToDistrict(draftDistrictId);
    onClose();
  };

  return {
    language,
    draftDistrictId,
    draftMandalId,
    draftVillageId,
    activeDistrictObj,
    activeMandalObj,
    setDraftDistrictId,
    setDraftMandalId,
    setDraftVillageId,
    handleApply,
    handleResetToAllDistrict,
  };
}

