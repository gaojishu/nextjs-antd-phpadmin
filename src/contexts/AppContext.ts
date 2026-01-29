import { createContext } from 'react';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface AppContextType {
    message: MessageInstance;
    notification: NotificationInstance;
    modal: Omit<ModalStaticFunctions, 'warn'>;
    router: AppRouterInstance;
    pathname: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default AppContext;