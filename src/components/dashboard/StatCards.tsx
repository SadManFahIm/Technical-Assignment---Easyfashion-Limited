/**
 * StatCards.tsx
 * Six summary stat cards at the top of Dashboard 1.
 * Employees | Clients | Projects | Events | Payroll | Reports
 */

import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { statCards } from '@/data/mockData';

const { Text, Title } = Typography;

const StatCards: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      {statCards.map((card) => (
        <Col key={card.id} xs={12} sm={8} md={8} lg={4}>
          <Card
            style={{
              background: card.bg,
              border: 'none',
              borderRadius: 12,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            styles={{ body: { padding: '20px 12px' } }}
            className="fade-in-up"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
            }}
          >
            {/* Emoji icon with tinted background */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                fontSize: 22,
              }}
            >
              {card.emoji}
            </div>

            {/* Label */}
            <Text
              style={{
                fontSize: 13,
                color: card.color,
                fontWeight: 600,
                display: 'block',
              }}
            >
              {card.label}
            </Text>

            {/* Value */}
            <Title
              level={4}
              style={{
                margin: '4px 0 0',
                color: '#2a3547',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {card.value}
            </Title>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatCards;
