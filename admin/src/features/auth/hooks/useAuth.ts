import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../services/auth.api';
import { SendOtpPayload, VerifyOtpPayload } from '../types/auth.types';

export const AUTH_QUERY_KEYS = {
  me: ['auth', 'me'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.me,
    queryFn: () => authApi.getCurrentUser(),
    retry: false,
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => authApi.sendOtp(payload),
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authApi.verifyOtp(payload),
    onSuccess: (session) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, session.user);
    },
  });
}

export function useSwitchRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetRole: string) => authApi.switchRole(targetRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.me });
    },
  });
}

