import { create } from 'zustand';

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
  setAuth: (tokens: { accessToken: string; user: UserSession }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
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

