import { test as base, expect, APIRequestContext, Page } from '@playwright/test';
import { E2E_CONFIG, generateTestPhone } from '../support/constants';

type TestFixtures = {
  authenticatedCustomer: {
    phone: string;
    token: string;
    userId: string;
  };
  authenticatedVendor: {
    phone: string;
    token: string;
    userId: string;
    vendorId: string;
  };
};

export const test = base.extend<TestFixtures>({
  authenticatedCustomer: async ({ request }, use) => {
    const phone = generateTestPhone();
    
    // 1. Send OTP
    await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/send-otp`, {
      data: { phone },
    });

    // 2. Verify OTP
    const verifyRes = await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/verify-otp`, {
      data: {
        phone,
        otp: E2E_CONFIG.DEV_OTP,
        role: 'CUSTOMER',
        fullName: 'Test Customer',
      },
    });

    const body = await verifyRes.json();
    const token = body.data.accessToken;
    const userId = body.data.user.id;

    await use({ phone, token, userId });
  },

  authenticatedVendor: async ({ request }, use) => {
    const phone = generateTestPhone();

    // 1. Send OTP
    await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/send-otp`, {
      data: { phone },
    });

    // 2. Verify OTP as Customer first
    const verifyRes = await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/verify-otp`, {
      data: {
        phone,
        otp: E2E_CONFIG.DEV_OTP,
        role: 'CUSTOMER',
        fullName: 'Test Vendor Owner',
      },
    });
    const authData = (await verifyRes.json()).data;
    const token = authData.accessToken;
    const userId = authData.user.id;

    // 3. Register as Vendor
    const regRes = await request.post(`${E2E_CONFIG.BACKEND_URL}/vendors/register`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        businessName: `Test Vendor ${Date.now()}`,
        primaryCategoryId: 'cat_photo',
        phone,
        baseDistrict: E2E_CONFIG.DEFAULT_DISTRICT,
        baseMandal: E2E_CONFIG.DEFAULT_MANDAL,
        baseVillageOrTown: 'Station Road',
        startingPrice: 20000,
      },
    });
    const vendorData = (await regRes.json()).data;
    const vendorId = vendorData?.id || '';

    // Switch role to acquire VENDOR_OWNER token
    const switchRes = await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/switch-role`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { targetRole: 'VENDOR_OWNER' },
    });
    let activeToken = token;
    if (switchRes.status() === 200) {
      const switchData = await switchRes.json();
      activeToken = switchData.data?.accessToken || token;
    }

    await use({ phone, token: activeToken, userId, vendorId });
  },
});

export { expect };

