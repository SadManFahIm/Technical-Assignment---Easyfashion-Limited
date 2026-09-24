/**
 * RecentTransactions.test.tsx
 * Unit tests for the transaction list card.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { transactions } from '@/data/mockData';

describe('RecentTransactions', () => {
  it('renders the card heading and subtitle', () => {
    render(<RecentTransactions />);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('Income vs Expense')).toBeInTheDocument();
  });

  it('renders every transaction name, description and amount', () => {
    render(<RecentTransactions />);
    for (const tx of transactions) {
      expect(screen.getByText(tx.name)).toBeInTheDocument();
      // Same description/amount can appear on multiple rows — assert at least one
      expect(screen.getAllByText(tx.desc).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(tx.amount).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('has a "View all transactions" button', () => {
    render(<RecentTransactions />);
    expect(
      screen.getByRole('button', { name: /view all transactions/i })
    ).toBeInTheDocument();
  });
});
