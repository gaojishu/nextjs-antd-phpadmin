'use client'
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { useRouter, usePathname } from 'next/navigation';

//antd组件
let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

// nextjs组件
let useRouterGlobal: ReturnType<typeof useRouter>;;
let usePathnameGlobal: string;

export default function GlobalProvider() {
    const staticFunction = App.useApp();
    // eslint-disable-next-line react-hooks/globals
    message = staticFunction.message;
    // eslint-disable-next-line react-hooks/globals
    modal = staticFunction.modal;
    // eslint-disable-next-line react-hooks/globals
    notification = staticFunction.notification;
    // eslint-disable-next-line react-hooks/globals
    useRouterGlobal = useRouter();
    // eslint-disable-next-line react-hooks/globals
    usePathnameGlobal = usePathname();

    return null;
};

export { message, notification, modal, useRouterGlobal, usePathnameGlobal };