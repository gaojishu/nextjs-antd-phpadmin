'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { Layout, Tabs } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// import Aside from './Aside';
// import Footer from './Footer';
// import Header from './Header';
// import TabPage from './TabPage';


export default ({ children }: React.PropsWithChildren) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout className='w-screen h-screen'>
                    <Header>Header</Header>
                    <Layout>
                        <Sider className='h-full'>
                            Sider
                        </Sider>
                        <Layout>
                            <Content>
                                <Tabs
                                    defaultActiveKey="1"
                                    items={Array.from({ length: 30 }, (_, i) => {
                                        const id = String(i);
                                        return {
                                            label: `Tab-${id}`,
                                            key: id,
                                        };
                                    })}
                                />
                                <main className='p-2'>{children}</main>
                            </Content>
                            <Footer></Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </PersistGate>
        </Provider>
    )
}