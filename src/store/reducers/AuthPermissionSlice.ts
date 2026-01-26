import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PermissionMenuTree, PermissionRecord } from '@/types';

type AuthPermissionType = {
    permission: PermissionRecord[];
    permissionCode: string[];
    permissionTree: PermissionMenuTree[];
}

export interface TabPageRootState {
    authPermissionState: AuthPermissionType;
}

const initialState: AuthPermissionType = {
    permission: [],
    permissionCode: [],
    permissionTree: []
};

const AuthPermissionSlice = createSlice({
    name: 'AuthPermissionState',
    initialState,
    reducers: {
        authPermissionStateUpdate(state, action: PayloadAction<Partial<AuthPermissionType>>) {
            // 使用immer的方式进行状态更新，而不是返回新对象
            Object.assign(state, action.payload);
        },

        authPermissionStateRemove() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { authPermissionStateUpdate, authPermissionStateRemove } = AuthPermissionSlice.actions;
export default AuthPermissionSlice.reducer;