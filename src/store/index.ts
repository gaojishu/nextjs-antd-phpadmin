import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
// 假设 PersistConfig 已经被正确配置
import { PersistConfig } from '@/config/persist.config';
import AuthLoginReducer from './reducers/AuthLoginSlice';
import AuthInfoReducer from './reducers/AuthInfoSlice';
import AuthPermissionReducer from './reducers/AuthPermissionSlice';
import TabPageReducer from './reducers/TabPageSlice';
import CommonEnumsReducer from './reducers/CommonEnumsSlice';


// 不需要为 rootReducer 添加类型注解
const rootReducer = combineReducers({
    authLoginState: AuthLoginReducer,
    authInfoState: AuthInfoReducer,
    authPermissionState: AuthPermissionReducer,
    tabPageState: TabPageReducer,
    commonEnumsState: CommonEnumsReducer,
});
// 推断 RootState 类型
export type RootState = ReturnType<typeof rootReducer>;
// 确保 PersistConfig 是一个有效的配置对象
const persistedReducer = persistReducer(PersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // 忽略序列化检查
    }),
});

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;