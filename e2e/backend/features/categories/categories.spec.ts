import { test, expect } from '../../../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../../../shared/support/constants';

test.describe('BACKEND FEATURE: Category Taxonomy', () => {
  test('List all root service categories', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/categories`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    const photography = body.data.find((c: any) => c.slug === 'traditional-photography' || c.id === 'cat_photo');
    expect(photography).toBeDefined();
  });

  test('Fetch category details by slug', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/categories/traditional-photography`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.nameEn).toBeDefined();
  });
});

