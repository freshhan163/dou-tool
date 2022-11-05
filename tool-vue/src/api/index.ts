import { get, post } from '../lib/axios';

// 获取实时数据
export function getFlowData(params) {
    return get('/api/dou/flow/data', params);
}

// 获取之前时间段的数据
export function getCompareData(params) {
    return get('/api/dou/flow/compare', params);
}
