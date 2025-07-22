import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthLoginToken } from '@/types';

const initialState: AuthLoginToken = {
    header: '',
    expire: '',
    prefix: '',
    token: ''
};

const AuthLoginSlice = createSlice({
    name: 'authLoginState',
    initialState,
    reducers: {
        /**
         * 登录：接受部分字段更新
         */
        authLoginStateUpdate(state, action: PayloadAction<Partial<AuthLoginToken>>) {
            return {
                ...state,
                ...action.payload
            };
        },

        /**
         * 登出：重置为初始状态
         */
        authLoginStateRemove() {
            return initialState;
        }
    }
});

// 导出 actions 和 reducer
export const { authLoginStateUpdate, authLoginStateRemove } = AuthLoginSlice.actions;
export default AuthLoginSlice.reducer;