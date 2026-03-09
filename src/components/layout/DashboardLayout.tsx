/**
 * DashboardLayout.tsx
 * Main layout wrapper used by every page.
 * Provides the sticky sidebar + header + scrollable content area.
 */

import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import TopHeader from './Header';

const { Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Controls whether the sidebar is collapsed to icons-only
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ── Left Sidebar ── */}
      <Sidebar collapsed={collapsed} />

      {/* ── Main area (header + content) ── */}
      <Layout>
        {/* Sticky top header */}
        <TopHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        {/* Page content */}
        <Content
          style={{
            padding: '24px',
            background: '#f5f6fa',
            minHeight: 'calc(100vh - 70px)',
            overflowY: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
