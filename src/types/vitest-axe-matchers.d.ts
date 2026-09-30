/**
 * src/types/vitest-axe-matchers.d.ts
 * Module augmentation exposing jest-axe's `toHaveNoViolations` matcher on
 * Vitest's `Assertion` interface. This file is intentionally a module (it
 * has top-level imports) — module augmentation only applies from modules.
 */

import type { Assertion, AsymmetricMatchersContaining } from 'vitest';
import type { AxeResults } from 'axe-core';

interface ToHaveNoViolationsMatcher {
  toHaveNoViolations(): AxeResults;
}

declare module 'vitest' {
  interface Assertion<T = any> extends ToHaveNoViolationsMatcher {}
  interface AsymmetricMatchersContaining extends ToHaveNoViolationsMatcher {}
}
