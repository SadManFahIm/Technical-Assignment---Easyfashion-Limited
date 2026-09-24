/**
 * WeeklyStats.test.tsx
 * Unit tests for the weekly stats sparkline card.
 * The AreaChart draws into SVG; we assert the accessible chrome
 * (heading, axis group, seller rows) rather than path geometry.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeeklyStats from '@/components/dashboard/WeeklyStats';

describe('WeeklyStats', () => {
  it('renders the card heading and subtitle', () => {
    render(<WeeklyStats />);
    expect(screen.getByText('Weekly stats')).toBeInTheDocument();
    expect(screen.getByText('Average sales')).toBeInTheDocument();
  });

  it('renders the sales sparkline chart', () => {
    render(<WeeklyStats />);
    // The area chart mounts into an SVG surface with its gradient fill
    expect(document.querySelector('.recharts-surface')).toBeInTheDocument();
    expect(document.querySelector('.recharts-area')).toBeInTheDocument();
    expect(document.querySelector('#wkGrad')).toBeInTheDocument();
  });

  it('renders all three seller rows with their counts', () => {
    render(<WeeklyStats />);
    expect(screen.getByText('Top sales')).toBeInTheDocument();
    expect(screen.getByText('Johnathan Doe')).toBeInTheDocument();
    expect(screen.getByText('Best seller')).toBeInTheDocument();
    expect(screen.getByText('MaterialPro Admin')).toBeInTheDocument();
    expect(screen.getByText('Most commented')).toBeInTheDocument();
    expect(screen.getByText('Ample Admin')).toBeInTheDocument();
    expect(screen.getAllByText('+68')).toHaveLength(3);
  });
});
