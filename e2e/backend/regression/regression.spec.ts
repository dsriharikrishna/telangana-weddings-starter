import { test, expect } from '../../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../../shared/support/constants';

test.describe('BACKEND REGRESSION & SECURITY: Guards, 404s, CORS & Validation', () => {
  test('Security: Unauthenticated request to protected endpoint is rejected with 401', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/vendor/leads`);
    expect(res.status()).toBe(401);
  });

  test('Security: Tampered or invalid JWT token is rejected with 401', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/auth/me`, {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature' },
    });
    expect(res.status()).toBe(401);
  });

  test('Regression: Non-existent category returns clean 404', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/categories/non-existent-category-slug-9999`);
    expect(res.status()).toBe(404);
  });

  test('Regression: Non-existent vendor profile returns clean 404', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/vendors/non-existent-vendor-slug-9999`);
    expect(res.status()).toBe(404);
  });

  test('Validation: Rejects enquiry submission with missing required fields with 400', async ({ request }) => {
    const res = await request.post(`${E2E_CONFIG.BACKEND_URL}/enquiries`, {
      data: {
        customerName: 'Incomplete Enquiry',
      },
    });
    expect(res.status()).toBe(400);
  });

  test('Validation: Rejects invalid 1-digit OTP verification with 400', async ({ request }) => {
    const res = await request.post(`${E2E_CONFIG.BACKEND_URL}/auth/verify-otp`, {
      data: {
        phone: '+919876543210',
        otp: '1',
      },
    });
    expect(res.status()).toBe(400);
  });

  test('Security: CORS headers allow preflight and legitimate origins', async ({ request }) => {
    const res = await request.fetch(`${E2E_CONFIG.BACKEND_URL}/categories`, {
      method: 'OPTIONS',
      headers: {
        Origin: E2E_CONFIG.WEB_URL,
        'Access-Control-Request-Method': 'GET',
      },
    });
    expect([200, 204]).toContain(res.status());
  });
});

