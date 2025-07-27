import type { ThemeConfig } from 'antd';

const AntdThemeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#1677ff',
  },
  components: {
    Tabs: {
      horizontalMargin: '0'
    },
    Layout: {
      siderBg: '#f5f5f5',
      headerBg: '#f5f5f5'
    }
  },
};

export default AntdThemeConfig;