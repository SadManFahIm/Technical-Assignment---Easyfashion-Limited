/**
 * ProductPerformance.test.tsx
 * Unit tests for the product performance table with tabs and sparklines.
 */

import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import { productPerformances } from '@/data/mockData';

describe('ProductPerformance', () => {
  it('renders the card heading, subtitle and month select', () => {
    render(<ProductPerformance />);
    expect(screen.getByText('Product Performances')).toBeInTheDocument();
    expect(screen.getByText('How it performs')).toBeInTheDocument();

    const combo = screen.getByRole('combobox');
    const selection = combo
      .closest('.ant-select')
      ?.querySelector('.ant-select-selection-item');
    expect(selection).toHaveTextContent('March 2022');
  });

  it('renders the five category tabs with App active', () => {
    render(<ProductPerformance />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(5);
    expect(tabs.map((t) => t.textContent)).toEqual([
      'App', 'Mobile', 'SaaS', 'Products', 'Others',
    ]);
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('App');
  });

  it('renders the table column headers', () => {
    render(<ProductPerformance />);
    for (const header of ['Assigned', 'Progress', 'Priority', 'Budget', 'Chart']) {
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument();
    }
  });

  it('renders one row per product with owner, progress and budget', () => {
    render(<ProductPerformance />);
    const table = screen.getByRole('table');
    for (const product of productPerformances) {
      const row = screen.getByText(product.name).closest('tr');
      expect(row).not.toBeNull();
      expect(within(row as HTMLElement).getByText(product.owner)).toBeInTheDocument();
      expect(within(row as HTMLElement).getByText(`${product.progress}%`)).toBeInTheDocument();
      expect(within(row as HTMLElement).getByText(product.budget)).toBeInTheDocument();
    }
  });

  it('draws a sparkline per row, green for positive trends', () => {
    render(<ProductPerformance />);
    const sparklines = screen.getAllByRole('img', { name: /trend sparkline/i });
    expect(sparklines).toHaveLength(productPerformances.length);

    const aboveHalf = productPerformances.filter((p) => p.progress > 50).length;
    const green = sparklines.filter((s) => s.getAttribute('aria-label') === 'trend sparkline (up)');
    expect(green).toHaveLength(aboveHalf);
  });
});
