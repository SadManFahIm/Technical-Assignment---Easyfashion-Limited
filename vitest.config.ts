/**
 * vitest.config.ts
 * Vitest configuration for unit/component tests.
 * - jsdom environment so Ant Design components mount like a browser
 * - '@' alias mirrors tsconfig paths
 * - setup file wires jest-dom matchers + cleanup + jsdom shims
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // jsdom hides localStorage on opaque origins — give the document a real one
    environmentOptions: { jsdom: { url: 'http://localhost:3000/' } },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      // Instrument shipped dashboard code; tests themselves are excluded
      include: ['src/components/**', 'src/context/**', 'src/data/**', 'src/pages/**'],
      exclude: ['src/**/*.test.*', 'src/test/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
