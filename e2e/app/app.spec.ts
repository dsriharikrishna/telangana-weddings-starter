import { test, expect } from '../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../shared/support/constants';

test.describe('MOBILE APP CONTRACT & HYDRATION: Customer Mobile App APIs', () => {
  test('App Bootstrap: Categories taxonomy feeds mobile category grid', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/categories`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('App Search: Hyperlocal location filtering by district', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/locations/districts`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });
});

