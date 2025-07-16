'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';

import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Tag from './Tag';


export default ({ children }: React.PropsWithChildren) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className='h-screen flex flex-col'>
                    <Header />
                    <div className='flex flex-1'>
                        <Aside />
                        <div className='flex-1 flex flex-col'>
                            <Tag />
                            <main className='flex-1 p-2'>{children}</main>
                            <Footer />
                        </div>
                    </div>
                </div>
            </PersistGate>
        </Provider>

    )
}