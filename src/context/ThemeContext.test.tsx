/**
 * ThemeContext.test.tsx
 * Unit tests for the dark/light theme context:
 * defaults, toggling, localStorage persistence, body class handling.
 */

import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

// Small probe component to read context state inside tests
const ThemeProbe: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="mode">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>
  );

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.body.classList.remove('dark-mode');
  });

  it('defaults to light mode', () => {
    renderWithProvider();
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(document.body).not.toHaveClass('dark-mode');
  });

  it('toggles to dark and persists the choice', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'toggle' }));
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body).toHaveClass('dark-mode');
  });

  it('toggles back to light and persists the choice', async () => {
    localStorage.setItem('theme', 'dark');
    const user = userEvent.setup();
    renderWithProvider();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'toggle' }));
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.body).not.toHaveClass('dark-mode');
  });

  it('restores dark mode from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProvider();
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(document.body).toHaveClass('dark-mode');
  });
});
