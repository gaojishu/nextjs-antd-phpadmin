import defaultMenuConfig from '@/config/defaultMenu.config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

export type TabItem = {
    key: string;
    label: ReactNode;
    closable?: boolean;
    time?: number;
};

interface TabPageState {
    currentKey2: string[];
    currentKey1: number;
    tabItems: TabItem[];
}
const initialState: TabPageState = {
    currentKey1: -1,
    currentKey2: [defaultMenuConfig.id.toString()],
    tabItems: [{
        key: defaultMenuConfig.path?.toString() || '',
        label: defaultMenuConfig.name,
        closable: false,
        time: dayjs().valueOf()
    }]
};

const TabPageSlice = createSlice({
    name: 'tabPageSlice',
    initialState,
    reducers: {
        clearMenuItems() {
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

        removeTabItem(state, action: PayloadAction<string>) {
            const index = state.tabItems.findIndex(item => item.key === action.payload);
            if (index !== -1) {
                state.tabItems.splice(index, 1);
            }
        },
    }
});

// 导出 actions 和 reducer
export const { addTabItem, removeTabItem, clearMenuItems, setCurrentKey2, setCurrentKey1 } = TabPageSlice.actions;
export default TabPageSlice.reducer;