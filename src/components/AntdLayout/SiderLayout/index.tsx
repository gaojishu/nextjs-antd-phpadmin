'use client';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import { store } from '@/store';
import { useSelector } from 'react-redux';
import AntdThemeConfig from '@/config/theme.config';
import { useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];
export default function SiderLayout() {
    const router = useRouter();

    const currentKey1 = useSelector(() => store.getState().tabPage.currentKey1);
    const currentKey2 = useSelector(() => store.getState().tabPage.currentKey2);
    const permission = useSelector(() => store.getState().authPermission.permission ?? []);
    const permissionMenuTree = useSelector(() => store.getState().authPermission.permissionTree ?? []);

    const [menuTree2, setMenuTree2] = useState<MenuItem[]>([]);
    const [menu1Index, setMenu1Index] = useState<number>(0);

    //一级菜单选中 设置对应的二级菜单
    useEffect(() => {
        const index = permissionMenuTree.findIndex(item => item?.key?.toString() === currentKey1?.toString());
        setMenu1Index(index);
        if (permissionMenuTree[index] && 'children' in permissionMenuTree[index] && permissionMenuTree[index].children) {
            setMenuTree2(permissionMenuTree[index].children);
        } else {
            setMenuTree2([]);
        }
    }, [currentKey1, permissionMenuTree]);


    /**
     * 切换一级菜单
     * @param index 
     */
    const handlerSwitchMenu1 = (index: number) => {

        if (permissionMenuTree[index] && 'children' in permissionMenuTree[index] && permissionMenuTree[index].children) {
            const menu2 = permissionMenuTree[index]?.children;
            setMenuTree2(menu2);

            const key = menu2[0]?.key ?? '';

            const permissionItem = permission.find(item => item.key.toString() === key.toString());

            router.push(permissionItem?.path || '');

        } else {
            setMenuTree2([]);
            router.push('/');
        }
    };

    /**
     * 切换二级菜单
     * @param key 
     */
    const handlerSwitchMenu2 = (key: string) => {
        const item = permission.find(item => item.key.toString() === key);
        if (item?.path) {
            router.push(item.path);
        }
    };

    return (
        <div className="flex min-h-full">
            {/* 左侧导航栏 */}
            <div className={`min-h-full w-17 bg-[#001529] text-white cursor-pointer relative`}>
                {/* 高亮条 */}
                <div
                    className={`absolute left-0 top-0 h-[60px] w-full  transition duration-800 ease-in-out pointer-events-none z-0`}
                    style={
                        menu1Index >= 0 ? {
                            backgroundColor: AntdThemeConfig?.token?.colorPrimary,
                            transform: `translateY(${menu1Index * 60}px)`,
                        } : {}
                    }
                />

                {/* 菜单项 */}
                {permissionMenuTree.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handlerSwitchMenu1(index)}
                        className="relative z-10 h-[60px] flex items-center justify-center text-center hover:bg-gray-500 shadow-md transition duration-300"
                    >
                        {item && 'label' in item && item.label}
                    </div>
                ))}
            </div>

            {/* 右侧 Ant Design 菜单 */}
            <div className="min-h-full bg-white flex-1">
                <Menu mode="inline"
                    defaultSelectedKeys={currentKey2}
                    defaultOpenKeys={currentKey2}
                    selectedKeys={currentKey2}
                    onSelect={(key) => {
                        console.log(key, 'onselect');
                    }}
                    theme="light"
                    items={menuTree2}
                    onClick={({ key }) => handlerSwitchMenu2(key)}
                />
            </div>
        </div>
    );
};

