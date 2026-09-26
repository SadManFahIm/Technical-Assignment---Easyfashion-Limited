/**
 * vitest.config.ts
 * Vitest configuration for unit/component tests.
 * - jsdom environment so Ant Design components mount like a browser
 * - '@' alias mirrors tsconfig paths
 * - setup file wires jest-dom matchers + cleanup + jsdom shims
 *
 * Why `npm run test:coverage` passes --dangerouslyIgnoreUnhandledErrors:
 * the page-level axe scans in src/test/accessibility.test.tsx block the worker
 * event loop for 60-85s, and vitest's worker->main onTaskUpdate RPC has a
 * hardcoded 60s birpc timeout that no config option can raise (vitest 3.x;
 * fixed upstream in v4.0.0-beta.4, vitest-dev/vitest#8297). Every test still
 * passes, but the expired timer surfaces as an unhandled error and flips the
 * exit code to 1 (vitest-dev/vitest#6511). v8 coverage is what pushes those
 * scans past the window — un-instrumented they run 43-55s. `npm test` stays
 * strict, so genuine unhandled errors still fail CI.
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
    // Ant Design's cssinjs makes first renders of complex components slow
    // under jsdom; give heavy suites room instead of flaking.
    testTimeout: 20_000,
    hookTimeout: 20_000,
    // Stability: one worker, one file at a time — keeps the run predictable
    // on CI and keeps memory flat while the jsdom suites mount.
    pool: 'forks',
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      // Instrument shipped dashboard code; tests themselves are excluded
      include: ['src/components/**', 'src/context/**', 'src/data/**', 'src/pages/**'],
      exclude: ['src/**/*.test.*', 'src/test/**'],
      // Ratchet: floors that fail CI when coverage regresses below them.
      // Raise them as more tests land — never lower them. Statements and
      // functions sit exactly on the observed floor; branches keep ~1.5%
      // headroom because v8's branch remapping wobbles between runs.
      thresholds: {
        // Global floor across all instrumented sources
        statements: 97,
        branches: 90,
        functions: 88,
        lines: 97,
        'src/data/**': {
          statements: 100, branches: 100, functions: 100, lines: 100,
        },
        'src/context/**': {
          statements: 100, branches: 75, functions: 75, lines: 100,
        },
        'src/components/dashboard/**': {
          statements: 96, branches: 92, functions: 84, lines: 96,
        },
        'src/components/layout/**': {
          statements: 100, branches: 90, functions: 100, lines: 100,
        },
        'src/pages/**': {
          statements: 94, branches: 84, functions: 100, lines: 94,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
