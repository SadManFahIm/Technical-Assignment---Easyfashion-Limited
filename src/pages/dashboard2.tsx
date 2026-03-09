/**
 * pages/dashboard2.tsx
 * Dashboard 2 — Welcome card, Revenue line chart, Product performances,
 * Recent transactions, Total profit, Daily activities.
 */

import React from 'react';
import { Row, Col, Card, Typography, Select } from 'antd';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import DailyActivities from '@/components/dashboard/DailyActivities';
import { YearlyBreakup } from '@/components/dashboard/EarningsWidgets';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const { Title, Text } = Typography;

// ── Revenue line chart data for this page ─────────────────────
const lineData = [
  { date: '16/04', modernize: 1000, spike: 800  },
  { date: '17/04', modernize: 1500, spike: 1200 },
  { date: '18/04', modernize: 1200, spike: 1600 },
  { date: '19/04', modernize: 2200, spike: 1800 },
  { date: '20/04', modernize: 3200, spike: 2400 },
  { date: '21/04', modernize: 2800, spike: 2200 },
  { date: '22/04', modernize: 3800, spike: 2800 },
];

const RevenueLineChart: React.FC = () => (
  <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 20 } }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div>
        <Title level={5} style={{ margin: 0, color: '#2a3547' }}>Revenue updates</Title>
        <Text style={{ color: '#7c8fac', fontSize: 13 }}>Overview of Profit</Text>
      </div>
      <Select
        defaultValue="march2022"
        size="small"
        style={{ width: 130 }}
        options={[{ value: 'march2022', label: 'March 2022' }]}
      />
    </div>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={lineData}>
        <defs>
          <linearGradient id="mod" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#5d87ff" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#5d87ff" stopOpacity={0}    />
          </linearGradient>
          <linearGradient id="spk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#49beff" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#49beff" stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f9" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#7c8fac' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#7c8fac' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}k`} />
        <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #ebf0f7', fontSize: 12 }} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: '#7c8fac' }}
          formatter={(value) => value === 'modernize' ? 'Modernize' : 'Spike Admin'}
        />
        <Area type="monotone" dataKey="modernize" stroke="#5d87ff" strokeWidth={2} fill="url(#mod)" dot={false} />
        <Area type="monotone" dataKey="spike"     stroke="#49beff" strokeWidth={2} fill="url(#spk)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
);

// ── Earnings mini card ─────────────────────────────────────────
const EarningsMiniCard: React.FC = () => (
  <Card style={{ borderRadius: 12, height: '100%' }} styles={{ body: { padding: 20 } }}>
    <Text style={{ color: '#7c8fac', fontSize: 13, display: 'block' }}>Earnings</Text>
    <Title level={3} style={{ margin: '4px 0 0', color: '#2a3547' }}>$678,298</Title>
    <Text style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>↑ +9%</Text>
  </Card>
);

// ── Page component ─────────────────────────────────────────────
const Dashboard2: React.FC = () => {
  return (
    <>
      <Head>
        <title>Analytical Dashboard — Easy Fashion Ltd.</title>
      </Head>

      <DashboardLayout>
        {/* Row 1: Welcome card + Earnings */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <WelcomeCard />
          </Col>
          <Col xs={24} lg={8}>
            <Row gutter={[16, 16]}>
              <Col span={24}><EarningsMiniCard /></Col>
              <Col span={24}><YearlyBreakup /></Col>
            </Row>
          </Col>
        </Row>

        {/* Row 2: Revenue line chart + Recent transactions */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={16}>
            <RevenueLineChart />
          </Col>
          <Col xs={24} lg={8}>
            <RecentTransactions />
          </Col>
        </Row>

        {/* Row 3: Product performance + Daily activities */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={16}>
            <ProductPerformance />
          </Col>
          <Col xs={24} lg={8}>
            <DailyActivities />
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
};

export default Dashboard2;
