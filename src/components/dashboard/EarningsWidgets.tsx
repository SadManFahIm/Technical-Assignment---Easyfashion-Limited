/**
 * EarningsWidgets.tsx
 * YearlyBreakup — donut chart (right column)
 * MonthlyEarnings — sparkline card with toggle switch (matches Figma exactly)
 */

import React from 'react';
import { Card, Typography, Switch } from 'antd';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis,
} from 'recharts';
import { yearlyBreakupData, monthlyEarningsSparkline } from '@/data/mockData';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const DONUT_COLORS = ['#5d87ff', '#e8eef7'];

// ══════════════════════════════════════════
// YearlyBreakup Widget
// ══════════════════════════════════════════
export const YearlyBreakup: React.FC = () => (
  <Card style={{ borderRadius: 12, height: '100%' }} styles={{ body: { padding: 20 } }}>
    <Title level={5} style={{ margin: '0 0 12px', color: 'inherit' }}>Yearly breakup</Title>

    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {/* Donut */}
      <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={yearlyBreakupData} cx="50%" cy="50%" innerRadius={36} outerRadius={52} paddingAngle={3} dataKey="value" strokeWidth={0}>
              {yearlyBreakupData.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
          <Text strong style={{ fontSize: 12 }}>68%</Text>
        </div>
      </div>

      {/* Right side stats */}
      <div>
        <Title level={4} style={{ margin: '0 0 2px' }}>$36,358</Title>
        <Text style={{ fontSize: 12, color: '#13deb9', fontWeight: 600 }}>
          <ArrowUpOutlined /> +9%{' '}
          <Text style={{ color: '#7c8fac', fontWeight: 400, fontSize: 12 }}>than last year</Text>
        </Text>
        {/* Legend */}
        <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
          {['2022', '2021'].map((yr, i) => (
            <Text key={yr} style={{ fontSize: 12, color: '#7c8fac', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: DONUT_COLORS[i] }} />
              {yr}
            </Text>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

// ══════════════════════════════════════════
// MonthlyEarnings Widget
// ══════════════════════════════════════════
export const MonthlyEarnings: React.FC = () => (
  <Card style={{ borderRadius: 12, height: '100%' }} styles={{ body: { padding: 20 } }}>
    {/* Header row with toggle switch (matches Figma) */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <Title level={5} style={{ margin: 0 }}>Monthly earnings</Title>
      <Switch defaultChecked size="small" style={{ background: '#5d87ff' }} />
    </div>

    {/* Value + growth */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <Title level={3} style={{ margin: 0 }}>$6,820</Title>
      <Text style={{ fontSize: 13, color: '#13deb9', fontWeight: 600 }}>
        <ArrowUpOutlined /> +9%
      </Text>
    </div>

    {/* Sparkline */}
    <div style={{ height: 60 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={monthlyEarningsSparkline}>
          <defs>
            <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#5d87ff" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#5d87ff" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" hide />
          <Area type="monotone" dataKey="y" stroke="#5d87ff" strokeWidth={2.5} fill="url(#earningsGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>
);
