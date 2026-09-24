/**
 * DashboardLayout.test.tsx
 * Unit tests for the layout wrapper: it composes Sidebar + TopHeader,
 * renders page children, and toggles the sidebar collapse.
 */

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ThemeProvider } from '@/context/ThemeContext';

const renderLayout = () =>
  render(
    <ThemeProvider>
      <DashboardLayout>
        <div>page content marker</div>
      </DashboardLayout>
    </ThemeProvider>
  );

describe('DashboardLayout', () => {
  it('renders the sidebar, header and page children together', () => {
    renderLayout();
    expect(screen.getByText('page content marker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Mathew Anderson')).toBeInTheDocument();
    expect(document.querySelector('.ant-layout-content')).toBeInTheDocument();
  });

  it('collapses the sidebar when the header toggle is clicked', async () => {
    renderLayout();
    expect(screen.getByText('Mathew Anderson')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));

    // Collapsed: profile card and upgrade banner disappear
    expect(screen.queryByText('Mathew Anderson')).not.toBeInTheDocument();
    expect(screen.queryByText('Unlimited Access')).not.toBeInTheDocument();

    // Toggling again expands it back
    await userEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));
    expect(screen.getByText('Mathew Anderson')).toBeInTheDocument();
  });
});
