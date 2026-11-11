import { useAdminStore } from '@/store/useAdminStore';

export function useLanguage() {
  const language = useAdminStore((state) => state.language);
  const setLanguage = useAdminStore((state) => state.setLanguage);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    isTelugu: language === 'te',
    isEnglish: language === 'en',
  };
}
