'use client'
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
// @ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ApiResponse } from '@/types';
import { message as antdMessage } from '@/components/GlobalProvider';


NProgress.configure({ showSpinner: false });

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

// 请求拦截器
instance.interceptors.request.use(config => {

    NProgress.start();

    config.withCredentials = true;
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
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
        return response.data;
    },
    (error) => {
        NProgress.done();

        const status = error?.response?.status;
        const message = error?.response?.data?.message || error.message;

        antdMessage.error(message);

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

type request = { url: string, params?: any, data?: any, config?: AxiosRequestConfig }

const get = async <T = any>(request: request) => {
    try {
        const { data } = await instance.request<ApiResponse<T>>({
            method: 'GET',
            url: request.url,
            params: request.params,
            ...request.config,
        });

        return data;
    } catch (error) {
        return error;
    }
};

const post = async <T = any>(request: request) => {
    try {
        const { data } = await instance.request<ApiResponse<T>>({
            method: 'POST',
            url: request.url,
            params: request.params,
            data: request.data,
            ...request.config
        });
        return data;
    } catch (error) {
        return error;
    }
}

const put = async <T = any>(request: request) => {
    try {
        const { data } = await instance.request<ApiResponse<T>>({
            method: 'PUT',
            url: request.url,
            params: request.params,
            data: request.data,
            ...request.config
        });
        return data;
    } catch (error) {
        return error;
    }
}


const del = async <T = any>(request: request) => {
    try {
        const { data } = await instance.request<ApiResponse<T>>({
            method: 'DELETE',
            url: request.url,
            params: request.params,
            ...request.config
        });
        return data;
    } catch (error) {
        return error;
    }
}


const http = {
    get,
    post,
    put,
    del
};

export default http;