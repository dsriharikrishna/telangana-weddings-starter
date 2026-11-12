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

  test('Admin OTP verification flow navigates to dashboard', async ({ page }) => {
    await page.goto(`${E2E_CONFIG.ADMIN_URL}/auth/verify-otp`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Two-Factor Authentication')).toBeVisible();
    const otpInput = page.locator('input[type="text"]');
    await expect(otpInput).toBeVisible();
    await otpInput.fill('123456');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('Admin Staff Registration Page renders with input fields', async ({ page }) => {
    await page.goto(`${E2E_CONFIG.ADMIN_URL}/auth/register`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Staff Registration')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="tel"]')).toBeVisible();
  });
});

