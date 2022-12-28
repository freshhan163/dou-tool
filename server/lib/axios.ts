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

// 生成通用的headers
export const generateCommonHeaders = (args: {
    product_id: string | number,
    tabType?: number,
}) => {
    return {
        'authority': 'compass.jinritemai.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'cookie': 'SHOP_ID=54820011; PIGEON_CID=7129657361257946662; MONITOR_WEB_ID=6f4ac81e-de8e-415c-aaba-63962644dbcb; passport_csrf_token=3cee623584fc8ac7cb520bb9c0194ede; passport_csrf_token_default=3cee623584fc8ac7cb520bb9c0194ede; qc_tt_tag=0; Hm_lvt_ed0a6497a1fdcdb3cdca291a7692408d=1665664012,1666759844; Hm_lvt_729f63f2a2cf56cd38fff0220c787b4a=1665664012,1666759844; _tea_utm_cache_4031=undefined; _tea_utm_cache_4499=undefined; x-jupiter-uuid=16670421128099918; csrf_session_id=850746c75ad493c2e87bbfaf97d9fb88; ttwid=1%7CJ5NF6vzh2qE17ndeWrsJ1H6RF1Vv1yIe5CILyGE9Yyg%7C1667042207%7C57da88433ce02ecf5b275703e7dfbda157c8da0dabda41fec2610d3b8503e361; n_mh=-07pB7K7kGEY65o6-x9WIghQfhf3Iv50JU8_a7g8OMY; sso_uid_tt=5ddeaa43b613aff3680a2eb34beba9f6; sso_uid_tt_ss=5ddeaa43b613aff3680a2eb34beba9f6; toutiao_sso_user=de0ad96f21b6b1d98f9db15e62fea022; toutiao_sso_user_ss=de0ad96f21b6b1d98f9db15e62fea022; sid_ucp_sso_v1=1.0.0-KGYyNTc1ZmQwNTdhMDI1ZTk5N2Y1Mzk0MmVmNGI3ZGIzODg2NjgzM2QKHwie3JD0y43WBBCll_SaBhiwISAMMO3Sr44GOAZA9AcaAmxmIiBkZTBhZDk2ZjIxYjZiMWQ5OGY5ZGIxNWU2MmZlYTAyMg; ssid_ucp_sso_v1=1.0.0-KGYyNTc1ZmQwNTdhMDI1ZTk5N2Y1Mzk0MmVmNGI3ZGIzODg2NjgzM2QKHwie3JD0y43WBBCll_SaBhiwISAMMO3Sr44GOAZA9AcaAmxmIiBkZTBhZDk2ZjIxYjZiMWQ5OGY5ZGIxNWU2MmZlYTAyMg; odin_tt=c9662ed8695f113456113a7e31e8dd48fd3f64d7b612a48ca400738f86077f8d0b90bea76587f27f030da9a08d83a32e458459557d87ebaaa0fe2d85c4ae1d58; passport_auth_status=5d6b9184ede470d48c537c37247839ff%2C5a6615661c0f8754e882e3569249bf06; passport_auth_status_ss=5d6b9184ede470d48c537c37247839ff%2C5a6615661c0f8754e882e3569249bf06; ucas_sso_c0=CkEKBTEuMC4wEJ6Ij4qi8cKuYxjmJiCU0vDayo2FByiwITCe3JD0y43WBECnl_SaBkiny7CdBlCmvJ2gh7Po-GJYbxIUbAxC7m2OLJ4sY6BDPY46INYv5Aw; ucas_sso_c0_ss=CkEKBTEuMC4wEJ6Ij4qi8cKuYxjmJiCU0vDayo2FByiwITCe3JD0y43WBECnl_SaBkiny7CdBlCmvJ2gh7Po-GJYbxIUbAxC7m2OLJ4sY6BDPY46INYv5Aw; ucas_c0=CkEKBTEuMC4wEKmIkpSF7sKuYxjmJiCU0vDayo2FByiwITCe3JD0y43WBECnl_SaBkiny7CdBlCmvJ2gh7Po-GJYbxIUeIP-KS7f8P2xg1e_1p_ijYPqNrg; ucas_c0_ss=CkEKBTEuMC4wEKmIkpSF7sKuYxjmJiCU0vDayo2FByiwITCe3JD0y43WBECnl_SaBkiny7CdBlCmvJ2gh7Po-GJYbxIUeIP-KS7f8P2xg1e_1p_ijYPqNrg; sid_guard=aac68866857b9ea2c179be434d556588%7C1667042215%7C5184000%7CWed%2C+28-Dec-2022+11%3A16%3A55+GMT; uid_tt=1693a4447605266448261f9f5497c007; uid_tt_ss=1693a4447605266448261f9f5497c007; sid_tt=aac68866857b9ea2c179be434d556588; sessionid=aac68866857b9ea2c179be434d556588; sessionid_ss=aac68866857b9ea2c179be434d556588; sid_ucp_v1=1.0.0-KDQzNzA3NGNjMDQ0MzQwZDczMGMxODk3MDg5MTA2YWQzZjAyOTEzOTAKFwie3JD0y43WBBCnl_SaBhiwITgGQPQHGgJscSIgYWFjNjg4NjY4NTdiOWVhMmMxNzliZTQzNGQ1NTY1ODg; ssid_ucp_v1=1.0.0-KDQzNzA3NGNjMDQ0MzQwZDczMGMxODk3MDg5MTA2YWQzZjAyOTEzOTAKFwie3JD0y43WBBCnl_SaBhiwITgGQPQHGgJscSIgYWFjNjg4NjY4NTdiOWVhMmMxNzliZTQzNGQ1NTY1ODg; PHPSESSID=ca8075de6ce954fcd101654c62ca7830; PHPSESSID_SS=ca8075de6ce954fcd101654c62ca7830; LUOPAN_DT=session_7160307208146731302; Hm_lvt_7afe580efa9cda86356bdea8077a83e7=1665664022,1667139434; Hm_lpvt_7afe580efa9cda86356bdea8077a83e7=1667142433; tt_scid=DcUyweOiiJ8yhtycfcGGWaDchhBL5W9J9Icxr.POIUueyZXspHkeBTYn.ta39YB4212d; msToken=PLiMurNqkaBDghBjvynBVwPoju9oXHATCp5qy4tiBIHr2Ix_JiCG-96czSWP41X5yGq_mobXmlWA88Iym1bbpDXfTl1DNBThfwRdyLFlt7Hi-m3IfY8qBg==; Hm_lpvt_729f63f2a2cf56cd38fff0220c787b4a=1667194972; Hm_lpvt_ed0a6497a1fdcdb3cdca291a7692408d=1667194972; msToken=FcGddp0z7gkctW3JNhYgTMWajwsSRgW0rE0Jgy_BWM4MgfF9UAU3e2vyB0dDMQMqa1a0cn_LQfTH_AyKimbjbTheyMtds1Bc__HZVOM65yvSyoFxP6Wp5w==',
        'pragma': 'no-cache',
        'referer': `https://compass.jinritemai.com/shop/merchandise-traffic-analysis?product_id=${args.product_id}&tab_type=${args?.tabType ?? 1}`,
        // source
        // 'referer': "https://compass.jinritemai.com/shop/merchandise-traffic-analysis?product_id=3568103047295009149&tab_type=21&tab_value=1671465600%2C1671984000&prepages%5B0%5D=%2Fshop%2Fmerchandise-traffic&btm_ppre=a6187.b1854.c0.d0&btm_pre=a6187.b7716.c0.d0&btm_show_id=64c8dba9-f4d9-41de-af4c-7bf78fa3caf8",
        // funnel
        // 'referer': 'https://compass.jinritemai.com/shop/merchandise-traffic-analysis?product_id=3568103047295009149&tab_type=1&begin_date=1667059200&prepages%5B0%5D=%2Fshop%2Ftraffic-analysis-product',
        'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
    };
};
