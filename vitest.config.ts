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
    // Ant Design's cssinjs makes first renders of complex components slow
    // under jsdom; give heavy suites room instead of flaking.
    testTimeout: 20_000,
    hookTimeout: 20_000,
    // Stability: vitest's worker_threads RPC times out under sustained CPU
    // load ("Timeout calling onTaskUpdate", vitest-dev/vitest#6511) and
    // fails the run as an unhandled error even when every test passes.
    // The `forks` pool + no file parallelism sidesteps the flaky thread RPC
    // entirely — slightly slower, fully deterministic.
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
