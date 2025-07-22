import storage from '@/store/persistStorage';

export const PersistConfig = {
    key: 'root',
    storage,
    whitelist: ['authLoginState', 'authInfoState'],  // 需要持久化的reducer
    blacklist: ['tmp'] // 不需要持久化的reducer
};

