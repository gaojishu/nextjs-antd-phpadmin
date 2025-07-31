import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App } from 'antd';
import AntdThemeConfig from "@/config/theme.config";
import GlobalProvider from '@/components/GlobalProvider';
import locale from 'antd/locale/zh_CN';

import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xkl",
  description: "xkl antd",
};

export default function RootLayout({
  children
}: React.PropsWithChildren) {
  console.log('RootLayout 只运行一次');
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ConfigProvider theme={AntdThemeConfig} locale={locale}>
            <App message={{ maxCount: 1, duration: 3 }}>
              <GlobalProvider />
              <AntdRegistry>
                {children}
              </AntdRegistry>
            </App>
          </ConfigProvider>

        </ReduxProvider>


      </body>
    </html>
  );
}
