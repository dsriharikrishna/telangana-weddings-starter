import { create } from 'zustand';

export type AppMode = 'CUSTOMER' | 'VENDOR';

interface UserSession {
  id: string;
  phone: string;
  roles: string[];
  currentRole: string;
  fullName: string | null;
  customerId: string | null;
  vendorId: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: UserSession | null;
  appMode: AppMode | null; // null means user has not chosen yet
  setAppMode: (mode: AppMode) => void;
  setAuth: (tokens: { accessToken: string; user: UserSession }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  appMode: null,
  setAppMode: (mode) => set({ appMode: mode }),
  setAuth: ({ accessToken, user }) =>
    set({
      isAuthenticated: true,
      accessToken,
      user,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      accessToken: null,
      user: null,
    }),
}));

