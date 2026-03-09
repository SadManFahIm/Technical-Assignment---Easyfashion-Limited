/**
 * ProductPerformance.tsx
 * Product performance table with cartoon avatars + tabs.
 */

import React from 'react';
import { Card, Table, Typography, Select, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { productPerformances } from '@/data/mockData';

const { Title, Text } = Typography;

const avatarSeeds = ['minecraft1', 'webapp2', 'modernize3', 'dashboard4'];

const priorityStyle: Record<string, { bg: string; color: string }> = {
  Low:         { bg: '#e8f5e9', color: '#2e7d32' },
  Medium:      { bg: '#fff8e1', color: '#f57f17' },
  High:        { bg: '#fce4ec', color: '#c62828' },
  'Very High': { bg: '#ede7f6', color: '#4527a0' },
};

interface PerfRow { id: number; name: string; owner: string; progress: number; priority: string; budget: string; }

// Inline SVG sparkline
const Sparkline: React.FC<{ positive?: boolean }> = ({ positive = true }) => (
  <svg width={60} height={20} viewBox="0 0 60 20">
    <path
      d={positive ? 'M0,14 C15,10 25,4 35,7 C45,10 52,5 60,2' : 'M0,4 C10,7 20,13 30,10 C40,7 50,12 60,15'}
      fill="none"
      stroke={positive ? '#13deb9' : '#fa896b'}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

const columns: ColumnsType<PerfRow> = [
  {
    title: 'Assigned',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record, index) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid #ecf2ff', flexShrink: 0 }}>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[index % avatarSeeds.length]}&backgroundColor=ffd5dc,c0aede,b6e3f4,d1d4f9`}
            alt={name}
            width={36}
            height={36}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <div>
          <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.3 }}>{name}</Text>
          <Text style={{ fontSize: 12, color: '#7c8fac' }}>{record.owner}</Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (p: number) => <Text strong style={{ fontSize: 13 }}>{p}%</Text>,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: string) => {
      const cfg = priorityStyle[priority] ?? { bg: '#f5f6fa', color: '#7c8fac' };
      return <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>{priority}</span>;
    },
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    render: (b: string) => <Text strong style={{ fontSize: 13 }}>{b}</Text>,
  },
  {
    title: 'Chart',
    key: 'chart',
    render: (_, record) => <Sparkline positive={record.progress > 50} />,
  },
];

const tabItems = ['App', 'Mobile', 'SaaS', 'Products', 'Others'].map((t) => ({ key: t.toLowerCase(), label: t }));

const ProductPerformance: React.FC = () => (
  <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 0 } }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 0' }}>
      <div>
        <Title level={5} style={{ margin: 0 }}>Product Performances</Title>
        <Text style={{ fontSize: 13, color: '#7c8fac' }}>How it performs</Text>
      </div>
      <Select defaultValue="march2022" size="small" style={{ width: 130 }} options={[{ value: 'march2022', label: 'March 2022' }]} />
    </div>
    <div style={{ padding: '0 20px' }}>
      <Tabs defaultActiveKey="app" items={tabItems} size="small" style={{ marginBottom: 0 }} />
    </div>
    <Table<PerfRow> dataSource={productPerformances} columns={columns} rowKey="id" pagination={false} size="middle" />
  </Card>
);

export default ProductPerformance;
