import { Context } from 'koa';
import { format } from 'date-fns';

export function getErrorInfo(e: any, resultCode: number, context: Context) {
    console.log(`接口${context.url}报错 e = `, e);
    const isDebug = context.cookies.get('debug') === 'true';

    return {
        result: resultCode,
        err_msg: e?.message || (typeof e === 'string' ? e : '服务器错误'),
        err_stack: isDebug ? e.stack || '' : ''
    };
}

export function validateField(value: any, valueField: string) {
    if (value === undefined || value === null) {
        throw new Error(`${valueField}字段不存在`);
    }
}

interface Attributes {
    httpOnly?: boolean;
    domain?: string;
    maxAge?: number;
    overwrite?: boolean;
}

export function setCookie(context: Context, key: string, value: string, attributes: Attributes = {}) {
    context.cookies.set(key, value, Object.assign({
        httpOnly: true,
        domain: context.hostname.split('.').slice(-3).join('.'),
        // 大概一年
        maxAge: 31536000000,
        ...attributes
    }));
}

// 参数编码，针对时间进行特殊处理
export function encodeParams(params: any) {
    let str = '?';
    for (const key in params) {
        let val = params[`${key}`];
        // 获取今日的时间
        if (key === 'begin_date' || key === 'end_date') {
            const currentDate = format(new Date(), 'yyyy/MM/dd');
            val = `${encodeURIComponent(currentDate)}+00:00:00`;
        }
        str += `${key}=${val}&`;
    }
    return str.slice(0, -1);
}

// API域名
export const PrefixHost = 'compass.jinritemai.com';
// API网址
export const PrefixUrl = `https://${PrefixHost}`;
