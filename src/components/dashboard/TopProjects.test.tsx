/**
 * TopProjects.test.tsx
 * Unit tests for the top projects table with avatars and priority badges.
 */

import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import TopProjects from '@/components/dashboard/TopProjects';
import { topProjects } from '@/data/mockData';

describe('TopProjects', () => {
  it('renders the card heading, subtitle and filter select', () => {
    render(<TopProjects />);
    expect(screen.getByText('Top Projects')).toBeInTheDocument();
    expect(screen.getByText('Best employees')).toBeInTheDocument();

    const combo = screen.getByRole('combobox');
    const selection = combo
      .closest('.ant-select')
      ?.querySelector('.ant-select-selection-item');
    expect(selection).toHaveTextContent('Enter Text');
  });

  it('renders the table column headers', () => {
    render(<TopProjects />);
    expect(screen.getByRole('columnheader', { name: 'Assigned' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Priority' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Budget' })).toBeInTheDocument();
  });

  it('renders one row per project with avatar, name, role, project and budget', () => {
    render(<TopProjects />);
    // All rows share the same name/role/budget in mock data
    expect(screen.getAllByText('John Doe')).toHaveLength(topProjects.length);
    expect(screen.getAllByText('Web Designer')).toHaveLength(topProjects.length);
    expect(screen.getAllByText('$3.5k')).toHaveLength(topProjects.length);
    expect(screen.getAllByAltText('John Doe')).toHaveLength(topProjects.length);

    for (const project of topProjects) {
      expect(screen.getAllByText(project.project).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(project.priority).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('shows the grid pagination off (single page table)', () => {
    render(<TopProjects />);
    const rowgroup = screen.getAllByRole('rowgroup');
    // Header + body groups only, no pagination footer
    expect(rowgroup).toHaveLength(2);
    expect(screen.queryByText(/page/i)).not.toBeInTheDocument();
  });

  it('colorizes each priority chip', () => {
    render(<TopProjects />);
    const table = screen.getByRole('table');
    const low = within(table).getByText('Low');
    expect(low).toHaveStyle({ backgroundColor: '#e8f5e9' });
    const veryHigh = within(table).getByText('Very High');
    expect(veryHigh).toHaveStyle({ color: '#4527a0' });
  });
});
