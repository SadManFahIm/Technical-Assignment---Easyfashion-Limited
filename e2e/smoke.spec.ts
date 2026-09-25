/**
 * e2e/smoke.spec.ts
 * End-to-end smoke tests: every dashboard route must render its shell
 * (sidebar + header + content) with hydrated, route-specific widgets, and
 * the dark-mode toggle must persist across reloads.
 *
 * A11y in E2E: axe runs against the real layout, so color-contrast here is
 * *reported* to the console but not asserted — the contrast gate lives in
 * the unit accessibility suite; here we fail only on other serious/critical
 * structural violations.
 */

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const dashboards = [
  { path: '/', titlePart: 'Modern Dashboard', marker: 'Best Selling Products' },
  { path: '/dashboard2', titlePart: 'Analytical Dashboard', marker: 'Welcome back Natalia!' },
  { path: '/dashboard3', titlePart: 'eCommerce Dashboard', marker: '$500,458' },
];

test.describe('Dashboard smoke', () => {
  for (const { path, titlePart, marker } of dashboards) {
    test(`route ${path} renders shell, widgets and hydrates`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(titlePart));

      // Layout chrome: header toggle + sidebar brand logo
      await expect(page.getByRole('button', { name: 'Toggle sidebar' })).toBeVisible();
      await expect(page.getByAltText('Easy Fashion Ltd.')).toBeVisible();

      // Route-specific widget content (React has hydrated it into view)
      await expect(page.getByText(marker)).toBeVisible();

      // The app is interactive: AntD menu rendered with the selected item
      await expect(page.locator('.ant-menu-item-selected')).toHaveCount(1);
    });

    test(`route ${path} has no serious structural a11y violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();

      // Same policy as the unit a11y suite: serious + critical gate
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );

      // Contrast is computed for real in a browser; report but don't gate
      const contrast = serious.filter((v) => v.id === 'color-contrast');
      if (contrast.length > 0) {
        console.warn(`[a11y:${path}] color-contrast findings (reported):`, JSON.stringify(contrast, null, 2));
      }

      const blocking = serious.filter((v) => v.id !== 'color-contrast');
      expect(blocking).toEqual([]);
    });
  }

  test('dark mode toggles and persists across reload', async ({ page }) => {
    await page.goto('/');

    // Click the sun icon inside the toggle wrapper (one toggleTheme per click)
    await page.locator('.anticon-sun').click();
    await expect(page.locator('body')).toHaveClass(/dark-mode/);

    // Preference survives a full reload (localStorage + ThemeContext)
    await page.reload();
    await expect(page.locator('body')).toHaveClass(/dark-mode/);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

    // Toggle back to light
    await page.locator('.anticon-sun').click();
    await expect(page.locator('body')).not.toHaveClass(/dark-mode/);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('light');
  });
});
