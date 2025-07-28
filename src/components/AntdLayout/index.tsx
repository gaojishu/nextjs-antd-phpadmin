'use client'
import React, { useEffect } from 'react';

import { Layout, Watermark } from 'antd';
const { Footer, Sider, Content } = Layout;

import SiderLayout from './SiderLayout';
import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import TabPage from './TabPage';
import { authInfo, authPermission, commonEnums } from '@/services';
export default function AntdLayout({ children }: React.PropsWithChildren) {
    useEffect(() => {
        authInfo();
        authPermission();
        commonEnums();
    }, []);

    return (
        <Layout className='w-screen h-screen'>
            <HeaderLayout />
            <Layout>
                <Sider className='h-full' width={'auto'}>
                    <SiderLayout />
                </Sider>
                <Layout>

                    <Content>
                        <TabPage />
                        <main className='p-2'>
                            <Watermark content="xkl">
                                {children}
                            </Watermark>
                        </main>
                    </Content>
                    <Footer>
                        <FooterLayout />
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    )
}