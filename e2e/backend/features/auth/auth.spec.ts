import { test, expect } from '../../../shared/fixtures/auth.fixture';
import { E2E_CONFIG, generateTestPhone } from '../../../shared/support/constants';

test.describe('BACKEND FEATURE: Authentication & Identity Management', () => {
  test('OTP Generation: Should dispatch OTP successfully for valid Indian mobile number', async ({ request }) => {
    const phone = generateTestPhone();
    const res = await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/send-otp`, {
      data: { phone },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.message).toContain('OTP sent successfully');
  });

  test('OTP Verification: Should authenticate user and issue JWT with CUSTOMER role', async ({ request }) => {
    const phone = generateTestPhone();
    await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/send-otp`, { data: { phone } });

    const res = await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/verify-otp`, {
      data: {
        phone,
        otp: E2E_CONFIG.DEV_OTP,
        role: 'CUSTOMER',
        fullName: 'Ananya Rao',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.accessToken).toBeDefined();
    expect(body.data.user.roles).toContain('CUSTOMER');
  });

  test('Customer Profile: Should fetch and update authenticated customer profile', async ({ request, authenticatedCustomer }) => {
    const getRes = await request.get(`${E2E_CONFIG.BACKEND_URL}/customers/profile`, {
      headers: { Authorization: `Bearer ${authenticatedCustomer.token}` },
    });
    expect(getRes.status()).toBe(200);

    const patchRes = await request.patch(`${E2E_CONFIG.BACKEND_URL}/customers/profile`, {
      headers: { Authorization: `Bearer ${authenticatedCustomer.token}` },
      data: { preferredLanguage: 'te' },
    });
    expect(patchRes.status()).toBe(200);
    const updated = (await patchRes.json()).data;
    expect(updated.preferredLanguage).toBe('te');
  });
});

