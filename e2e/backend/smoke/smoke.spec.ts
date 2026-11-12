import { test, expect } from '../../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../../shared/support/constants';

test.describe('BACKEND SMOKE SUITE: Health & Service Availability', () => {
  test('Backend API Health & Database Connection', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('ok');
  });

  test('Public Category Taxonomy is Loaded', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/categories`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.data.length).toBeGreaterThanOrEqual(1);
  });
});

