/**
 * WelcomeCard.test.tsx
 * Unit tests for the welcome hero banner.
 * Verifies the greeting, KPI figures, labels, and the illustration.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WelcomeCard from '@/components/dashboard/WelcomeCard';

describe('WelcomeCard', () => {
  it('greets the user', () => {
    render(<WelcomeCard />);
    expect(screen.getByText('Welcome back Natalia!')).toBeInTheDocument();
  });

  it('renders both KPI figures with their labels', () => {
    render(<WelcomeCard />);
    expect(screen.getByText('$2,340')).toBeInTheDocument();
    expect(screen.getByText("Today's Sales")).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
    expect(screen.getByText('Overall Performance')).toBeInTheDocument();
  });

  it('shows two trend arrows (sales + performance both up)', () => {
    render(<WelcomeCard />);
    // ArrowUpOutlined renders twice with aria-hidden; count via the icon class
    const arrows = document.querySelectorAll('.anticon-arrow-up');
    expect(arrows).toHaveLength(2);
  });

  it('renders the welcome illustration image', () => {
    render(<WelcomeCard />);
    const img = screen.getByAltText('Welcome illustration');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain('welcome-illustration.png');
  });
});
