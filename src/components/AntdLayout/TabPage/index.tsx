'use client'

import { useRouter } from 'next/navigation';
import { Tabs } from "antd";
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useDispatch } from 'react-redux';
import { removeTabItem } from '@/store/reducers/TabPageSlice';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const currentKey2 = useSelector(() => store.getState().tabPageState.currentKey2);
    const tabsItems = useSelector(() => store.getState().tabPageState.tabItems);

    const handlerRemove = (targetKey: TargetKey) => {
        //setTabsItems(prevItems => prevItems.filter(item => item.key !== targetKey));

        dispatch(removeTabItem(targetKey.toString()));
        if (currentKey2.includes(targetKey.toString())) {
            router.back();
        }
    };

    const handlerSwitchTab = (targetKey: TargetKey) => {
        const permission = store.getState().authPermissionState.permission ?? [];

        const item = permission.find(item => item.id.toString() === targetKey);

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
                onTabClick={(key: string) => handlerSwitchTab(key)}
                onEdit={(targetKey) => handlerRemove(targetKey)}
            />
        </div>
    );
}