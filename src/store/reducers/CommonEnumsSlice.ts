import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CommonEnums } from '@/types';


const initialState: CommonEnums = {
    permissionType: [],
};

const CommonEnumsSlice = createSlice({
    name: 'commonEnumsState',
    initialState,
    reducers: {
        commonEnumsStateUpdate(state, action: PayloadAction<Partial<CommonEnums>>) {
            return {
                ...state,
                ...action.payload
            };
        },
        commonEnumsStateRemove() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { commonEnumsStateUpdate, commonEnumsStateRemove } = CommonEnumsSlice.actions;
export default CommonEnumsSlice.reducer;