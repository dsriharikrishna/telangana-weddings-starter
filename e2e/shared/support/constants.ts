export const E2E_CONFIG = {
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3002/api/v1',
  WEB_URL: process.env.WEB_URL || 'http://localhost:3000',
  ADMIN_URL: process.env.ADMIN_URL || 'http://localhost:3001',
  DEFAULT_DISTRICT: 'Narayanpet',
  DEFAULT_MANDAL: 'Makthal',
  DEV_OTP: '123456',
};

export function generateTestPhone(): string {
  return `+9198765${Math.floor(10000 + Math.random() * 90000)}`;
}

