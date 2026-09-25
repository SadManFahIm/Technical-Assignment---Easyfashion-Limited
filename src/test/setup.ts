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

// Recharts' ResponsiveContainer observes its wrapper with ResizeObserver —
// jsdom has no layout engine, so provide a stub that reports a fixed size,
// letting charts mount and render their SVG in tests.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserverStub implements ResizeObserver {
    private cb: ResizeObserverCallback = () => {};

    constructor(cb: ResizeObserverCallback) {
      this.cb = cb;
    }

    observe = (target: Element) => {
      const contentRect = {
        width: 600, height: 300, top: 0, left: 0,
        bottom: 0, right: 0, x: 0, y: 0,
        toJSON: () => ({}),
      };
      this.cb(
        [{ target, contentRect } as unknown as ResizeObserverEntry],
        this as unknown as ResizeObserver,
      );
    };

    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver =
    ResizeObserverStub as unknown as typeof window.ResizeObserver;
}

// ── Console noise control (deliberate, narrowly scoped) ──────────────────
// AntD/rc-* call jsdom's unimplemented pseudo-element getComputedStyle and
// React logs act() warnings on every mount. Under jsdom these are cosmetic,
// but they flood vitest's worker→main RPC channel with thousands of large
// payloads on CI, killing the run *after* all tests pass with
// "Timeout calling onTaskUpdate" (vitest-dev/vitest#6511).
//
// Only these two known-cosmetic messages are dropped — every other error,
// and all real assertion/a11y failures, still surface normally.
const SILENCED_CONSOLE_ERRORS = [
  'Not implemented: window.getComputedStyle',
  'not wrapped in act',
];

const originalConsoleError = console.error.bind(console);
console.error = ((...args: unknown[]) => {
  const text = args
    .map((a) => (a instanceof Error ? a.message : typeof a === 'string' ? a : ''))
    .join(' ');
  if (SILENCED_CONSOLE_ERRORS.some((m) => text.includes(m))) return;
  originalConsoleError(...args);
}) as typeof console.error;
