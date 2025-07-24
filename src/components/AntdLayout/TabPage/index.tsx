'use client'

import { useRouter, usePathname } from 'next/navigation';
import { Button, Dropdown, Space, Tabs } from "antd";
import type { MenuProps } from 'antd';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useDispatch } from 'react-redux';
import { removeTabItem } from '@/store/reducers/TabPageSlice';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabPage() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const currentKey2 = useSelector(state => store.getState().tabPageState.currentKey2);
    const tabsItems = useSelector(state => store.getState().tabPageState.tabItems);

    const handlerRemove = (targetKey: TargetKey) => {
        //setTabsItems(prevItems => prevItems.filter(item => item.key !== targetKey));
        dispatch(removeTabItem(targetKey.toString()));
        router.back();
    };

    const handlerSwitchTab = (targetKey: TargetKey) => {
        const permission = store.getState().authInfoState.permission ?? [];
        console.log(targetKey, 'targetKey');
        const item = permission.find(item => item.id.toString() === targetKey);
        console.log(item, 'targetKey');
        // 切换标签页 跳转路由
        if (item?.path) {
            router.push(item.path);
        }
    };
    return (
        <div className="w-full px-2 pt-2 bg-white">
            <Tabs
                type="editable-card"
                activeKey={currentKey2[currentKey2.length - 1]}
                hideAdd={true}
                size="small"
                items={tabsItems}
                tabBarGutter={5}
                style={{ maxWidth: '100%' }}
                onTabClick={(key: string, e) => handlerSwitchTab(key)}
                onEdit={(targetKey, action) => handlerRemove(targetKey)}
            />
        </div>
    );
}