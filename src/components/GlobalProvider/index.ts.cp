'use client'
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Ant Design 全局实例
let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

// Next.js 路由能力
let globalRouterInstance: ReturnType<typeof useRouter>;
let currentPathname: string;

// 用于外部监听路径变化
let onPathnameChangeCallback: ((path: string) => void) | null = null;

export const setOnPathnameChange = (callback: (path: string) => void) => {
    onPathnameChangeCallback = callback;
};

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    const staticFunction = App.useApp();
    const router = useRouter();
    const pathname = usePathname();

    // 设置 Ant Design 实例
    message = staticFunction.message;
    notification = staticFunction.notification;
    modal = staticFunction.modal;

    // 设置全局 router 实例
    globalRouterInstance = router;

    // 设置当前路径
    useEffect(() => {
        currentPathname = pathname;
        if (onPathnameChangeCallback) {
            onPathnameChangeCallback(pathname);
        }
    }, [pathname]);

    return children;
}

// 导出 Ant Design 实例
export { message, notification, modal };

// 导出路由工具
export const useRouterGlobal = () => {
    if (!globalRouterInstance) {
        console.warn('Router 未初始化，请确保 GlobalProvider 已渲染');
    }
    return globalRouterInstance;
};

export const getCurrentPathname = (): string => {
    return currentPathname;
};

export const navigateTo = (path: string) => {
    if (globalRouterInstance) {
        globalRouterInstance.push(path);
    } else {
        console.warn('Router 未初始化，跳转失败');
    }
};