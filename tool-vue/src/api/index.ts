import { get, post } from '../lib/axios';

// 获取实时数据
export function getFlowData(params: any) {
    return get('/api/dou/flow/data', params);
}

// 获取之前时间段的数据
export function getCompareData(params: any) {
    return get('/api/dou/flow/compare', params);
}

// 获取表格数据
export function getSourceData(params: any) {
    return get('/api/dou/flow/source', params);
}

// 获取漏斗数据
export function getFunnelData(params: any) {
    return get('/api/dou/flow/funnel', params);
}
