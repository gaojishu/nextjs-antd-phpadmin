'use client'

import { useRouterGlobal } from "@/components/GlobalProvider";
import { Button, Dropdown, Space, Tabs } from "antd";
import type { MenuProps } from 'antd';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function TabPage() {
    const items2: MenuProps['items'] = [
        {
            label: '关闭全部',
            key: 'closeAll',
        },
    ];

    const [tabsItems, setTabsItems] = useState([
        { label: '首页', key: '/', closable: false }
    ]);




    // 只在组件首次加载时添加一次额外的 Tab
    useEffect(() => {
        const items = Array.from({ length: 2 }, (_, i) => {
            const id = '/login?v='+Math.random().toString()

            return {
                label: `Tab-${i}`,
                key: id,
                closable: true,
            };
        })
        setTabsItems(prev => [...prev, ...items]);
    }, []); // 空依赖数组确保只执行一次

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'closeAll') {
            setTabsItems([])
        }
    };


    type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

    const remove = (targetKey: TargetKey) => {
        const newPanes = tabsItems.filter((pane) => pane.key !== targetKey);
        setTabsItems(newPanes);
    };

    return (
        <div className="w-full px-2 pt-2 bg-white">

            <Dropdown menu={{ items: items2, onClick: handleMenuClick }} trigger={['contextMenu']}>
                <Tabs
                    type="editable-card"
                    hideAdd={true}
                    size="small"
                    items={tabsItems}
                    tabBarGutter={5}
                    style={{ maxWidth: '100%' }} // 强制 Tabs 不超过其父容器的宽度
                    onTabClick={(key: string, e) => {
                        useRouterGlobal.push(key);
                    }}
                    onEdit={(targetKey, action) => {
                        remove(targetKey)
                    }}
                />
            </Dropdown>
        </div>
    );
}