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
import RuntimeLayout from "./RuntimeLayout";

export default ({ children }: React.PropsWithChildren) => {
    useEffect(() => {
        async function init() {

            await authLogin({ username: 'admin', password: 'admin', captchaCode: '1234' });

        }

        async function getUserInfo() {
            const res = await authInfo();
            console.log(res);
        }

        getUserInfo();
        init();
    }, []);

    return (
        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <Layout className='w-screen h-screen'>
                    <RuntimeLayout />
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