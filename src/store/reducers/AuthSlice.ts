// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthLoginToken } from '@/types';

const initialState: AuthLoginToken = {
    header: '',
    expire: '',
    prefix: '',
    token: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * 登录：接受部分字段更新
         */
        login(state, action: PayloadAction<Partial<AuthLoginToken>>) {
            return {
                ...state,
                ...action.payload
            };
        },

        /**
         * 登出：重置为初始状态
         */
        logout() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;