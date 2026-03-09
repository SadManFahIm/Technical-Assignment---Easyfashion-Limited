/**
 * Header.tsx
 * Top navigation bar with search, dark mode toggle, notification icons, and user avatar.
 */

import React from 'react';
import { Layout, Input, Badge, Avatar, Tooltip, Space, Dropdown, Switch } from 'antd';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined,
  BellOutlined, ShoppingCartOutlined, TranslationOutlined,
  AppstoreOutlined, UserOutlined, SettingOutlined,
  LogoutOutlined, SunOutlined, MoonOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '@/context/ThemeContext';

const { Header: AntHeader } = Layout;

const userMenuItems: MenuProps['items'] = [
  { key: 'profile',  icon: <UserOutlined />,   label: 'My Profile'        },
  { key: 'settings', icon: <SettingOutlined />, label: 'Account Settings'  },
  { type: 'divider' },
  { key: 'logout',   icon: <LogoutOutlined />,  label: 'Logout', danger: true },
];

interface TopHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ collapsed, onToggle }) => {
  const { isDark, toggleTheme } = useTheme();

  const iconBtn: React.CSSProperties = {
    background: isDark ? '#253350' : '#f5f6fa',
    border: `1px solid ${isDark ? '#2a3a5c' : '#ebf0f7'}`,
    borderRadius: 8,
    width: 38,
    height: 38,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <AntHeader
      style={{
        background: isDark ? '#1e2a45' : '#ffffff',
        padding: '0 24px',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: isDark ? '0 1px 8px rgba(0,0,0,0.3)' : '0 1px 8px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: `1px solid ${isDark ? '#2a3a5c' : '#ebf0f7'}`,
      }}
    >
      {/* ── Left ── */}
      <Space size={16}>
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: isDark ? '#e0e6f0' : '#2a3547', display: 'flex', alignItems: 'center', padding: 4 }}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>

        <Input
          prefix={<SearchOutlined style={{ color: '#7c8fac' }} />}
          placeholder="Search..."
          style={{
            width: 240,
            borderRadius: 8,
            background: isDark ? '#253350' : '#f5f6fa',
            border: `1px solid ${isDark ? '#2a3a5c' : '#ebf0f7'}`,
            color: isDark ? '#e0e6f0' : '#2a3547',
          }}
          variant="filled"
        />
      </Space>

      {/* ── Right ── */}
      <Space size={8}>
        {/* ── Dark / Light toggle ── */}
        <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={toggleTheme}>
            <SunOutlined style={{ fontSize: 14, color: isDark ? '#8899bb' : '#ffae1f' }} />
            <Switch
              checked={isDark}
              onChange={toggleTheme}
              size="small"
              style={{ background: isDark ? '#5d87ff' : '#d9d9d9' }}
            />
            <MoonOutlined style={{ fontSize: 14, color: isDark ? '#5d87ff' : '#7c8fac' }} />
          </div>
        </Tooltip>

        <Tooltip title="Notifications">
          <Badge count={5} size="small">
            <button style={iconBtn} aria-label="Notifications">
              <BellOutlined style={{ fontSize: 18, color: isDark ? '#e0e6f0' : '#2a3547' }} />
            </button>
          </Badge>
        </Tooltip>

        <Tooltip title="Cart">
          <Badge count={3} size="small">
            <button style={iconBtn} aria-label="Cart">
              <ShoppingCartOutlined style={{ fontSize: 18, color: isDark ? '#e0e6f0' : '#2a3547' }} />
            </button>
          </Badge>
        </Tooltip>

        <Tooltip title="Language">
          <button style={iconBtn} aria-label="Language">
            <TranslationOutlined style={{ fontSize: 18, color: isDark ? '#e0e6f0' : '#2a3547' }} />
          </button>
        </Tooltip>

        <Tooltip title="Apps">
          <button style={iconBtn} aria-label="Apps">
            <AppstoreOutlined style={{ fontSize: 18, color: isDark ? '#e0e6f0' : '#2a3547' }} />
          </button>
        </Tooltip>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }} aria-label="User menu">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=natalia&backgroundColor=b6e3f4"
              alt="User avatar"
              width={36}
              height={36}
              style={{ borderRadius: '50%', border: '2px solid #5d87ff', display: 'block' }}
            />
          </button>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default TopHeader;
