/**
 * BestSellingProducts.tsx
 * Blue card with real Figma product illustration + progress bars.
 */

import React from 'react';
import { Card, Typography, Progress } from 'antd';
import Image from 'next/image';
import { bestSelling } from '@/data/mockData';

const { Title, Text } = Typography;

const BestSellingProducts: React.FC = () => (
  <Card style={{ borderRadius: 12, overflow: 'hidden', height: '100%', border: 'none' }} styles={{ body: { padding: 0 } }}>
    {/* Blue top section */}
    <div style={{ background: 'linear-gradient(145deg, #5d87ff 0%, #2c5ee8 100%)', padding: '20px 20px 0' }}>
      <Title level={5} style={{ margin: '0 0 2px', color: '#fff' }}>Best Selling Products</Title>
      <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Overview 2022</Text>

      {/* Real Figma illustration */}
      <div style={{ marginTop: 14, height: 140, position: 'relative', borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
        <Image
          src="/images/product-illustration.png"
          alt="Product illustration"
          fill
          style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
        />
      </div>
    </div>

    {/* White bottom section */}
    <div style={{ background: '#fff', padding: '16px 20px' }}>
      {bestSelling.map((p, i) => (
        <div key={p.id} style={{ marginBottom: i < bestSelling.length - 1 ? 16 : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div>
              <Text strong style={{ fontSize: 13, color: '#2a3547', display: 'block', lineHeight: 1.3 }}>{p.name}</Text>
              <Text style={{ fontSize: 12, color: '#7c8fac' }}>{p.price}</Text>
            </div>
            <Text strong style={{ fontSize: 13, color: p.color }}>{p.progress}%</Text>
          </div>
          <Progress percent={p.progress} showInfo={false} strokeColor={p.color} trailColor="#f0f4f9" strokeLinecap="round" size={['100%', 6]} />
        </div>
      ))}
    </div>
  </Card>
);

export default BestSellingProducts;
