/**
 * WelcomeCard.tsx
 * Welcome banner with real Figma illustration (Layer 136 1.png).
 */

import React from 'react';
import { Card, Typography } from 'antd';
import Image from 'next/image';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const WelcomeCard: React.FC = () => (
  <Card
    style={{ borderRadius: 12, background: 'linear-gradient(135deg, #ecf2ff 0%, #dce8fd 100%)', border: '1px solid #d1e0ff', overflow: 'hidden', height: '100%' }}
    styles={{ body: { padding: '20px 24px' } }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Left */}
      <div style={{ flex: 1 }}>
        <Title level={4} style={{ margin: '0 0 16px', color: '#2a3547' }}>Welcome back Natalia!</Title>
        <div style={{ display: 'flex', gap: 36 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Title level={3} style={{ margin: 0, color: '#2a3547' }}>$2,340</Title>
              <ArrowUpOutlined style={{ color: '#5d87ff', fontSize: 14, fontWeight: 700 }} />
            </div>
            <Text style={{ fontSize: 13, color: '#7c8fac' }}>Today's Sales</Text>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Title level={3} style={{ margin: 0, color: '#2a3547' }}>35%</Title>
              <ArrowUpOutlined style={{ color: '#5d87ff', fontSize: 14, fontWeight: 700 }} />
            </div>
            <Text style={{ fontSize: 13, color: '#7c8fac' }}>Overall Performance</Text>
          </div>
        </div>
      </div>

      {/* Right: real Figma illustration */}
      <div style={{ width: 160, height: 120, flexShrink: 0, position: 'relative' }}>
        <Image
          src="/images/welcome-illustration.png"
          alt="Welcome illustration"
          fill
          style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
        />
      </div>
    </div>
  </Card>
);

export default WelcomeCard;
