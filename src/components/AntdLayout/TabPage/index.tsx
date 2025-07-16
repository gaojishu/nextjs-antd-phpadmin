'use client'

import { Space, Tabs } from "antd";

export default () => {

    const items = Array.from({ length: 30 }, (_, i) => {
        const id = String(i);
        return {
            label: `Tab-${id}`,
            key: id,
        };
    });

    return (
        <div className="w-full px-2 pt-2 bg-white">
            <Tabs
                type="editable-card"
                hideAdd={true}
                size="small"
                items={items}
                tabBarGutter={5}
                style={{ maxWidth: '100%' }} // 强制 Tabs 不超过其父容器的宽度
            />
        </div>
    );
}