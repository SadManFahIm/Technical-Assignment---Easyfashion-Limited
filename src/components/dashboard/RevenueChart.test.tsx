/**
 * RevenueChart.test.tsx
 * Unit tests for the Revenue updates bar chart card.
 * The Recharts bar chart renders into SVG in jsdom; we assert on the
 * accessible/structural pieces (headings, axis ticks, summary figures)
 * rather than on canvas-measured bar geometry.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { revenueData } from '@/data/mockData';

describe('RevenueChart', () => {
  it('renders the card heading and subtitle', () => {
    render(<RevenueChart />);
    expect(screen.getByText('Revenue updates')).toBeInTheDocument();
    expect(screen.getByText('Overview of Profit')).toBeInTheDocument();
  });

  it('has a month selector defaulting to March 2022', () => {
    render(<RevenueChart />);
    // Ant Design Select renders its selected label inside a form control
    const combo = screen.getByRole('combobox');
    expect(combo).toBeInTheDocument();

    // The selected option label is shown next to the input
    const selection = combo
      .closest('.ant-select')
      ?.querySelector('.ant-select-selection-item');
    expect(selection).toHaveTextContent('March 2022');
  });

  it('renders an SVG chart with an X tick per revenue data point', () => {
    render(<RevenueChart />);
    // The bar chart mounts into an SVG surface
    expect(document.querySelector('.recharts-surface')).toBeInTheDocument();
    // Each mock data point contributes one visible X axis tick label
    for (const row of revenueData) {
      expect(screen.getByText(row.date)).toBeInTheDocument();
    }
  });

  it('renders the summary figures and legend swatches', () => {
    render(<RevenueChart />);
    expect(screen.getByText('Total Earnings')).toBeInTheDocument();
    expect(screen.getByText('$63,489.50')).toBeInTheDocument();
    expect(screen.getByText(/Earnings this month/i)).toBeInTheDocument();
    expect(screen.getByText('$48,820')).toBeInTheDocument();
    expect(screen.getByText(/Expense this month/i)).toBeInTheDocument();
    expect(screen.getByText('$26,498')).toBeInTheDocument();
  });

  it('has a "View full report" button', () => {
    render(<RevenueChart />);
    expect(
      screen.getByRole('button', { name: /view full report/i })
    ).toBeInTheDocument();
  });
});
