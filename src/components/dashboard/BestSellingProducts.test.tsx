/**
 * BestSellingProducts.test.tsx
 * Unit tests for the best selling products card with progress bars.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BestSellingProducts from '@/components/dashboard/BestSellingProducts';
import { bestSelling } from '@/data/mockData';

describe('BestSellingProducts', () => {
  it('renders the heading and subtitle', () => {
    render(<BestSellingProducts />);
    expect(screen.getByText('Best Selling Products')).toBeInTheDocument();
    expect(screen.getByText('Overview 2022')).toBeInTheDocument();
  });

  it('renders the product illustration', () => {
    render(<BestSellingProducts />);
    expect(screen.getByAltText('Product illustration')).toBeInTheDocument();
  });

  it('renders every product with name, price and progress percentage', () => {
    render(<BestSellingProducts />);
    for (const product of bestSelling) {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getAllByText(product.price).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(`${product.progress}%`)).toBeInTheDocument();
    }
  });

  it('renders one progress bar per product at the right percent', () => {
    render(<BestSellingProducts />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(bestSelling.length);
    bars.forEach((bar, i) => {
      expect(bar).toHaveAttribute('aria-valuenow', String(bestSelling[i].progress));
    });
  });
});
