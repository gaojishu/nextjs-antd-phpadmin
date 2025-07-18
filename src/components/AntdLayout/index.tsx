'use client'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { Layout, Tabs } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import SiderLayout from './SiderLayout';
import FooterLayout from './FooterLayout';
import HeaderLayout from './HeaderLayout';
import TabPage from './TabPage';
import { authInfo, authLogin } from '@/api/auth';
import RuntimeLayout from './RuntimeLayout';

export default function AntdLayout({ children }: React.PropsWithChildren) {

    return (
        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <RuntimeLayout />
                <Layout className='w-screen h-screen'>
                    <HeaderLayout />
                    <Layout>
                        <Sider className='h-full' width={'auto'}>
                            <SiderLayout />
                        </Sider>
                        <Layout>
                            <Content>
                                <TabPage />
                                <main className='p-2'>{children}</main>
                            </Content>
                            <Footer>
                                <FooterLayout />
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </PersistGate>
        </Provider>
    )
}