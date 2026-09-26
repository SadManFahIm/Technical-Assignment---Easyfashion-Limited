/**
 * pages.test.tsx
 * Integration-style unit tests for the three dashboard pages.
 * The root wrapper (default export of `_app`) is exercised with a wrapped
 * page component so the real provider stack (ThemeProvider → ConfigProvider
 * theme) runs; pages are also rendered directly to assert their distinctive
 * widget content. Document titles are asserted in the Playwright E2E suite
 * — next/head needs a real HeadManager that jsdom/RTL does not provide.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyApp from '@/pages/_app';
import DashboardPage from '@/pages/index';
import Dashboard2Page from '@/pages/dashboard2';
import Dashboard3Page from '@/pages/dashboard3';
import type { AppProps } from 'next/app';

type PageComponent = NonNullable<AppProps['Component']>;

// Wrap a page the way Next.js does: `Component` must be a React component
// that renders the page, not a function returning one.
const asPage = (Page: React.ComponentType): PageComponent =>
  function WrappedPage(props: Record<string, unknown>) {
    return <Page {...props} />;
  } as unknown as PageComponent;

const appProps = (Component: PageComponent) =>
  ({ Component, pageProps: {}, router: {} as AppProps['router'] }) as AppProps;

describe('Root wrapper (_app)', () => {
  it('renders a page through the real provider stack', () => {
    render(<MyApp {...appProps(asPage(Dashboard2Page))} />);
    // Layout chrome renders, so ThemeProvider + ConfigProvider are live
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Welcome back Natalia!')).toBeInTheDocument();
  }, 60_000);
});

describe('Dashboard 1 — Modern (pages/index)', () => {
  it('renders the full widget grid inside the layout', () => {
    render(<DashboardPage />);

    // Distinctive widgets of the Modern view
    expect(screen.getByText('Overview of Profit')).toBeInTheDocument(); // RevenueChart
    expect(screen.getByText('View full report')).toBeInTheDocument(); // RevenueChart CTA
    expect(screen.getByText('Super awesome, Vue coming soon!')).toBeInTheDocument(); // NoticeCard
    expect(screen.getAllByText('Web Designer').length).toBeGreaterThanOrEqual(1); // TopProjects rows
    expect(screen.getByText('Enter Text')).toBeInTheDocument(); // TopProjects filter
  }, 60_000);
});

describe('Dashboard 2 — Analytical (pages/dashboard2)', () => {
  it('renders welcome, line chart, performance table and activities', () => {
    render(<Dashboard2Page />);

    expect(screen.getByText('Welcome back Natalia!')).toBeInTheDocument();
    expect(screen.getByText('Product Performances')).toBeInTheDocument();
    expect(screen.getByText('How it performs')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: '#ML-3467' }).length).toBeGreaterThanOrEqual(1);
    // Line-chart legend labels (formatted by the Legend formatter)
    expect(screen.getByText('Modernize')).toBeInTheDocument();
    expect(screen.getByText('Spike Admin')).toBeInTheDocument();
  }, 60_000);
});

describe('Dashboard 3 — eCommerce (pages/dashboard3)', () => {
  it('renders the combined view with mini stats and revenue summary', () => {
    render(<Dashboard3Page />);

    expect(screen.getByText('Welcome back Natalia!')).toBeInTheDocument();
    // MiniStats + revenue summary card are unique to this route
    expect(screen.getByText('Expense')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('$500,458')).toBeInTheDocument();
  }, 60_000);
});
