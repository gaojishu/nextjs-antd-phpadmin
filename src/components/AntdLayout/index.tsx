'use client'
import React, { useEffect } from 'react';

import { Affix, Layout, Watermark } from 'antd';
const { Sider, Content } = Layout;

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
        <Layout className='h-screen'>

            <Layout>
                <Affix >
                    <Sider className='min-h-full ' width={'auto'}>
                        <SiderLayout />
                    </Sider>
                </Affix>

                <Layout>
                    <Affix>
                        <div className='shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
                            <HeaderLayout />
                            <TabPage />
                        </div>
                    </Affix>

                    <Content>
                        <main className='p-2'>
                            <Watermark content="xkl">
                                {children}
                            </Watermark>
                        </main>
                    </Content>
                    <FooterLayout />
                </Layout>
            </Layout>
        </Layout >
    )
}