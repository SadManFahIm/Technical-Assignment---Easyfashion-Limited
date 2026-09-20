/**
 * src/test/setup.ts
 * Shared setup for every Vitest test file.
 * - jest-dom matchers for readable DOM assertions
 * - automatic RTL cleanup between tests
 * - matchMedia shim: some Ant Design components read it on mount
 */

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom keeps localStorage behind a real URL origin; some environments ship
// without one, so fall back to an in-memory polyfill before tests touch it.
if (typeof window !== 'undefined' && !window.localStorage) {
  const store = new Map<string, string>();
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      setItem: (key: string, value: string) => void store.set(key, String(value)),
      removeItem: (key: string) => void store.delete(key),
      clear: () => void store.clear(),
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      get length() {
        return store.size;
      },
    },
    configurable: true,
  });
}

afterEach(() => {
  cleanup();
});

// Ant Design's responsive helpers call window.matchMedia — jsdom doesn't
// implement it, so provide a minimal stub.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
