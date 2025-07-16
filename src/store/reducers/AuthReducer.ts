interface UserState {
    name: string | null; // 使用 null 或者 undefined 来允许未登录状态
    isLoggedIn: boolean;
}

const AuthReducer = (state: UserState = { name: '', isLoggedIn: false }, action: { type: string, payload?: string }): UserState => {
 
    switch (action.type) {
        case 'LOGIN':
            return { ...state, name: action.payload || '', isLoggedIn: true };
        case 'LOGOUT':
            return { name: '', isLoggedIn: false };
        default:
            return state;
    }
};


export default AuthReducer;
