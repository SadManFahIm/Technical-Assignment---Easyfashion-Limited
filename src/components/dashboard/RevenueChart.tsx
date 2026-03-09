/**
 * RevenueChart.tsx
 * Bar chart showing daily revenue vs expenses (Revenue updates widget).
 * Uses Recharts for lightweight, SSR-friendly rendering.
 */

import React from 'react';
import { Card, Typography, Button, Space, Select } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { revenueData } from '@/data/mockData';

const { Title, Text } = Typography;

// ── Custom tooltip for chart ──────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #ebf0f7',
          borderRadius: 8,
          padding: '8px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          fontSize: 13,
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: 4, color: '#2a3547' }}>{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.fill, margin: '2px 0' }}>
            {entry.dataKey === 'earnings' ? 'Earnings' : 'Expense'}: ${Math.abs(entry.value).toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC = () => {
  return (
    <Card
      style={{ borderRadius: 12, height: '100%' }}
      styles={{ body: { padding: 20 } }}
    >
      {/* ── Header row ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Title level={5} style={{ margin: 0, color: '#2a3547' }}>
            Revenue updates
          </Title>
          <Text style={{ color: '#7c8fac', fontSize: 13 }}>Overview of Profit</Text>
        </div>
        <Select
          defaultValue="march2022"
          size="small"
          style={{ width: 130 }}
          options={[
            { value: 'march2022', label: 'March 2022' },
            { value: 'april2022', label: 'April 2022' },
          ]}
        />
      </div>

      {/* ── Chart ── */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={revenueData} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f9" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#7c8fac' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#7c8fac' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v > 0 ? v/1000 : v/1000}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(93,135,255,0.05)' }} />
          <ReferenceLine y={0} stroke="#e0e0e0" />
          <Bar dataKey="earnings" fill="#5d87ff" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense"  fill="#49beff" radius={[0, 0, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>

      {/* ── Summary row ── */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 16,
          borderTop: '1px solid #f0f4f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <Text style={{ color: '#7c8fac', fontSize: 12, display: 'block' }}>Total Earnings</Text>
          <Title level={4} style={{ margin: '4px 0', color: '#2a3547' }}>$63,489.50</Title>
          <Space direction="vertical" size={4} style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 13, color: '#2a3547' }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#5d87ff', marginRight: 6 }} />
              Earnings this month: <strong>$48,820</strong>
            </Text>
            <Text style={{ fontSize: 13, color: '#2a3547' }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#49beff', marginRight: 6 }} />
              Expense this month: <strong>$26,498</strong>
            </Text>
          </Space>
        </div>

        <Button
          type="primary"
          style={{
            background: '#5d87ff',
            borderColor: '#5d87ff',
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          View full report
        </Button>
      </div>
    </Card>
  );
};

export default RevenueChart;
