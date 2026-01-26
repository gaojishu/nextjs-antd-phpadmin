import storage from '@/store/persistStorage';

export const PersistConfig = {
    key: 'root',
    storage,
    whitelist: ['authLoginState', 'tabPage', 'authInfoState', 'commonEnumsState'],  // 需要持久化的reducer
    blacklist: [] // 不需要持久化的reducer
};

