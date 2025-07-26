import { WebStorage } from 'redux-persist/es/types';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const storage: WebStorage = typeof window !== 'undefined'
  ? createWebStorage('local') // 使用浏览器的 localStorage
  : {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };

export default storage;