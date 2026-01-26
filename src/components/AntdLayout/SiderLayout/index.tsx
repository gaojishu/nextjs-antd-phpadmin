'use client';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import { store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTabItem, setRoutePath, setCurrentKey1, setCurrentKey2 } from '@/store/reducers/TabPageSlice';
import AntdThemeConfig from '@/config/theme.config';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];
export default function SiderLayout() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const currentKey1 = useSelector(() => store.getState().tabPage.currentKey1);
    const currentKey2 = useSelector(() => store.getState().tabPage.currentKey2);
    const permission = useSelector(() => store.getState().authPermission.permission ?? []);
    const permissionMenuTree = useSelector(() => store.getState().authPermission.permissionTree ?? []);

    const [menuTree2, setMenuTree2] = useState<MenuItem[]>([]);


    //一级菜单选中 设置对应的二级菜单
    useEffect(() => {
        if (permissionMenuTree[currentKey1] && 'children' in permissionMenuTree[currentKey1] && permissionMenuTree[currentKey1].children) {
            setMenuTree2(permissionMenuTree[currentKey1].children);
        } else {
            setMenuTree2([]);
        }
    }, [currentKey1, permissionMenuTree]);


    //路由更新监听  维护页面标签
    useEffect(() => {
        //切换当前选中菜单项
        // 当前路由对应的菜单项
        const permissionItem = permission.find(item => item.path === pathname);

        const key = permissionItem?.key.split('-') ?? [];

        const foundIndex = permissionMenuTree.findIndex(item => {
            return item && item.key?.toString() === key[0];
        });

        // 添加标签页
        if (permissionItem && permissionItem?.path !== '/') {
            dispatch(addTabItem({
                label: permissionItem.name,
                key: permissionItem.path || '',
                currentKey1: foundIndex,
                currentKey2: [foundIndex.toString(), permissionItem.key.toString()],
            }));
            dispatch(setCurrentKey1(foundIndex));
            // 设置当前选中的菜单项和标签页
            dispatch(setCurrentKey2([foundIndex.toString(), permissionItem.key.toString()]));

            dispatch(setRoutePath(permissionItem.path || ''));

        }
    }, [pathname, permission]);


    /**
     * 切换一级菜单
     * @param index 
     */
    const handlerSwitchMenu1 = (index: number) => {

        // 切换一级菜单时
        // 1.更新一级菜单的索引
        if (currentKey1 == index) {
            return;
        }

        dispatch(setCurrentKey1(index));

        let routerPath = permission[index]?.path ?? '';

        if (permissionMenuTree[index] && 'children' in permissionMenuTree[index] && permissionMenuTree[index].children) {
            const menu2 = permissionMenuTree[index].children;


            // 2.默认选中2级菜单
            const key = menu2[0]?.key ?? '';


            dispatch(setCurrentKey2([index.toString(), key.toString()]));

            //获取默认二级菜单路由
            permission.find(item => {
                if (item.key.toString() === key) {
                    routerPath = item.path ?? '';
                    dispatch(addTabItem({
                        label: item?.name,
                        key: item?.path || '',
                        currentKey1: index,
                        currentKey2: [currentKey1.toString(), key.toString()],
                    }));
                }
            });
        } else {
            setMenuTree2([]);
        }

        // 3.更新路由地址
        dispatch(setRoutePath(routerPath));

    };

    /**
     * 切换二级菜单
     * @param key 
     */
    const handlerSwitchMenu2 = (key: string) => {
        const item = permission.find(item => item.key.toString() === key);
        if (item?.path) {
            //1.添加标签，
            dispatch(addTabItem({
                label: item.name,
                key: item.path || '',
                currentKey1: currentKey1,
                currentKey2: [currentKey1.toString(), key.toString()],
            }));
            //2.更新当前选中的二级菜单
            dispatch(setCurrentKey2([currentKey1.toString(), key.toString()]));
            // 3.更新路由地址
            dispatch(setRoutePath(item.path || ''));
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
                        currentKey1 >= 0 ? {
                            backgroundColor: AntdThemeConfig?.token?.colorPrimary,
                            transform: `translateY(${currentKey1 * 60}px)`,
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

