/**
 * mockData.test.ts
 * Sanity tests for the shared mock data — guards against typos and
 * structural breakage if someone edits the fixtures.
 */

import { describe, expect, it } from 'vitest';
import {
  statCards,
  revenueData,
  salaryData,
  transactions,
  topProjects,
  productPerformances,
  dailyActivities,
  bestSelling,
  welcomeStats,
} from '@/data/mockData';

describe('mockData', () => {
  it('has six stat cards with label, value and colours', () => {
    expect(statCards).toHaveLength(6);
    for (const card of statCards) {
      expect(card.label).toBeTruthy();
      expect(card.value).toBeTruthy();
      expect(card.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(card.bg).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('has revenue data where expense values are negative', () => {
    expect(revenueData.length).toBeGreaterThan(0);
    for (const row of revenueData) {
      expect(row.earnings).toBeGreaterThan(0);
      expect(row.expense).toBeLessThan(0);
    }
  });

  it('has salary data with month labels', () => {
    expect(salaryData.length).toBeGreaterThan(0);
    for (const row of salaryData) {
      expect(row.month).toMatch(/^\d{2}\s\w{3}$/);
      expect(row.value).toBeGreaterThanOrEqual(0);
    }
  });

  it('formats every transaction amount with an explicit sign', () => {
    expect(transactions.length).toBeGreaterThan(0);
    for (const tx of transactions) {
      // Every amount carries an explicit + or - sign followed by a dollar value
      expect(tx.amount).toMatch(/^[+-]\$[\d,]+$/);
    }
  });

  it('has priority values only from the known set in tables', () => {
    const allowed = new Set(['Low', 'Medium', 'High', 'Very High', 'Yellow']);
    for (const row of [...topProjects, ...productPerformances]) {
      expect(allowed.has(row.priority)).toBe(true);
    }
  });

  it('has daily activities with HH:MM timestamps', () => {
    expect(dailyActivities.length).toBeGreaterThan(0);
    for (const activity of dailyActivities) {
      expect(activity.time).toMatch(/^\d{2}:\d{2}$/);
      expect(activity.text).toBeTruthy();
    }
  });

  it('has best selling products with a dollar price', () => {
    expect(bestSelling.length).toBeGreaterThan(0);
    for (const product of bestSelling) {
      expect(product.price).toMatch(/^\$\d/);
      expect(product.progress).toBeGreaterThanOrEqual(0);
      expect(product.progress).toBeLessThanOrEqual(100);
    }
  });

  it('has complete welcome stats', () => {
    for (const value of Object.values(welcomeStats)) {
      expect(value).toBeTruthy();
    }
  });
});
