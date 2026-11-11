import { useAppStore } from '@/store/useAppStore';
import { TELANGANA_LOCATIONS } from '@/data';

export function useLocation() {
  const location = useAppStore((state) => state.location);
  const setLocation = useAppStore((state) => state.setLocation);
  const language = useAppStore((state) => state.language);

  const districtObj = TELANGANA_LOCATIONS.districts.find((d) => d.id === location.district);
  const districtName = language === 'te' 
    ? (districtObj?.nameTe || 'నారాయణపేట') 
    : (districtObj?.nameEn || 'Narayanpet');

  const mandalObj = districtObj?.mandals.find((m) => m.id === location.mandal);
  const mandalName = location.mandal === 'all'
    ? (language === 'te' ? 'అన్ని మండలాలు' : 'All Mandals')
    : (language === 'te' ? (mandalObj?.nameTe || location.mandal) : (mandalObj?.nameEn || location.mandal));

  const villageObj = mandalObj?.villages.find((v) => v.id === location.village);
  const villageName = location.village === 'all'
    ? null
    : (language === 'te' ? (villageObj?.nameTe || location.village) : (villageObj?.nameEn || location.village));

  return {
    location,
    setLocation,
    districtObj,
    districtName,
    mandalObj,
    mandalName,
    villageObj,
    villageName,
  };
}

