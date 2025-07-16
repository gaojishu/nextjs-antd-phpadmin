// persistConfig.ts

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const PersistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'settings'],  // 需要持久化的reducer
    blacklist: ['tmp'] // 不需要持久化的reducer
};

