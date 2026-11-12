import { test, expect } from '../../../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../../../shared/support/constants';

test.describe('BACKEND FEATURE: Vendor Registration, Directory & Lead Inbox', () => {
  test('Vendor Directory: Query vendors with district and category filters', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.BACKEND_URL}/vendors`, {
      params: {
        district: 'Narayanpet',
        category: 'cat_photo',
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data?.items || body.data)).toBe(true);
  });

  test('Multi-Role Evolution: Customer becomes Vendor and accesses leads', async ({ request, authenticatedVendor }) => {
    expect(authenticatedVendor.vendorId).toBeDefined();

    // Verify vendor lead inbox access
    const leadsRes = await request.get(`${E2E_CONFIG.BACKEND_URL}/vendor/leads`, {
      headers: { Authorization: `Bearer ${authenticatedVendor.token}` },
    });
    expect(leadsRes.status()).toBe(200);
    const body = await leadsRes.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data.leads)).toBe(true);
    expect(typeof body.data.walletBalance).toBe('number');
  });
});

