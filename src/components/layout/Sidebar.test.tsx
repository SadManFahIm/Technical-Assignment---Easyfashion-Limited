/**
 * Sidebar.test.tsx
 * Unit tests for the left navigation sidebar: logo, profile card,
 * menu structure, and the expanded/collapsed variants.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/context/ThemeContext';

const renderSidebar = (collapsed = false) =>
  render(
    <ThemeProvider>
      <Sidebar collapsed={collapsed} />
    </ThemeProvider>
  );

describe('Sidebar', () => {
  it('renders the brand logo', () => {
    renderSidebar();
    expect(screen.getByAltText('Easy Fashion Ltd.')).toBeInTheDocument();
  });

  it('shows the user profile card when expanded', () => {
    renderSidebar(false);
    expect(screen.getByText('Mathew Anderson')).toBeInTheDocument();
    expect(screen.getByText('Marketing Director')).toBeInTheDocument();
  });

  it('hides the profile card and banner when collapsed', () => {
    renderSidebar(true);
    expect(screen.queryByText('Mathew Anderson')).not.toBeInTheDocument();
    expect(screen.queryByText('Unlimited Access')).not.toBeInTheDocument();
  });

  it('renders the navigation groups and items', () => {
    renderSidebar();
    for (const label of ['DASHBOARDS', 'APPLICATIONS', 'OTHERS']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText('Modern')).toBeInTheDocument();
    expect(screen.getByText('eCommerce')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });

  it('marks "Modern" as the selected item', () => {
    renderSidebar();
    const selected = document.querySelector('.ant-menu-item-selected');
    expect(selected).toBeInTheDocument();
    expect(selected).toHaveTextContent('Modern');
  });

  it('opens the Users submenu by default', () => {
    renderSidebar();
    expect(screen.getByText('Social Profile')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
  });

  it('renders the upgrade banner with a Signup button when expanded', () => {
    renderSidebar(false);
    expect(screen.getByText('Unlimited Access')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
  });
});
