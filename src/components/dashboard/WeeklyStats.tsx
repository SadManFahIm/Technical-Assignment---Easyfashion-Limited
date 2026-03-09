/**
 * WeeklyStats.tsx
 * Smooth area sparkline + 3 seller rows with coloured dot-grid icons.
 * Matches Figma Weekly Stats design exactly.
 */

import React from 'react';
import { Card, Typography, Space } from 'antd';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyStatsData } from '@/data/mockData';

const { Title, Text } = Typography;

// Dot-grid SVG icon (matches Figma ⠿ icons)
const DotGrid: React.FC<{ color: string; bg: string }> = ({ color, bg }) => (
  <div style={{ width: 34, height: 34, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      {[0,4,8].map(row =>
        [0,4,8].map(col => (
          <rect key={`${row}-${col}`} x={col} y={row} width="2.5" height="2.5" rx="0.8" fill={color} />
        ))
      )}
    </svg>
  </div>
);

const sellers = [
  { label: 'Top sales',      sub: 'Johnathan Doe',    count: '+68', color: '#5d87ff', bg: '#ecf2ff', countBg: '#ecf2ff' },
  { label: 'Best seller',    sub: 'MaterialPro Admin', count: '+68', color: '#13deb9', bg: '#e6fcf5', countBg: '#e6fcf5' },
  { label: 'Most commented', sub: 'Ample Admin',       count: '+68', color: '#fa896b', bg: '#fef0eb', countBg: '#fef0eb' },
];

const WeeklyStats: React.FC = () => (
  <Card style={{ borderRadius: 12, height: '100%' }} styles={{ body: { padding: 20 } }}>
    <Title level={5} style={{ margin: '0 0 2px' }}>Weekly stats</Title>
    <Text style={{ color: '#7c8fac', fontSize: 13 }}>Average sales</Text>

    {/* Smooth sparkline — matches Figma wave shape */}
    <div style={{ height: 100, margin: '14px -4px 14px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklyStatsData}>
          <defs>
            <linearGradient id="wkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#5d87ff" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#5d87ff" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" hide />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #ebf0f7', fontSize: 12 }} formatter={(v) => [v, 'Sales']} />
          <Area type="monotone" dataKey="y" stroke="#5d87ff" strokeWidth={2.5} fill="url(#wkGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Seller rows */}
    <Space direction="vertical" style={{ width: '100%' }} size={12}>
      {sellers.map((s) => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space size={10}>
            <DotGrid color={s.color} bg={s.bg} />
            <div>
              <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.3 }}>{s.label}</Text>
              <Text style={{ fontSize: 12, color: '#7c8fac' }}>{s.sub}</Text>
            </div>
          </Space>
          <div style={{ background: s.countBg, color: s.color, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>
            {s.count}
          </div>
        </div>
      ))}
    </Space>
  </Card>
);

export default WeeklyStats;
