import { test, expect } from '../shared/fixtures/auth.fixture';
import { E2E_CONFIG } from '../shared/support/constants';

test.describe('WEB UI & FLOWS: Customer Web Portal', () => {
  test('Customer Web Home Page loads with hero and search elements', async ({ page }) => {
    const response = await page.goto(E2E_CONFIG.WEB_URL, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Telangana Wedding/i);
    await expect(page.locator('text=Telangana Weddings')).toBeVisible();
  });

  test('Public Service Category route navigates cleanly', async ({ page }) => {
    await page.goto(`${E2E_CONFIG.WEB_URL}/categories/traditional-photography`);
    await expect(page).toHaveURL(/.*categories\/traditional-photography/);
  });

  test('Public Locations listing page renders', async ({ page }) => {
    await page.goto(`${E2E_CONFIG.WEB_URL}/locations`);
    await expect(page).toHaveURL(/.*locations/);
  });

  test('Web Login page displays sample mock login options', async ({ page }) => {
    await page.goto(`${E2E_CONFIG.WEB_URL}/auth/login`);
    await expect(page.locator('text=Sign In')).toBeVisible();
    await expect(page.locator('button:has-text("K. Somanna")')).toBeVisible();
  });
});

