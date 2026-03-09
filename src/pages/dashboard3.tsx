/**
 * pages/dashboard3.tsx
 * Dashboard 3 — Combined view with most widgets from D1 & D2.
 */

import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import WeeklyStats from '@/components/dashboard/WeeklyStats';
import { EmployeeSalary } from '@/components/dashboard/EmployeeSalary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import DailyActivities from '@/components/dashboard/DailyActivities';
import ProductPerformance from '@/components/dashboard/ProductPerformance';
import { MonthlyEarnings } from '@/components/dashboard/EarningsWidgets';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// ── Mini stat cards (top right area) ──────────────────────────
const MiniStats: React.FC = () => (
  <Row gutter={[16, 16]}>
    {[
      { label: 'Expense',  value: '$10,230', color: '#fa896b', chart: '📉' },
      { label: 'Sales',    value: '$65,432', color: '#5d87ff', chart: '📊' },
      { label: 'Sales',    value: '$16.5k',  color: '#13deb9', sub: '↑',  },
      { label: 'Growth',   value: '24%',     color: '#ffae1f', sub: '↑',  },
    ].map((s, i) => (
      <Col key={i} span={12}>
        <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 14 } }}>
          <Text style={{ fontSize: 12, color: '#7c8fac', display: 'block' }}>{s.label}</Text>
          <Title level={5} style={{ margin: '4px 0 0', color: '#2a3547', fontSize: 16 }}>{s.value}</Title>
          {s.sub && <Text style={{ fontSize: 11, color: s.color }}>{s.sub}</Text>}
        </Card>
      </Col>
    ))}
  </Row>
);

const Dashboard3: React.FC = () => {
  return (
    <>
      <Head>
        <title>eCommerce Dashboard — Easy Fashion Ltd.</title>
      </Head>

      <DashboardLayout>
        {/* Row 1: Welcome + mini stats + monthly earnings */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <WelcomeCard />
          </Col>
          <Col xs={24} lg={8}>
            <MiniStats />
          </Col>
          <Col xs={24} lg={4}>
            <MonthlyEarnings />
          </Col>
        </Row>

        {/* Row 2: Revenue bar + donut */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={12}>
            <RevenueChart />
          </Col>
          <Col xs={24} lg={12}>
            {/* Revenue donut placeholder */}
            <Card style={{ borderRadius: 12, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} styles={{ body: { padding: 20, width: '100%' } }}>
              <div style={{ textAlign: 'center' }}>
                <Title level={5} style={{ color: '#2a3547', margin: '0 0 8px' }}>Revenue updates</Title>
                <Text style={{ color: '#7c8fac', fontSize: 13, display: 'block', marginBottom: 16 }}>Overview of Profit</Text>
                <Title level={2} style={{ color: '#5d87ff', margin: 0 }}>$500,458</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
                  {[{ label: '$23,450', year: '2023' }, { label: '$23,450', year: '2022' }].map((s) => (
                    <div key={s.year} style={{ textAlign: 'center' }}>
                      <Text style={{ fontSize: 13, color: '#2a3547', fontWeight: 600, display: 'block' }}>{s.label}</Text>
                      <Text style={{ fontSize: 12, color: '#7c8fac' }}>{s.year}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Row 3: Weekly stats + Employee salary + Recent transactions */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={8}>
            <WeeklyStats />
          </Col>
          <Col xs={24} lg={8}>
            <EmployeeSalary />
          </Col>
          <Col xs={24} lg={8}>
            <RecentTransactions />
          </Col>
        </Row>

        {/* Row 4: Daily activities + Product performance */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={8}>
            <DailyActivities />
          </Col>
          <Col xs={24} lg={16}>
            <ProductPerformance />
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
};

export default Dashboard3;
