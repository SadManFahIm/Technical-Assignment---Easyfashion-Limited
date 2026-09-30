/**
 * Header.test.tsx
 * Unit tests for the top header: search, sidebar toggle, theme toggle,
 * notification badges, and the user menu anchor.
 * The header consumes ThemeContext, so it renders inside ThemeProvider.
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopHeader from '@/components/layout/Header';
import { ThemeProvider } from '@/context/ThemeContext';

const renderHeader = (onToggle = vi.fn()) =>
  render(
    <ThemeProvider>
      <TopHeader collapsed={false} onToggle={onToggle} />
    </ThemeProvider>
  );

describe('TopHeader', () => {
  it('renders the search field', () => {
    renderHeader();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders the icon action buttons', () => {
    renderHeader();
    for (const label of [
      'Toggle sidebar',
      'Notifications',
      'Cart',
      'Language',
      'Apps',
      'User menu',
    ]) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('shows the notification and cart badge counts', () => {
    renderHeader();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onToggle when the sidebar button is clicked', async () => {
    const onToggle = vi.fn();
    renderHeader(onToggle);
    await userEvent.click(screen.getByRole('button', { name: 'Toggle sidebar' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('toggles dark mode via the theme toggle control', async () => {
    renderHeader();
    const themeSwitch = screen.getAllByRole('switch')[0];
    expect(themeSwitch).toHaveAttribute('aria-checked', 'false');

    // Click the sun icon (inside the toggle wrapper) so the click resolves
    // to a single toggleTheme call — clicking the switch itself would also
    // bubble to the wrapper's onClick and fire twice.
    const sunIcon = document.querySelector('.anticon-sun') as HTMLElement;
    await userEvent.click(sunIcon);
    expect(screen.getAllByRole('switch')[0]).toHaveAttribute('aria-checked', 'true');
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle back — body class and storage follow
    await userEvent.click(sunIcon);
    expect(screen.getAllByRole('switch')[0]).toHaveAttribute('aria-checked', 'false');
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
