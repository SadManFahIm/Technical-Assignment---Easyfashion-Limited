/**
 * EmployeeSalary.test.tsx
 * Unit tests for the monthly salary bar chart and the customer stat cards.
 */

import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { EmployeeSalary, CustomerStats } from '@/components/dashboard/EmployeeSalary';
import { salaryData } from '@/data/mockData';

describe('EmployeeSalary', () => {
  it('renders the heading and subtitle', () => {
    render(<EmployeeSalary />);
    expect(screen.getByText('Employee salary')).toBeInTheDocument();
    expect(screen.getByText('Every month')).toBeInTheDocument();
  });

  it('renders one X axis tick per salary month', () => {
    render(<EmployeeSalary />);
    for (const row of salaryData) {
      expect(screen.getByText(row.month)).toBeInTheDocument();
    }
  });

  it('highlights only the highest month in the primary color', async () => {
    render(<EmployeeSalary />);
    const max = Math.max(...salaryData.map((d) => d.value));
    // Bars are drawn by Recharts' animation loop — wait for the paths
    await waitFor(() => {
      const paths = document.querySelectorAll(
        '.recharts-bar-rectangle path[fill]'
      );
      expect(paths.length).toBe(salaryData.length);
    });
    const primaryBars = document.querySelectorAll(
      '.recharts-bar-rectangle path[fill="#5d87ff"]'
    );
    const mutedBars = document.querySelectorAll(
      '.recharts-bar-rectangle path[fill="#e8eef7"]'
    );
    expect(primaryBars).toHaveLength(1);
    expect(mutedBars).toHaveLength(salaryData.length - 1);
    // The highlighted month is the actual maximum
    expect(salaryData.find((d) => d.value === max)?.month).toBe('07 Jul');
  });

  it('renders the summary stats row', () => {
    render(<EmployeeSalary />);
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('$36,358')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('$5,296')).toBeInTheDocument();
  });
});

describe('CustomerStats', () => {
  it('renders both mini stat cards', () => {
    render(<CustomerStats />);
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('36,358')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('78,298')).toBeInTheDocument();
    // Both cards show the same growth figure
    expect(screen.getAllByText('+9%')).toHaveLength(2);
  });

  it('renders a sparkline per card with distinct gradients', () => {
    render(<CustomerStats />);
    expect(document.querySelector('#cg-Customers')).toBeInTheDocument();
    expect(document.querySelector('#cg-Projects')).toBeInTheDocument();
  });
});
