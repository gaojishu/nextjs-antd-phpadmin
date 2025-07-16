import type { ThemeConfig } from 'antd';

const AntdThemeConfig: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#52c41a',
  },
  components: {
    Tabs: {
      horizontalMargin: '0'
    },
  },
};

export default AntdThemeConfig;