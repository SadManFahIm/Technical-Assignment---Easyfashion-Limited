/**
 * playwright.config.ts
 * Playwright configuration for the E2E smoke suite.
 * - Local runs start the dev server on port 3100 (never collides with a
 *   dev server the user may already have on 3000)
 * - CI runs against the production build served by `next start`
 * - Traces are kept for failing tests so flaky CI runs can be debugged
 */

import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 20_000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: process.env.CI
          ? 'npm run start -- -p 3100'
          : 'npm run dev -- -p 3100',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
