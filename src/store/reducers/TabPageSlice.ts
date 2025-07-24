import defaultMenuConfig from '@/config/defaultMenu.config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

type TabItem = {
    key: string;
    label: ReactNode;
    closable?: boolean;
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
        key: defaultMenuConfig.id.toString(),
        label: defaultMenuConfig.name,
        closable: false,
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
            const exists = state?.tabItems?.some(item => item.key === action.payload.key);
            if (!exists) {
                state.tabItems?.push(action.payload);
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