import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function AppEntry() {
  const appMode = useAuthStore((state) => state.appMode);

  if (!appMode) {
    return <Redirect href="/mode-select" />;
  }

  return <Redirect href="/(tabs)" />;
}

