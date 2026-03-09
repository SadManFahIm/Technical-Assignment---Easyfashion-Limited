/**
 * EmployeeSalary.tsx
 * Monthly bar chart — only active month (Jul) is blue, rest are light grey.
 * Matches Figma design exactly.
 *
 * CustomerStats — two mini sparkline cards.
 */

import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import { salaryData } from '@/data/mockData';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const sparkData = [
  { x: 0, y: 30 }, { x: 1, y: 60 }, { x: 2, y: 40 },
  { x: 3, y: 80 }, { x: 4, y: 50 }, { x: 5, y: 70 },
];

// ══════════════════════════════════════════
// EmployeeSalary
// ══════════════════════════════════════════
export const EmployeeSalary: React.FC = () => {
  const maxVal = Math.max(...salaryData.map((d) => d.value));

  return (
    <Card style={{ borderRadius: 12, height: '100%' }} styles={{ body: { padding: 20 } }}>
      <Title level={5} style={{ margin: '0 0 2px' }}>Employee salary</Title>
      <Text style={{ color: '#7c8fac', fontSize: 13 }}>Every month</Text>

      <div style={{ marginTop: 16, height: 150 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salaryData} barCategoryGap="35%">
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7c8fac' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              formatter={(v) => [`$${v}`, 'Salary']}
              contentStyle={{ borderRadius: 8, border: '1px solid #ebf0f7', fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {salaryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.value === maxVal ? '#5d87ff' : '#e8eef7'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary row — matches Figma icon + label layout */}
      <Row gutter={12} style={{ marginTop: 12 }}>
        {[
          { label: 'Total Sales', value: '$36,358' },
          { label: 'Expenses',    value: '$5,296'  },
        ].map((s) => (
          <Col span={12} key={s.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#ecf2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                ⠿
              </div>
              <div>
                <Text style={{ fontSize: 11, color: '#7c8fac', display: 'block' }}>{s.label}</Text>
                <Text strong style={{ fontSize: 14 }}>{s.value}</Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

// ══════════════════════════════════════════
// CustomerStats mini cards
// ══════════════════════════════════════════
const MiniStatCard: React.FC<{ label: string; value: string; growth: string; color: string }> = ({ label, value, growth, color }) => (
  <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 16 } }}>
    <Text style={{ color: '#7c8fac', fontSize: 13, display: 'block' }}>{label}</Text>
    <Title level={4} style={{ margin: '4px 0 2px' }}>{value}</Title>
    <Text style={{ fontSize: 13, color: '#13deb9', fontWeight: 600 }}>
      <ArrowUpOutlined /> {growth}
    </Text>
    <div style={{ height: 44, marginTop: 8 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparkData}>
          <defs>
            <linearGradient id={`cg-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0}    />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="y" stroke={color} strokeWidth={2} fill={`url(#cg-${label})`} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

export const CustomerStats: React.FC = () => (
  <Row gutter={[0, 12]}>
    <Col span={24}><MiniStatCard label="Customers" value="36,358" growth="+9%" color="#5d87ff" /></Col>
    <Col span={24}><MiniStatCard label="Projects"  value="78,298" growth="+9%" color="#13deb9" /></Col>
  </Row>
);
