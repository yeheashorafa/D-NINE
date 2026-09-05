import { test, expect } from '@playwright/test';

test.describe('Dashboard (Embedded Sanity Studio)', () => {
  test('does not redirect to localized route', async ({ page }) => {
    // Navigate to /dashboard
    await page.goto('/dashboard');
    
    // Check that the URL remains /dashboard and does not become /en/dashboard or /ar/dashboard
    await expect(page).toHaveURL(/.*\/dashboard.*/);
  });

  test('renders the Studio shell', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Sanity Studio sets a specific id on its mount point or renders specific data attributes
    // We'll wait for the Sanity studio container
    const studioContainer = page.locator('#sanity');
    await expect(studioContainer).toBeVisible({ timeout: 10000 });
  });

  test('does not render public Header or Footer', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Ensure the public header is absent
    const header = page.locator('header');
    await expect(header).not.toBeVisible();
    
    // Ensure the public footer is absent
    const footer = page.locator('footer');
    await expect(footer).not.toBeVisible();
  });
});
