'use client';
import { buildMenuTree } from '@/services/auth/authService';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import { store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTabItem, setCurrentKey2 } from '@/store/reducers/TabPageSlice';
import { useRouter, usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];
export default function SiderLayout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const currentKey2 = useSelector(() => store.getState().tabPageState.currentKey2);
    const permission = useSelector(() => store.getState().authInfoState.permission ?? []);

    const [menuList, setMenuList] = useState<MenuItem[]>([]);

    const [curMenuItems, setCurMenuItems] = useState<MenuItem[]>([]);
    const [cur, setCur] = useState<number>(0);


    useEffect(() => {
        //切换当前选中菜单项
        const menu1Key = currentKey2[0] ?? '0';
        const index = menuList.findIndex(item => item?.key === menu1Key);
        setCur(index);

        // 当前路由对应的菜单项
        const item = permission.find(item => item.path === pathname);

        // 设置当前选中的菜单项和标签页
        dispatch(setCurrentKey2(item?.key.split('-') ?? []));

        // 添加标签页
        if (item) {
            dispatch(addTabItem({
                label: item.name,
                key: item.id.toString(),
            }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, permission]);

    // ✅ 用 useEffect 控制 curMenu 的更新
    useEffect(() => {
        const menuTree = buildMenuTree(permission);
        setMenuList(menuTree);

        if (menuTree[cur] && 'children' in menuTree[cur] && menuTree[cur].children) {
            setCurMenuItems(menuTree[cur].children);
        } else {
            setCurMenuItems([]);
        }

    }, [cur, permission]); // ✅ 设置依赖项

    /**
     * 切换一级菜单
     * @param index 
     */
    const handlerSwitchMenu1 = (index: number) => {
        setCur(index);
        if (permission[index].path) {
            router.push(permission[index].path);
        }
    };

    /**
     * 切换二级菜单
     * @param key 
     */
    const handlerSwitchMenu2 = (key: string) => {
        const item = permission.find(item => item.id.toString() === key);
        if (item?.path) {
            router.push(item.path);
        }
    };

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
                {menuList.map((item, index) => (
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
            <div className="h-full bg-white flex-1">
                <Menu mode="inline"
                    defaultSelectedKeys={currentKey2}
                    defaultOpenKeys={currentKey2}
                    selectedKeys={currentKey2}
                    onSelect={(key) => {
                        console.log(key, 'onselect');
                    }}
                    theme="light"
                    items={curMenuItems}
                    onClick={({ key }) => handlerSwitchMenu2(key)}
                />
            </div>
        </div>
    );
};

