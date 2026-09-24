/**
 * DailyActivities.test.tsx
 * Unit tests for the daily activities timeline feed.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DailyActivities from '@/components/dashboard/DailyActivities';
import { dailyActivities } from '@/data/mockData';

describe('DailyActivities', () => {
  it('renders the card heading', () => {
    render(<DailyActivities />);
    expect(screen.getByText('Daily activities')).toBeInTheDocument();
  });

  it('renders one timeline item per activity with its time', () => {
    render(<DailyActivities />);
    expect(screen.getAllByText('09:46')).toHaveLength(dailyActivities.length);
  });

  it('renders plain activity texts', () => {
    render(<DailyActivities />);
    // Same payment text appears on two mock rows
    expect(
      screen.getAllByText('Payment received from John Doe of $385.90')
    ).toHaveLength(2);
    expect(
      screen.getByText('Payment was made of $64.95 to Michael Anderson')
    ).toBeInTheDocument();
    expect(screen.getByText('Project meeting')).toBeInTheDocument();
  }, 20_000);

  it('turns #tag mentions into links', () => {
    render(<DailyActivities />);
    const links = screen.getAllByRole('link', { name: '#ML-3467' });
    // Two sale entries carry the same tag
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute('href', '#');
    }
  });
});
