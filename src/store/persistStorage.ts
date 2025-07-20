import { WebStorage } from 'redux-persist/es/types';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const storage: WebStorage = typeof window !== 'undefined'
  ? createWebStorage('local') // 使用浏览器的 localStorage
  : {
      getItem(_key: string) {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: string) {
        return Promise.resolve();
      },
    };

export default storage;