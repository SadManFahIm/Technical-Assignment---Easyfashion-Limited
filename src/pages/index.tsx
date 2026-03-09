/**
 * pages/index.tsx
 * Dashboard 1 — "Modern" view.
 *
 * Layout:
 *  Row 1 : 6 stat cards (full width)
 *  Row 2 : Revenue chart (left 8) | Yearly breakup + Monthly earnings (right 4)
 *  Row 3 : Employee salary (left 5) | Customer mini cards (mid 3) | Best selling (right 4) [with notice card]
 *  Row 4 : Weekly stats (left 4) | Top projects table (right 8)
 */

import React from 'react';
import { Row, Col } from 'antd';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCards from '@/components/dashboard/StatCards';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { YearlyBreakup, MonthlyEarnings } from '@/components/dashboard/EarningsWidgets';
import { EmployeeSalary, CustomerStats } from '@/components/dashboard/EmployeeSalary';
import BestSellingProducts from '@/components/dashboard/BestSellingProducts';
import WeeklyStats from '@/components/dashboard/WeeklyStats';
import TopProjects from '@/components/dashboard/TopProjects';

// ── Notice / comment card (middle row) ───────────────────────
import { Card, Avatar, Typography, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const NoticeCard: React.FC = () => (
  <Card style={{ borderRadius: 12, marginBottom: 16 }} styles={{ body: { padding: 16 } }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
      <Avatar size={40} style={{ background: '#5d87ff', fontWeight: 700, flexShrink: 0 }}>S</Avatar>
      <div style={{ flex: 1 }}>
        <Title level={5} style={{ margin: '0 0 4px', color: '#2a3547', fontSize: 13 }}>
          Super awesome, Vue coming soon!
        </Title>
        <Text style={{ fontSize: 12, color: '#7c8fac' }}>22 March, 2022</Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ display: 'flex', gap: -4 }}>
            {['#5d87ff', '#13deb9', '#ffae1f', '#fa896b'].map((color, i) => (
              <Avatar
                key={i}
                size={26}
                style={{
                  background: color,
                  marginLeft: i > 0 ? -8 : 0,
                  border: '2px solid #fff',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {String.fromCharCode(65 + i)}
              </Avatar>
            ))}
            <Avatar size={26} style={{ marginLeft: -8, background: '#f5f6fa', border: '2px solid #fff', fontSize: 10, color: '#7c8fac', fontWeight: 700 }}>
              +8
            </Avatar>
          </div>
          <Button size="small" icon={<MessageOutlined />} style={{ borderRadius: 8 }}>
            24
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

// ── Page component ────────────────────────────────────────────
const DashboardPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Modern Dashboard — Easy Fashion Ltd.</title>
      </Head>

      <DashboardLayout>
        {/* ── Row 1: Stat cards ── */}
        <StatCards />

        {/* ── Row 2: Revenue + Earnings widgets ── */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={16}>
            <RevenueChart />
          </Col>
          <Col xs={24} lg={8}>
            <Row gutter={[16, 16]}>
              <Col span={24}><YearlyBreakup /></Col>
              <Col span={24}><MonthlyEarnings /></Col>
            </Row>
          </Col>
        </Row>

        {/* ── Row 3: Employee salary + Customer stats + Best selling ── */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={8}>
            <EmployeeSalary />
          </Col>
          <Col xs={24} lg={6}>
            <CustomerStats />
            <div style={{ marginTop: 16 }}>
              <NoticeCard />
            </div>
          </Col>
          <Col xs={24} lg={10}>
            <BestSellingProducts />
          </Col>
        </Row>

        {/* ── Row 4: Weekly stats + Top projects ── */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={8}>
            <WeeklyStats />
          </Col>
          <Col xs={24} lg={16}>
            <TopProjects />
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
