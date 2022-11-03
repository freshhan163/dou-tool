/*
 * @File axios.ts
 * @Desc: axios发送请求
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Response {
    result: number;
    error_msg?: string;
}

interface AxiosConfig extends AxiosRequestConfig {
    needProxy?: boolean; // 是否添加代理服务器
    headers: any;
}

const instance = axios.create({
    timeout: 10 * 1000,
    withCredentials: true
});

const requestHandler = ((config: any) => {
    const method = config.method || 'get';
    const contentType = method === 'get' ? 'application/json; charset=utf8' : 'application/x-www-form-urlencoded';
    config.headers[method]['Content-Type'] = config['content-type'] || contentType;
    return config;
});

instance.interceptors.request.use(requestHandler);

export {
    instance
};

export const get = <T>(url: string,
    params: object | string = {},
    config: AxiosConfig = { needProxy: false, headers: {} }
) => {
    return instance.get<T, Promise<T>>(url, { params, ...config });
};

export const post = <T>(
    url: string,
    params: any = {},
    config: AxiosConfig = { needProxy: false, headers: {} }
) => {
    return instance.post<T, Promise<T>>(url, params, config);
};
