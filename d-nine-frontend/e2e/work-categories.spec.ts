import { test, expect } from '@playwright/test';

test.describe('Work Page Categories & Grid (Section A Requirements)', () => {
  test('renders exactly 8 category buttons on /ar/work and no "all categories" button', async ({ page }) => {
    await page.goto('/ar/work');

    // Category filter section buttons
    // The WorkFilter component renders filter buttons
    const filterButtons = page.locator('button[data-category-slug]');
    
    // We expect exactly 8 buttons
    await expect(filterButtons).toHaveCount(8);

    // Verify there is no button for "all" or "all categories"
    const allButton = page.locator('button[data-category-slug="all"]');
    await expect(allButton).toHaveCount(0);
  });

  test('renders exactly 8 category buttons on /en/work and no "all categories" button', async ({ page }) => {
    await page.goto('/en/work');

    const filterButtons = page.locator('button[data-category-slug]');
    await expect(filterButtons).toHaveCount(8);

    const allButton = page.locator('button[data-category-slug="all"]');
    await expect(allButton).toHaveCount(0);
  });
});
