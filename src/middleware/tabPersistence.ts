import { useRouterGlobal } from '@/components/GlobalProvider';
import type { TabPageRootState } from '@/store/reducers/TabPageSlice';
import { Middleware, Dispatch, Action } from 'redux';

// 类型守卫函数
function isValidAction(action: unknown): action is Action<string> {
    return typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        typeof (action).type === 'string';
}

const tabPersistenceMiddleware: Middleware<unknown, TabPageRootState, Dispatch<Action>> = (store) => (next) => (action: unknown) => {
    const result = next(action);

    if (isValidAction(action) &&
        action.type.startsWith('tabPageSlice/')
    ) {

        switch (action.type) {
            case 'tabPageSlice/setRoutePath':
                useRouterGlobal.push(store.getState().tabPage.routePath);
                break;
            case 'tabPageSlice/removeTabItem':

                break;
            case 'tabPageSlice/setCurrentKey':

                break;
        }
    }

    return result;
};

export default tabPersistenceMiddleware;