import { test, expect } from '../../../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../../../shared/support/constants';

test.describe('BACKEND FEATURE: Locations Hierarchy & Hyperlocal Search', () => {
  test('List all Telangana districts', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/locations/districts`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('Search locations by keyword', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/locations/search`, {
      params: { q: 'Narayanpet' },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.districts.length).toBeGreaterThan(0);
  });
});

