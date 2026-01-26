import defaultMenuConfig from '@/config/defaultMenu.config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

export type TabItem = {
    key: string;
    label: ReactNode;
    closable?: boolean;
    time?: number;
    currentKey2: string[];
    currentKey1: number;
};

interface TabPageState {
    routePath: string;
    currentKey2: string[];
    currentKey1: number;
    tabItems: TabItem[];
}

export interface TabPageRootState {
    tabPage: TabPageState;
}

const initialState: TabPageState = {
    routePath: '/',
    currentKey1: Number(defaultMenuConfig.id),
    currentKey2: [defaultMenuConfig.id.toString()],
    tabItems: [{
        key: defaultMenuConfig.path?.toString() || '',
        label: defaultMenuConfig.name,
        closable: false,
        currentKey2: [defaultMenuConfig.id.toString()],
        currentKey1: Number(defaultMenuConfig.id),
        time: dayjs().valueOf()
    }]
};


const TabPageSlice = createSlice({
    name: 'tabPageSlice',
    initialState,
    reducers: {
        clearTabItems() {
            return initialState;
        },

        // 添加一个 MenuItem
        addTabItem(state, action: PayloadAction<TabItem>) {
            //const exists = state?.tabItems?.some(item => item.key === action.payload.key);
            const item = state.tabItems?.find(item => item.key === action.payload.key);
            if (item) {
                //更新time
                item.time = dayjs().valueOf();
            } else {
                state.tabItems?.push({
                    ...action.payload,
                    time: dayjs().valueOf(),
                });
            }
        },

        setCurrentKey1(state, action: PayloadAction<number>) {
            return {
                ...state,
                currentKey1: action.payload
            };
        },

        setCurrentKey2(state, action: PayloadAction<string[]>) {
            return {
                ...state,
                currentKey2: action.payload
            };
        },

        setRoutePath(state, action: PayloadAction<string>) {
            return {
                ...state,
                routePath: action.payload
            };
        },

        removeTabItem(state, action: PayloadAction<string>) {
            const index = state.tabItems.findIndex(item => item.key === action.payload);
            if (index !== -1) {
                state.tabItems.splice(index, 1);
            }
        },
        removeTabItemOther(state, action: PayloadAction<string>) {
            //如何保留 initialState
            // state.tabItems = state.tabItems.filter(item => item.key === action.payload);
            const target = state.tabItems.find(item => item.key === action.payload);
            const homeItem = state.tabItems.find(item => item.key === initialState.tabItems[0].key);

            if (target) {
                // 如果目标就是首页，只保留一个
                if (target.key === homeItem?.key) {
                    state.tabItems = [homeItem];
                } else {
                    // 否则保留首页 + 目标页
                    state.tabItems = [homeItem!, target];
                }
            }
        },
    }
});

// 导出 actions 和 reducer
export const { addTabItem, setRoutePath, removeTabItem, removeTabItemOther, clearTabItems, setCurrentKey2, setCurrentKey1 } = TabPageSlice.actions;
export default TabPageSlice.reducer;