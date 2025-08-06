'use client';
import { buildMenuTree } from '@/services/auth/authService';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import { store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTabItem, setCurrentKey2 } from '@/store/reducers/TabPageSlice';
import { useRouter, usePathname } from 'next/navigation';
import AntdThemeConfig from '@/config/theme.config';

type MenuItem = Required<MenuProps>['items'][number];
export default function SiderLayout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const currentKey2 = useSelector(() => store.getState().tabPageState.currentKey2);
    const permission = useSelector(() => store.getState().authPermissionState.permission ?? []);

    const [menuTreeAll, setMenuTreeAll] = useState<MenuItem[]>([]);

    const [menuTree2, setMenuTree2] = useState<MenuItem[]>([]);
    const [cur, setCur] = useState<number>(0);

    // permission 权限列表更新监听
    useEffect(() => {
        const menuTree = buildMenuTree(permission);
        setMenuTreeAll(menuTree);
    }, [permission]); // ✅ 设置依赖项


    //路由更新监听  维护页面标签
    useEffect(() => {
        //切换当前选中菜单项
        const menu1Key = currentKey2[0] ?? '0';
        const index = menuTreeAll.findIndex(item => item?.key === menu1Key);
        setCur(Math.max(0, index));

        // 当前路由对应的菜单项
        const item = permission.find(item => item.path === pathname);

        // 设置当前选中的菜单项和标签页
        dispatch(setCurrentKey2(item?.key.split('-') ?? []));

        // 添加标签页
        if (item && item?.path !== '/') {
            dispatch(addTabItem({
                label: item.name,
                key: item.path || '',
            }));
        }
    }, [pathname, permission]);


    //一级菜单选中 设置对应的二级菜单
    useEffect(() => {
        if (menuTreeAll[cur] && 'children' in menuTreeAll[cur] && menuTreeAll[cur].children) {
            setMenuTree2(menuTreeAll[cur].children);
        } else {
            setMenuTree2([]);
        }
    }, [cur, menuTreeAll]);

    //一级菜单选中 路由到对应的菜单
    useEffect(() => {
        if (menuTreeAll[cur]?.key !== undefined && currentKey2.includes(String(menuTreeAll[cur].key))) {
            return;
        }
        menuTree2.some((item) => {
            const defaultMenu = permission.find((permissionItem) => {
                return permissionItem.id.toString() === item?.key && permissionItem.path;
            });

            if (defaultMenu?.path) {
                router.push(defaultMenu.path.toString());
                return true;
            }
            return false;
        });
    }, [menuTree2]);


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
                    className={`absolute left-0 top-0 h-[60px] w-full  transition duration-800 ease-in-out pointer-events-none z-0`}
                    style={{
                        backgroundColor: AntdThemeConfig?.token?.colorPrimary,
                        transform: `translateY(${cur * 60}px)`,
                    }}
                />

                {/* 菜单项 */}
                {menuTreeAll.map((item, index) => (
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
                    items={menuTree2}
                    onClick={({ key }) => handlerSwitchMenu2(key)}
                />
            </div>
        </div>
    );
};

