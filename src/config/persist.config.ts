import storage from '@/store/persistStorage';

export const PersistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'setting'],  // 需要持久化的reducer
    blacklist: ['tmp'] // 不需要持久化的reducer
};

