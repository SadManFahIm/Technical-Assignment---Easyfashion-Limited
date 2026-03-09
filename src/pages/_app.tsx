/**
 * _app.tsx
 * Root application wrapper — configures Ant Design theme + global styles + dark mode.
 */

import type { AppProps } from 'next/app';
import { ConfigProvider, theme as antTheme } from 'antd';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import '@/styles/globals.css';

// ── Inner wrapper reads dark mode context ─────────────────────
const ThemedApp = ({ Component, pageProps }: AppProps) => {
  const { isDark } = useTheme();

  const lightTokens = {
    colorPrimary:        '#5d87ff',
    colorSuccess:        '#13deb9',
    colorWarning:        '#ffae1f',
    colorError:          '#fa896b',
    colorInfo:           '#539bff',
    borderRadius:        8,
    fontFamily:          "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    colorBgContainer:    '#ffffff',
    colorBgLayout:       '#f5f6fa',
    colorBorder:         '#ebf0f7',
    colorText:           '#2a3547',
    colorTextSecondary:  '#7c8fac',
  };

  const darkTokens = {
    ...lightTokens,
    colorBgContainer:   '#1e2a45',
    colorBgLayout:      '#1a2035',
    colorBorder:        '#2a3a5c',
    colorText:          '#e0e6f0',
    colorTextSecondary: '#8899bb',
    colorBgElevated:    '#253350',
    colorFillAlter:     '#253350',
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: isDark ? darkTokens : lightTokens,
        components: {
          Layout: {
            siderBg: isDark ? '#1e2a45' : '#ffffff',
            bodyBg:  isDark ? '#1a2035' : '#f5f6fa',
          },
          Menu:   { itemBorderRadius: 8, itemMarginInline: 8 },
          Card:   { borderRadius: 12 },
          Button: { borderRadius: 8  },
          Table:  { borderRadius: 12 },
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <ThemedApp {...props} />
    </ThemeProvider>
  );
}
