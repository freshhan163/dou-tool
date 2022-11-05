import axios from 'axios';

const instance = axios.create({
    timeout: 10 * 1000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

// const errorHandler = (error: Response) => {
//     throw error;
// };

// const requestHandler = (config: AxiosRequestConfig) => {
//     config.params = Object.assign(config.params || {}, joinParams());
//     return config;
// };

// const responseHandler = (response: AxiosResponse<Response>) => {
//     return new Promise((resolve, reject) => {
//         const body = response.data;
//         const config = response.config as AxiosConfig;
//         const mergedWhiteCodeList = WhiteCodeList.concat(config.whiteCodeList ?? []);
//         if(body!.result !== 1) {
//             reject(body);
//         } else {
//             resolve(body);
//         }
//     }).then(null, errorHandler);
// };

// instance.interceptors.request.use(requestHandler);
// @ts-ignore
// instance.interceptors.response.use(responseHandler);

export {
    instance
};

export const get = <T>(url: string, params?: object | string, config?: any) => {
    return instance.get<T, Promise<T>>(url, { params, ...config });
};

export const post = <T>(url: string, params?: any, config?: any) => {
    return instance.post<T, Promise<T>>(url, params, config);
};
