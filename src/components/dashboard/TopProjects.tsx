/**
 * TopProjects.tsx
 * Table with cartoon avatars using DiceBear API.
 */

import React from 'react';
import { Card, Table, Typography, Select } from 'antd';
import Image from 'next/image';
import type { ColumnsType } from 'antd/es/table';
import { topProjects } from '@/data/mockData';

const { Title, Text } = Typography;

// Cartoon avatar seeds (DiceBear avataaars style)
const avatarSeeds = ['john1', 'sarah2', 'mike3', 'lisa4'];

const priorityConfig: Record<string, { bg: string; color: string }> = {
  Low:         { bg: '#e8f5e9', color: '#2e7d32' },
  Yellow:      { bg: '#fff8e1', color: '#f57f17' },
  High:        { bg: '#fce4ec', color: '#c62828' },
  'Very High': { bg: '#ede7f6', color: '#4527a0' },
};

interface ProjectRow { id: number; name: string; role: string; project: string; priority: string; budget: string; }

const columns: ColumnsType<ProjectRow> = [
  {
    title: 'Assigned',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record, index) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Cartoon avatar */}
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid #ecf2ff', flexShrink: 0 }}>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[index % avatarSeeds.length]}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
            alt={name}
            width={36}
            height={36}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <div>
          <Text strong style={{ fontSize: 13, display: 'block', lineHeight: 1.3 }}>{name}</Text>
          <Text style={{ fontSize: 12, color: '#7c8fac' }}>{record.role}</Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Projects',
    dataIndex: 'project',
    key: 'project',
    render: (p: string) => <Text style={{ fontSize: 13 }}>{p}</Text>,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: string) => {
      const cfg = priorityConfig[priority] ?? { bg: '#f5f6fa', color: '#7c8fac' };
      return <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>{priority}</span>;
    },
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    render: (b: string) => <Text strong style={{ fontSize: 13 }}>{b}</Text>,
  },
];

const TopProjects: React.FC = () => (
  <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 0 } }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f0f4f9' }}>
      <div>
        <Title level={5} style={{ margin: 0 }}>Top Projects</Title>
        <Text style={{ fontSize: 13, color: '#7c8fac' }}>Best employees</Text>
      </div>
      <Select defaultValue="all" size="small" style={{ width: 130 }} options={[{ value: 'all', label: 'Enter Text' }, { value: '2022', label: 'Year 2022' }]} />
    </div>
    <Table<ProjectRow> dataSource={topProjects} columns={columns} rowKey="id" pagination={false} size="middle" />
  </Card>
);

export default TopProjects;
