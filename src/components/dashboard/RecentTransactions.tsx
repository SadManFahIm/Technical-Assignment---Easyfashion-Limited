/**
 * RecentTransactions.tsx
 * List card showing recent income / expense transactions.
 * Used in Dashboard 2 and Dashboard 3.
 */

import React from 'react';
import { Card, Typography, Button, Space, Divider } from 'antd';
import { transactions } from '@/data/mockData';

const { Title, Text } = Typography;

const RecentTransactions: React.FC = () => {
  return (
    <Card style={{ borderRadius: 12, height: '100%' }} styles={{ body: { padding: 20 } }}>
      {/* Header */}
      <Title level={5} style={{ margin: '0 0 2px', color: '#2a3547' }}>
        Recent Transactions
      </Title>
      <Text style={{ fontSize: 13, color: '#7c8fac' }}>Income vs Expense</Text>

      <Divider style={{ margin: '12px 0' }} />

      {/* Transaction list */}
      <Space direction="vertical" style={{ width: '100%' }} size={12}>
        {transactions.map((tx) => (
          <div
            key={tx.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Icon + details */}
            <Space>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `${tx.color}18`,
                  border: `1px solid ${tx.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {tx.icon}
              </div>
              <div>
                <Text strong style={{ fontSize: 13, color: '#2a3547', display: 'block' }}>
                  {tx.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#7c8fac' }}>{tx.desc}</Text>
              </div>
            </Space>

            {/* Amount */}
            <Text
              strong
              style={{
                fontSize: 14,
                color: tx.amount.startsWith('-') ? '#fa896b' : '#13deb9',
              }}
            >
              {tx.amount}
            </Text>
          </div>
        ))}
      </Space>

      {/* View all button */}
      <Button
        block
        style={{
          marginTop: 16,
          borderRadius: 8,
          borderColor: '#d1e0ff',
          color: '#5d87ff',
          fontWeight: 600,
        }}
      >
        View all transactions
      </Button>
    </Card>
  );
};

export default RecentTransactions;
