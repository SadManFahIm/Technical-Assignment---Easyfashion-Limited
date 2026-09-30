/**
 * e2e/smoke.spec.ts
 * End-to-end smoke tests: every dashboard route must render its shell
 * (sidebar + header + content) with hydrated, route-specific widgets, and
 * the dark-mode toggle must persist across reloads.
 *
 * A11y policy in E2E: axe runs against the real, hydrated layout — the only
 * place where WCAG 1.4.3 colour contrast can actually be computed, because
 * jsdom has no layout engine. Both gates block the build here:
 *
 *   1. structural  — every `serious`/`critical` violation fails the run;
 *   2. contrast    — every failing foreground/background pair must either be
 *                    fixed or be declared in CONTRAST_DEBT below. An
 *                    undeclared pair fails the run, so new contrast bugs
 *                    cannot be introduced.
 *
 * The unit suite (src/test/accessibility.test.tsx) deliberately disables the
 * `color-contrast` rule rather than pretending to cover it here.
 *
 * Scope: contrast is measured in the light theme, which is the design
 * default. Dark-mode contrast is not gated yet.
 */

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { NodeResult } from 'axe-core';

/**
 * Wait after the widget markers appear before scanning. Charts and animated
 * widgets mount client-side; scanning straight after `goto()` measures a
 * half-rendered DOM and produces a different result set on every run. The
 * numbers in CONTRAST_DEBT were captured with exactly this wait.
 */
const SETTLE_MS = 500;

const dashboards = [
  { path: '/', titlePart: 'Modern Dashboard', marker: 'Best Selling Products' },
  { path: '/dashboard2', titlePart: 'Analytical Dashboard', marker: 'Welcome back Natalia!' },
  { path: '/dashboard3', titlePart: 'eCommerce Dashboard', marker: '$500,458' },
];

/**
 * Known WCAG 1.4.3 debt: text/background pairs from the Figma palette that
 * fall below 4.5:1. Measured in real Chromium (light theme) across all three
 * routes — 132 nodes / 16 pairs in total.
 *
 * These are design-specified colours (the palette is fixed by the Figma
 * deliverable), so the UI stays as designed and the debt is declared here
 * instead of being silently ignored or hidden in a jsdom run that cannot
 * compute contrast at all. `nodes` is the measured baseline, printed on every
 * run so growth is visible in the CI log.
 *
 * To clear an entry: darken the foreground to >= 4.5:1 within the same hue
 * family (for example #7c8fac -> #61789a) and delete the row.
 */
const CONTRAST_DEBT: ReadonlyArray<{ fg: string; bg: string; nodes: number; reason: string }> = [
  {
    fg: '#7c8fac',
    bg: '#ffffff',
    nodes: 79,
    reason: 'design muted text (colorTextSecondary): widget subtitles, user role, menu captions',
  },
  {
    fg: '#13deb9',
    bg: '#ffffff',
    nodes: 15,
    reason: 'design mint accent (colorSuccess) used as stat growth text on the home dashboard',
  },
  {
    fg: '#ffffff',
    bg: '#5d87ff',
    nodes: 11,
    reason: 'brand blue fill with white text: selected sidebar item, Get Started and primary buttons',
  },
  {
    fg: '#5d87ff',
    bg: '#ffffff',
    nodes: 9,
    reason: 'brand blue as text: primary figures, active tab label, timeline links',
  },
  {
    fg: '#f57f17',
    bg: '#fff8e1',
    nodes: 3,
    reason: 'High-priority tag text on its AntD warning tint (ProductPerformance, TopProjects)',
  },
  {
    fg: '#13deb9',
    bg: '#e6fcf5',
    nodes: 2,
    reason: 'mint growth chip text on its mint tint (DashboardLayout stat chips)',
  },
  {
    fg: '#5d87ff',
    bg: '#ecf2ff',
    nodes: 2,
    reason: 'brand blue chip text on its blue tint (DashboardLayout stat chips)',
  },
  {
    fg: '#fa896b',
    bg: '#fef0eb',
    nodes: 2,
    reason: 'coral accent chip text on its coral tint (colorError palette)',
  },
  {
    fg: '#fa896b',
    bg: '#ffffff',
    nodes: 2,
    reason: 'coral accent (colorError) used as a dashboard figure',
  },
  {
    fg: '#f59e0b',
    bg: '#fff8ed',
    nodes: 1,
    reason: 'amber chip text on its tint (mockData accent palette)',
  },
  {
    fg: '#10b981',
    bg: '#f0fdf4',
    nodes: 1,
    reason: 'emerald chip text on its tint (mockData accent palette)',
  },
  {
    fg: '#10b981',
    bg: '#ffffff',
    nodes: 1,
    reason: 'emerald accent used as a dashboard figure (mockData accent palette)',
  },
  {
    fg: '#3b82f6',
    bg: '#edf3ff',
    nodes: 1,
    reason: 'blue chip text on its tint (mockData accent palette)',
  },
  {
    fg: '#06b6d4',
    bg: '#f0fdfa',
    nodes: 1,
    reason: 'cyan chip text on its tint (mockData accent palette)',
  },
  {
    fg: '#ef4444',
    bg: '#fff1f0',
    nodes: 1,
    reason: 'red chip text on its tint (mockData accent palette)',
  },
  {
    fg: '#7c8fac',
    bg: '#f5f6fa',
    nodes: 1,
    reason: 'avatar fallback initials (design muted text) on the layout background',
  },
];

