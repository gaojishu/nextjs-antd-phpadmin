import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PermissionRecord } from '@/types';

type AuthPermissionType = {
    permission: PermissionRecord[];
    permissionCode: string[];
}

const initialState: AuthPermissionType = {
    permission: [],
    permissionCode: []
};

const AuthPermissionSlice = createSlice({
    name: 'AuthPermissionState',
    initialState,
    reducers: {
        authPermissionStateUpdate(state, action: PayloadAction<Partial<AuthPermissionType>>) {
            return {
                ...state,
                ...action.payload
            };
        },

        authPermissionStateRemove() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { authPermissionStateUpdate, authPermissionStateRemove } = AuthPermissionSlice.actions;
export default AuthPermissionSlice.reducer;