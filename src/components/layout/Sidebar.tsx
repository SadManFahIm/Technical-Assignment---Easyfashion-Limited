/**
 * Sidebar.tsx
 * Left navigation sidebar with real Easy Fashion logo + dark mode support.
 */

import React, { useState } from 'react';
import { Layout, Menu, Badge, Typography, Avatar } from 'antd';
import Image from 'next/image';
import {
  DashboardOutlined, BarChartOutlined, ShoppingCartOutlined,
  MessageOutlined, TeamOutlined, FileTextOutlined,
  CalendarOutlined, StopOutlined, UserOutlined,
  EditOutlined, AppstoreOutlined, RocketOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '@/context/ThemeContext';

const { Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: string, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const menuItems: MenuItem[] = [
  { type: 'group', label: 'DASHBOARDS', key: 'group-dashboards' },
  getItem('Modern',     'modern',     <DashboardOutlined />),
  getItem(<span>Analytical <Badge count={9} style={{ backgroundColor: '#5d87ff' }} /></span>, 'analytical', <BarChartOutlined />),
  getItem('eCommerce',  'ecommerce',  <ShoppingCartOutlined />),

  { type: 'group', label: 'APPLICATIONS', key: 'group-apps' },
  getItem('Chat',     'chat',     <MessageOutlined />),
  getItem('Users',    'users',    <TeamOutlined />, [
    getItem('Social Profile', 'social-profile'),
    getItem('Profile',        'profile'),
    getItem('Card',           'card', undefined, [
      getItem('Style 01', 'style01'),
      getItem('Style 02', 'style02'),
      getItem('Style 03', 'style03'),
    ]),
  ]),
  getItem('Note',     'note',     <FileTextOutlined />),
  getItem('Calendar', 'calendar', <CalendarOutlined />),
  getItem('Disable',  'disable',  <StopOutlined />),

  { type: 'group', label: 'OTHERS', key: 'group-others' },
  getItem(
    <span>Avatar <span style={{ fontSize: 11, background: '#5d87ff', color: '#fff', borderRadius: 4, padding: '1px 6px', marginLeft: 4 }}>Coded</span></span>,
    'avatar', <UserOutlined />
  ),
  getItem(
    <span>Outline <span style={{ fontSize: 11, border: '1px solid #5d87ff', color: '#5d87ff', borderRadius: 4, padding: '1px 6px', marginLeft: 4 }}>Outline</span></span>,
    'outline', <EditOutlined />
  ),
  getItem(
    <span>Basic <span style={{ fontSize: 11, color: '#7c8fac' }}>8+ Basic Components</span> <Badge count={9} style={{ backgroundColor: '#13deb9' }} /></span>,
    'basic', <AppstoreOutlined />
  ),
];

const Sidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const [openKeys, setOpenKeys] = useState<string[]>(['users']);
  const { isDark } = useTheme();

  const bg    = isDark ? '#1e2a45' : '#ffffff';
  const border = isDark ? '#2a3a5c' : '#ebf0f7';

  return (
    <Sider
      width={270}
      collapsedWidth={80}
      collapsed={collapsed}
      style={{ background: bg, height: '100vh', position: 'sticky', top: 0, overflowY: 'auto', overflowX: 'hidden', boxShadow: '0 0 24px rgba(0,0,0,0.06)', borderRight: `1px solid ${border}` }}
    >
      {/* ── Logo ── */}
      <div style={{ padding: collapsed ? '16px 12px' : '14px 20px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 10, height: 70 }}>
        <Image src="/images/logo.png" alt="Easy Fashion Ltd." width={collapsed ? 40 : 110} height={38} style={{ objectFit: 'contain' }} />
      </div>

      {/* ── User Profile (shown when expanded, matches dark Figma sidebar) ── */}
      {!collapsed && (
        <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${border}` }}>
          <Avatar
            size={42}
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=mathew&backgroundColor=b6e3f4"
            style={{ border: '2px solid #5d87ff', flexShrink: 0 }}
          />
          <div>
            <Text strong style={{ fontSize: 14, display: 'block', lineHeight: 1.3, color: isDark ? '#e0e6f0' : '#2a3547' }}>
              Mathew Anderson
            </Text>
            <Text style={{ fontSize: 12, color: '#7c8fac' }}>Marketing Director</Text>
          </div>
        </div>
      )}

      {/* ── Navigation Menu ── */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['modern']}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={menuItems}
        inlineCollapsed={collapsed}
        style={{ padding: '8px', fontSize: 14, fontWeight: 500, background: 'transparent' }}
      />

      {/* ── Upgrade Banner ── */}
      {!collapsed && (
        <div style={{ margin: '12px 16px 16px', background: isDark ? 'linear-gradient(135deg,#253350,#1e2a45)' : 'linear-gradient(135deg,#eef2ff,#dce8fd)', borderRadius: 12, padding: 16, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: 'rgba(93,135,255,0.12)', borderRadius: '50%' }} />
          <RocketOutlined style={{ fontSize: 30, color: '#5d87ff', marginBottom: 6, display: 'block' }} />
          <Text strong style={{ fontSize: 13, color: isDark ? '#e0e6f0' : '#2a3547', display: 'block', marginBottom: 2 }}>Unlimited Access</Text>
          <button style={{ marginTop: 8, background: '#5d87ff', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
            Signup
          </button>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
