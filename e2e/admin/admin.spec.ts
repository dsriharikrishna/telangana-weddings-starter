import { test, expect } from '../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../shared/support/constants';

test.describe('ADMIN UI & FLOWS: Admin Backoffice Operations Portal', () => {
  test('Admin Login Page renders with credentials form and presets', async ({ page }) => {
    const response = await page.goto(`${E2E_CONFIG.ADMIN_URL}/auth/login`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator('text=Telangana Weddings Admin')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});

