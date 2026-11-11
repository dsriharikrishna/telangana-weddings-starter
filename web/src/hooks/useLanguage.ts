import { useAppStore } from '@/store/useAppStore';

export function useLanguage() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  return {
    language,
    setLanguage,
    isTelugu: language === 'te',
    isEnglish: language === 'en',
  };
}

