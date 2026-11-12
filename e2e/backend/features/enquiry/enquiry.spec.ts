import { test, expect } from '../../../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../../../shared/support/constants';

test.describe('BACKEND FEATURE: Customer Enquiries & Assisted Concierge', () => {
  test('Direct Requirement: Submit wedding enquiry and receive reference number', async ({ request }) => {
    const res = await request.post(`${E2E_CONFIG.BACKEND_URL}/enquiries`, {
      data: {
        customerName: 'Kavitha Reddy',
        customerPhone: '+919988776655',
        categorySlug: 'traditional-photography',
        eventDate: '2026-12-25T00:00:00.000Z',
        district: 'Narayanpet',
        mandal: 'Makthal',
        villageOrTown: 'Station Road',
        budget: 50000,
        notes: 'Require traditional wedding photography and candid videography.',
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.referenceNumber).toMatch(/^ENQ-/);
    expect(['NEW', 'SUBMITTED']).toContain(body.data.status);
  });

  test('Assisted Call Concierge: Elderly / assisted flow submission', async ({ request }) => {
    const res = await request.post(`${E2E_CONFIG.BACKEND_URL}/enquiries/request-call`, {
      data: {
        customerName: 'Ramanaiah Garu',
        customerPhone: '+919848022338',
        district: 'Mahabubnagar',
        categorySlug: 'traditional-photography',
        notes: 'Please call in evening regarding venue and purohit booking.',
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.referenceNumber).toMatch(/^ENQ-/);
  });
});

