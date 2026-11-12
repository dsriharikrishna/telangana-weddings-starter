export interface User {
  id: string;
  phone: string;
  fullName?: string;
  email?: string;
  activeRole: string;
  roles: string[];
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
  role?: string;
  fullName?: string;
}

