'use client'

import { usePathname, useRouter } from 'next/navigation';
import { Tabs } from "antd";
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useDispatch } from 'react-redux';
import { removeTabItem, TabItem } from '@/store/reducers/TabPageSlice';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabPage() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const tabsItems = useSelector(() => store.getState().tabPageState.tabItems);

    const handlerRemove = (targetKey: TargetKey) => {
        dispatch(removeTabItem(targetKey.toString()));

        //targetKey排除
        const newestTabItem = tabsItems
            .filter(item => item.key !== targetKey.toString())
            .reduce((max, item) => {
                const maxTime = max?.time ?? 0;
                const itemTime = item?.time ?? 0;
                return itemTime > maxTime ? item : max;
            }, undefined as TabItem | undefined);
        if (newestTabItem !== undefined) {
            router.push(newestTabItem.key);
        }
    };

    const handlerSwitchTab = (targetKey: TargetKey) => {
        router.push(targetKey.toString());
    };

    return (
        <div className="w-full px-2 pt-2 bg-white">
            <Tabs
                type="editable-card"
                activeKey={pathname}
                hideAdd={true}
                size="small"
                items={tabsItems}
                tabBarGutter={5}
                style={{ maxWidth: '100%' }}
                onTabClick={(key: string) => handlerSwitchTab(key)}
                onEdit={(targetKey) => handlerRemove(targetKey)}
            />
        </div>
    );
}