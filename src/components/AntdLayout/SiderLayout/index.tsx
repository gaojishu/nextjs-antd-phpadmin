'use client';
import { useRouterGlobal } from '@/components/GlobalProvider';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { use, useState } from 'react';

export default function SiderLayout() {
    type MenuItem = Required<MenuProps>['items'][number];

    const menuItems: MenuItem[] = [
        {
            key: '/auth',
            label: 'Navigation One',
        },
        {
            key: '/login?v=123',
            label: 'Navigation Two',
        },
        {
            key: '1',
            label: 'Navigation Three',
            children: [
                { key: '4', label: 'Option 1' },
                { key: '5', label: 'Option 2' },
            ],
        },
    ];

    const sidebarLabels = ['首页', '项目', '设置', '用户', '帮助', '日志', '系统'];

    const [cur, setCur] = useState<number>(0);

    return (
        <div className="flex h-full">
            {/* 左侧导航栏 */}
            <div className={`h-full w-17 bg-[#001529] text-white cursor-pointer relative`}>
                {/* 高亮条 */}
                <div
                    className="absolute left-0 top-0 h-[60px] w-full bg-cyan-600 transition duration-800 ease-in-out pointer-events-none z-0"
                    style={{
                        transform: `translateY(${cur * 60}px)`,
                    }}
                />

                {/* 菜单项 */}
                {sidebarLabels.map((label, index) => (
                    <div
                        key={index}
                        onClick={() => setCur(index)}
                        className="relative z-10 h-[60px] flex items-center justify-center text-center hover:bg-gray-500 shadow-md transition duration-300"
                    >
                        {label}
                    </div>
                ))}
            </div>

            {/* 右侧 Ant Design 菜单 */}
            <div className="h-full bg-white flex-1">
                <Menu mode="inline" defaultSelectedKeys={['4']} defaultOpenKeys={['4', '1']} theme="light" items={menuItems} onClick={({ key }) => {
                    useRouterGlobal.push(key);

                }} >
                </Menu>
            </div>
        </div>
    );
};

