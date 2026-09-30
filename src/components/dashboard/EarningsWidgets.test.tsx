/**
 * EarningsWidgets.test.tsx
 * Unit tests for the YearlyBreakup donut and MonthlyEarnings sparkline.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YearlyBreakup, MonthlyEarnings } from '@/components/dashboard/EarningsWidgets';

describe('YearlyBreakup', () => {
  it('renders the heading and center percentage', () => {
    render(<YearlyBreakup />);
    expect(screen.getByText('Yearly breakup')).toBeInTheDocument();
    expect(screen.getByText('68%')).toBeInTheDocument();
  });

  it('renders the total, growth and legend', () => {
    render(<YearlyBreakup />);
    expect(screen.getByText('$36,358')).toBeInTheDocument();
    expect(screen.getByText('+9%')).toBeInTheDocument();
    expect(screen.getByText('than last year')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('renders the donut chart SVG', () => {
    render(<YearlyBreakup />);
    expect(document.querySelector('.recharts-surface')).toBeInTheDocument();
    expect(document.querySelector('.recharts-pie')).toBeInTheDocument();
  });
});

describe('MonthlyEarnings', () => {
  it('renders the heading, value and growth', () => {
    render(<MonthlyEarnings />);
    expect(screen.getByText('Monthly earnings')).toBeInTheDocument();
    expect(screen.getByText('$6,820')).toBeInTheDocument();
    expect(screen.getByText('+9%')).toBeInTheDocument();
  });

  it('starts with the toggle switch checked', () => {
    render(<MonthlyEarnings />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveClass('ant-switch-checked');
  });

  it('renders the earnings sparkline with its gradient', () => {
    render(<MonthlyEarnings />);
    expect(document.querySelector('.recharts-area')).toBeInTheDocument();
    expect(document.querySelector('#earningsGrad')).toBeInTheDocument();
  });
});
