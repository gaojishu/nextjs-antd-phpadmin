'use client'
import React, { useEffect } from 'react';

import { Layout, Tabs, Watermark } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import SiderLayout from './SiderLayout';
import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import TabPage from './TabPage';
import { authInfo, authLogin } from '@/services';
import RuntimeLayout from './RuntimeLayout';

export default ({ children }: React.PropsWithChildren) => {
    useEffect(() => {
        authInfo();
    }, []);

    return (
        <Layout className='w-screen h-screen'>
            {/* <RuntimeLayout /> */}
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