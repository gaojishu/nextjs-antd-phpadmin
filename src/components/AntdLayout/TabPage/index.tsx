'use client'

import { usePathname, useRouter } from 'next/navigation';
import { Dropdown, type MenuProps, Tabs } from "antd";
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useDispatch } from 'react-redux';
import { addTabItem, clearTabItems, removeTabItem, removeTabItemOther, setCurrentKey1, setCurrentKey2, setRoutePath, TabItem } from '@/store/reducers/TabPageSlice';
import { useEffect, useState } from 'react';
import path from 'path';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabPage() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const currentKey2 = useSelector(() => store.getState().tabPage.currentKey2);
    const tabsItems = useSelector(() => store.getState().tabPage.tabItems);
    const permissionMenuTree = useSelector(() => store.getState().authPermission.permissionTree ?? []);

    const [tmpKey, setTmpKey] = useState<string>('');
    const [tmpPath, setTmpPath] = useState<string>('');



    useEffect(() => {
        // const tmpItem = tabsItems.findIndex((item) => item.key === pathname);

        // const newestTabItem = tabsItems
        //     .filter(item => item.key !== tmpPath)
        //     .reduce((max, item) => {
        //         const maxTime = max?.time ?? 0;
        //         const itemTime = item?.time ?? 0;
        //         return itemTime > maxTime ? item : max;
        //     }, undefined as TabItem | undefined);

        // if (newestTabItem !== undefined && tmpItem < 0) {
        //     console.log('newestTabItem', newestTabItem);
        //     //router.push(newestTabItem.key);
        // }
    }, [tmpPath]);

    const items: MenuProps['items'] = [
        {
            label: '关闭当前',
            key: 'close',
        },
        {
            label: '关闭其它',
            key: 'closeOther',
        },
        {
            label: '关闭全部',
            key: 'closeAll',
        },
    ];

    const onClick: MenuProps['onClick'] = (info) => {

        switch (info.key) {
            case 'close':
                dispatch(removeTabItem(tmpKey));
                break;
            case 'closeOther':
                dispatch(removeTabItemOther(tmpKey));
                break;
            case 'closeAll':
                dispatch(clearTabItems());
                break;
        }

    };

    const tabsItemsCustom = tabsItems.map((item, index) => {
        {
            return {
                key: item.key,
                label: <Dropdown disabled={index == 0} onOpenChange={() => {
                    setTmpKey(item.key)
                }} menu={{ items, onClick }} trigger={['contextMenu']}>{item.label}</Dropdown>,
                closable: item.closable,
            };
        }
    });


    const handlerRemove = (targetKey: TargetKey | string) => {
        dispatch(removeTabItem(targetKey.toString()));

        const tabItem = routeLastTab(targetKey.toString());

        if (tabItem) {
            dispatch(setCurrentKey1(tabItem?.currentKey1));
            dispatch(setCurrentKey2(tabItem?.currentKey2));
            dispatch(setRoutePath(tabItem?.key));
        }
    };

    const routeLastTab = (key: string) => {
        //targetKey排除
        const newestTabItem = tabsItems
            .filter(item => item.key !== key)
            .reduce((max, item) => {
                const maxTime = max?.time ?? 0;
                const itemTime = item?.time ?? 0;
                return itemTime > maxTime ? item : max;
            }, undefined as TabItem | undefined);

        if (newestTabItem !== undefined) {
            return newestTabItem
        }
    };

    const handlerSwitchTab = (targetKey: TargetKey, event: string) => {
        if (event === 'click') {
            const item = tabsItems.find(item => item?.key?.toString() === targetKey);

            if (item) {
                dispatch(setCurrentKey1(item?.currentKey1));
                dispatch(setCurrentKey2(item?.currentKey2));
                dispatch(addTabItem({
                    label: item?.label,
                    key: item?.key || '',
                    currentKey1: item?.currentKey1,
                    currentKey2: item?.currentKey2,
                }));
                dispatch(setRoutePath(item?.key || ''));
            }
        }

    };

    return (
        <div className="w-full px-2 pt-2 bg-white">
            <Tabs
                type="editable-card"
                activeKey={pathname}
                hideAdd={true}
                size="small"
                items={tabsItemsCustom}
                tabBarGutter={5}
                style={{ maxWidth: '100%' }}
                onTabClick={(key: string) => handlerSwitchTab(key, 'click')}
                onEdit={(targetKey) => handlerRemove(targetKey)}
            />
        </div>
    );
}