const DECLARED_PAIRS = new Set(CONTRAST_DEBT.map((entry) => `${entry.fg} on ${entry.bg}`));

/**
 * recharts 2.15.4 hardcodes `role="img"` on every pie sector: Sector renders
 * its <path> as `React.createElement('path', { ...props, d, role: 'img' })`,
 * so the hardcoded role always wins and cannot be overridden from the app.
 * Those wedges are decorative duplicates of the legend and of the figures that
 * are already printed as text, and they cannot be given an accessible name
 * without reimplementing the arc geometry, which would break the design.
 *
 * Only the sectors are excused — every other `svg-img-alt` node still fails.
 */
function isRechartsSector(node: NodeResult): boolean {
  const selector = node.target.join(' ');
  return selector.includes('recharts-sector') || node.html.includes('recharts-sector');
}

type ContrastCheckData = {
  fgColor?: string;
  bgColor?: string;
  contrastRatio?: number;
  expectedContrastRatio?: string;
};

/**
 * Pull the failing colour pair out of an axe node. axe reports the computed
 * colours on the check result (`node.any[0].data`); if a future axe release
 * changes that, the node is reported as unreadable and the run fails, which
 * is the safe direction.
 */
function readContrastPair(node: NodeResult): {
  pair: string;
  ratio: string;
  expected: string;
  target: string;
} {
  const target = node.target.join(' ');
  const data = node.any?.[0]?.data as ContrastCheckData | undefined;
  if (!data?.fgColor || !data?.bgColor) {
    throw new Error(
      `Could not read contrast data from axe node (${target}). ` +
        `The contrast gate must not silently pass — check the axe-core upgrade notes.`
    );
  }
  return {
    pair: `${data.fgColor} on ${data.bgColor}`,
    ratio: String(data.contrastRatio),
    expected: String(data.expectedContrastRatio),
    target,
  };
}

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

    test(`route ${path} has no serious a11y violations and no undeclared contrast debt`, async ({
      page,
    }) => {
      await page.goto(path);
      // Scan the hydrated DOM, not the server-rendered shell.
      await expect(page.getByText(marker)).toBeVisible();
      await expect(page.locator('.ant-menu-item-selected')).toHaveCount(1);
      await page.waitForTimeout(SETTLE_MS);

      const results = await new AxeBuilder({ page }).analyze();
      const isBlockingImpact = (impact?: string | null) =>
        impact === 'serious' || impact === 'critical';

      // 1. structural gate (color-contrast has its own gate below)
      const structural = results.violations.flatMap((violation) => {
        if (violation.id === 'color-contrast' || !isBlockingImpact(violation.impact)) return [];
        const nodes =
          violation.id === 'svg-img-alt'
            ? violation.nodes.filter((node) => !isRechartsSector(node))
            : violation.nodes;
        if (nodes.length === 0) return [];
        return [
          `${violation.id} (${violation.impact}): ${violation.help} -> ` +
            nodes
              .slice(0, 3)
              .map((node) => node.target.join(' '))
              .join(' | '),
        ];
      });
      expect(
        structural,
        `Serious/critical structural a11y violations on ${path}`
      ).toEqual([]);

      // 2. contrast gate
      const contrast = results.violations.find((violation) => violation.id === 'color-contrast');
      const found = new Map<string, number>();
      const undeclared: string[] = [];

      for (const node of contrast?.nodes ?? []) {
        const { pair, ratio, expected, target } = readContrastPair(node);
        found.set(pair, (found.get(pair) ?? 0) + 1);
        if (!DECLARED_PAIRS.has(pair)) {
          undeclared.push(`${pair} = ${ratio}, needs ${expected} -> ${target}`);
        }
      }

      const totalNodes = [...found.values()].reduce((sum, count) => sum + count, 0);
      const declaredPairs = [...found.keys()].filter((pair) => DECLARED_PAIRS.has(pair));
      console.log(
        `[a11y:${path}] color-contrast: ${totalNodes} nodes across ${found.size} pairs ` +
          `(${[...found.entries()].map(([pair, count]) => `${pair} x${count}`).join(', ')}); ` +
          `declared ${declaredPairs.length}/${found.size} pairs, undeclared ${undeclared.length}`
      );

      expect(
        undeclared,
        `Undeclared WCAG 1.4.3 contrast violations on ${path}. Fix the colour, or — if it is ` +
          `part of the Figma palette — add it to CONTRAST_DEBT with a reason and a measured count.`
      ).toEqual([]);
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
