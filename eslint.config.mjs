/**
 * eslint.config.mjs
 * ESLint 9 flat config.
 * - FlatCompat bridges eslint-config-next (still shipped in eslintrc format)
 * - Mirrors the previous `.eslintrc.json` → extends "next/core-web-vitals"
 * - `next lint` is removed in Next 16, so lint now runs via the ESLint CLI
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
