'use client'
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ApiResponse } from '@/types';
import { message as antdMessage, usePathnameGlobal, useRouterGlobal } from '@/components/GlobalProvider';
import { store } from '@/store';

NProgress.configure({ showSpinner: false });

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(config => {

    NProgress.start();

    config.withCredentials = true;
    const auth = store.getState().authLoginState;
    if (auth.token) {
        config.headers[auth.header] = `${auth.prefix} ${auth.token}`;
    }
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.withCredentials = true;
    return config;
}, error => {
    antdMessage.error('err');

    NProgress.done();
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        NProgress.done();
        const { message } = response?.data ?? {};
        if (message) {
            // 可选：统一提示
            antdMessage.success(message);
        }

        return response;
    },
    (error) => {
        NProgress.done();

        const status = error?.response?.status;
        const message = error?.response?.data?.message || error.message;

        antdMessage.error(message);

        if (status === 401) {
            useRouterGlobal.push(`/login?redirect=${usePathnameGlobal}`);
        }

        const reason: ApiResponse = {
            code: status,
            httpStatus: status,
            message: message,
            data: null,
            reqId: '',
            success: false
        };

        return Promise.reject(reason);
    }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type request = { url: string, params?: any, data?: any, config?: AxiosRequestConfig }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'GET',
        url: request.url,
        params: request.params,
        ...request.config,
    }).then(res => res);

    return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'POST',
        url: request.url,
        params: request.params,
        data: request.data,
        ...request.config
    }).then(res => res);

    return res.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const put = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'PUT',
        url: request.url,
        params: request.params,
        data: request.data,
        ...request.config
    }).then(res => res);
    return res.data;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const del = async <T = any>(request: request) => {
    const res = await instance.request<T>({
        method: 'DELETE',
        url: request.url,
        params: request.params,
        ...request.config
    }).then(res => res);
    return res.data;
}


// const download = async (request: request) => {
//     // 解析 URL
//     const url = new URL(request.url);

//     // 获取路径中的文件名（带扩展名）
//     const filename = basename(url.pathname) || 'download';
//     const writer = fs.createWriteStream(filename);

//     const res = await instance.request({
//         method: 'GET',
//         url: request.url,
//         params: request.params,
//         ...request.config,
//         responseType: 'blob'
//     });
//     // 将响应流写入文件
//     res.data.pipe(writer);

//     // 5. 返回 Promise 等待写入完成
//     return new Promise<void>((resolve, reject) => {
//         writer.on('finish', () => {
//             console.log(`文件下载完成: ${filename}`);
//             resolve();
//         });

//         writer.on('error', (err) => {
//             console.error(`写入文件失败: ${filename}`, err);
//             reject(err);
//         });
//     });
// }


const http = {
    get,
    post,
    put,
    del,
};

export default http;