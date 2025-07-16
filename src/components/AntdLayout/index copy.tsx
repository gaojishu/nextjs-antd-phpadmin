'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { Tabs } from 'antd';

import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import TabPage from './TabPage';


export default ({ children }: React.PropsWithChildren) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className='h-screen w-screen flex flex-col bg-gray-100'>
                    <Header />
                    <div className='flex flex-1'>
                        <Aside />
                        <div className='flex-1 flex flex-col'>
                            {/* <TabPage></TabPage> */}
                            <div className='w-full flex-1 overflow-x-auto'>
                                <Tabs
                                    defaultActiveKey="1"
                                    style={{ height: 220 }}
                                    items={Array.from({ length: 30 }, (_, i) => {
                                        const id = String(i);
                                        return {
                                            label: `Tab-${id}`,
                                            key: id,
                                            disabled: i === 28,
                                            children: `Content of tab ${id}`,
                                        };
                                    })}
                                />
                            </div>
                            <main className='flex-1 p-2'>{children}</main>
                            <Footer />
                        </div>
                    </div>
                </div>
            </PersistGate>
        </Provider>
    )
}