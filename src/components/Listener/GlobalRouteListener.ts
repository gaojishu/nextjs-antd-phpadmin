'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTabItem, setCurrentKey1, setCurrentKey2 } from '@/store/reducers/TabPageSlice';



export function GlobalRouteListener() {

    const pathname = usePathname();
    const dispatch = useDispatch();

    const permission = useSelector(() => store.getState().authPermission.permission ?? []);

    const permissionRef = useRef(permission);

    useEffect(() => {
        permissionRef.current = permission;
    }, [permission]);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            // 忽略首次渲染（页面加载）
            return;
        }

        const currentPermission = permission.find(item => item.path === pathname);

        const key = currentPermission && currentPermission.key.split('-') || [];

        if (currentPermission) {
            // 更新一级菜单选中状态
            dispatch(setCurrentKey1(key[0]));

            // 更新二级菜单选中状态
            dispatch(setCurrentKey2([key[0], currentPermission.key]));

            // 添加或更新对应标签页
            dispatch(addTabItem(
                {
                    key: pathname,
                    label: currentPermission?.name,
                    currentKey2: [key[0], currentPermission.key],
                    currentKey1: key[0],
                }
            ));
        }

        console.log('监听路由变化：', pathname);

    }, [pathname, permission]);

    return null; // 不渲染任何内容
}

