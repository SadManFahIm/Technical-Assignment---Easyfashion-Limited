/**
 * scripts/write-badges.mjs
 * Reads Vitest's coverage-summary.json (and the JSON reporter output when
 * present) and emits shields.io endpoint badge JSON files for the README.
 * Run from the repo root after `npm run test:coverage`.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const summary = JSON.parse(
  readFileSync('./coverage/coverage-summary.json', 'utf8')
);

const total = summary.total ?? {
  statements: { pct: 0 },
  branches: { pct: 0 },
  functions: { pct: 0 },
  lines: { pct: 0 },
};

// Test counts come from the JSON reporter (--outputFile.json) when available.
let testMessage = 'passing';
let testColor = 'success';
const resultsPath = './coverage/test-results.json';
if (existsSync(resultsPath)) {
  const results = JSON.parse(readFileSync(resultsPath, 'utf8'));
  const passed = results.numPassedTests ?? 0;
  const failed = results.numFailedTests ?? 0;
  testMessage = failed === 0 ? `${passed} passing` : `${passed} passing · ${failed} failing`;
  testColor = failed === 0 ? 'success' : 'critical';
}

// shields.io endpoint schema: {"schemaVersion":1,"label":"...","message":"...","color":"..."}
const coverage = Math.round(total.statements.pct);
const coverageColor =
  coverage >= 80 ? 'brightgreen' : coverage >= 50 ? 'yellow' : 'orange';

const badges = {
  'coverage/tests.json': {
    schemaVersion: 1,
    label: 'tests',
    message: testMessage,
    color: testColor,
  },
  'coverage/coverage.json': {
    schemaVersion: 1,
    label: 'coverage',
    message: `${coverage}%`,
    color: coverageColor,
  },
};

for (const [file, badge] of Object.entries(badges)) {
  writeFileSync(file, `${JSON.stringify(badge)}\n`);
  console.log(`wrote ${file}: ${badge.message}`);
}

console.log(
  `stmts ${total.statements.pct}% · branches ${total.branches.pct}% · funcs ${total.functions.pct}% · lines ${total.lines.pct}%`
);
