'use client'
import { Menu, Space } from 'antd';
import type { MenuProps } from 'antd';

export default () => {
    type MenuItem = Required<MenuProps>['items'][number];
    let menu: MenuItem[] = [
        {
            key: '1',
            label: 'Navigation One',
        },
        {
            key: '2',
            label: 'Navigation Two',
        },
        {
            key: '3',
            label: 'Navigation Three',
            children: [
                { key: '4', label: 'Option 1' },
                { key: '5', label: 'Option 2' },
            ],
        },
    ];
    const menu1: MenuItem[] = [
        { key: '1', label: 'Option 1' },
        { key: '2', label: 'Option 2' },
        { key: '3', label: 'Option 3' },
    ];

    const menuClassName: string = 'h-15 leading-15 text-center hover:bg-cyan-600 mb-1';
    return (
        <div className='flex h-full'>
            <div className='h-full w-17 bg-[#001529] text-white cursor-pointer'>
                <div className={menuClassName + ' bg-cyan-600'}>首页</div>
                <div onClick={() => {
                    menu = []
                }} className={menuClassName}>首页</div>
                <div className={menuClassName}>首页</div>
                <div className={menuClassName}>首页</div>
                <div className={menuClassName}>首页</div>
                <div className={menuClassName}>首页</div>
                <div className={menuClassName}>首页</div>
            </div>
            <div className='h-full bg-[#fff]'>
                <Menu
                    mode="inline"
                    theme="light"
                    items={menu}
                />
            </div>
        </div>
    );
}