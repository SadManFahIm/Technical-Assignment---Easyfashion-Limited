/**
 * StatCards.test.tsx
 * Unit tests for the six KPI stat cards.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCards from '@/components/dashboard/StatCards';
import { statCards } from '@/data/mockData';

describe('StatCards', () => {
  it('renders one card per mock data entry', () => {
    render(<StatCards />);
    for (const card of statCards) {
      expect(screen.getByText(card.label)).toBeInTheDocument();
      expect(screen.getByText(card.value)).toBeInTheDocument();
    }
  });

  it('renders exactly six cards', () => {
    render(<StatCards />);
    expect(statCards).toHaveLength(6);
    // Each value appears exactly once
    for (const card of statCards) {
      expect(screen.getAllByText(card.value)).toHaveLength(1);
    }
  });
});
