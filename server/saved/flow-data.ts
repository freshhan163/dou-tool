/**
 * @file flow-data.ts
 * @desc 实时数据（按s计算）
 */
import { Context } from 'koa';
import { SUCCESS_CODE, ERROR_RES_CODE } from '../config/errorCode';
import { getErrorInfo } from '../lib/util';
import { controllerDecorator, requestDecorator } from '../decorators/ControlDecorator';
import { get } from '../lib/axios';
import { DataRes, DataParams } from '../types/data';
import { encodeParams, PrefixUrl, PrefixHost } from '../lib/util';

@controllerDecorator({
    prefix: '/api/dou/flow'
})
export default class FlowDataController {
    constructor() {}

    @requestDecorator({
        path: '/data',
        type: 'get'
    })
    async getDataInfo(args: DataParams, ctx: Context): Promise<void> {
        try {
            if (!args.product_id) {
                throw new Error('缺少参数product_id');
            }
            args.product_id = 3568103047295009149;
            console.log('args = ', args);
            // 编译后的代码:
            const params = Object.assign({}, {
                date_type: 1,
                begin_date: '',
                end_date: '',
                is_activity: false,
                activity_id: '',
                product_id: '3568103047295009149',
                index_selected: 'product_show_ucnt,product_click_ucnt,pay_ucnt,product_add_to_cart_ucnt,product_wish_ucnt,product_click_show_ucnt_ratio,product_show_pay_ucnt_ratio,product_pay_click_ucnt_ratio,pay_amt,pay_cnt',
                _lid: 640881393182,
                msToken: 'TuBQ36GsM4XugWNfV_28McV5rdAMjpFj1ln-ZRH0XZXj8AJLDFLfMOQGLdOWsakdUaCCKwj9H0N-5oCX4WkHOz8v_vTyOEscPjt6Bg26yQfzc4LDect75rgqBtL1Yc8=',
                'X-Bogus': 'DFSzsdVL0yJANjwQS0s8zr7TlqCC',
            }, args);
            // _lid, msToken, X-Bogus
            const encodeStr = encodeParams(params);
            // console.log('encodeStr =', encodeStr);
            const res = await get<DataRes>(
                `${PrefixUrl}/compass_api/shop/product/product_detail/flow_data${encodeStr}`,
                {},
                {
                    headers: {
                        'authority': PrefixHost,
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        'cache-control': 'no-cache',
                        'cookie': 'SHOP_ID=54820011; PIGEON_CID=7129657361257946662; MONITOR_WEB_ID=6f4ac81e-de8e-415c-aaba-63962644dbcb; passport_csrf_token=3cee623584fc8ac7cb520bb9c0194ede; passport_csrf_token_default=3cee623584fc8ac7cb520bb9c0194ede; qc_tt_tag=0; Hm_lvt_ed0a6497a1fdcdb3cdca291a7692408d=1665664012,1666759844; Hm_lvt_729f63f2a2cf56cd38fff0220c787b4a=1665664012,1666759844; _tea_utm_cache_4031=undefined; _tea_utm_cache_4499=undefined; x-jupiter-uuid=16670421128099918; n_mh=-07pB7K7kGEY65o6-x9WIghQfhf3Iv50JU8_a7g8OMY; Hm_lvt_7afe580efa9cda86356bdea8077a83e7=1665664022,1667139434; sso_uid_tt=79a7070c38599c6753bd6878fec9b2f2; sso_uid_tt_ss=79a7070c38599c6753bd6878fec9b2f2; toutiao_sso_user=d21ce9dcad333822e5bb3a0bc5c35726; toutiao_sso_user_ss=d21ce9dcad333822e5bb3a0bc5c35726; sid_ucp_sso_v1=1.0.0-KDcxYWNkZjBiMjA0ZjAxYmU4YTJjY2ViNmQ3MTdkNzUzYTMwYWZlYTQKHwie3JD0y43WBBCxspebBhiwISAMMO3Sr44GOAZA9AcaAmxmIiBkMjFjZTlkY2FkMzMzODIyZTViYjNhMGJjNWMzNTcyNg; ssid_ucp_sso_v1=1.0.0-KDcxYWNkZjBiMjA0ZjAxYmU4YTJjY2ViNmQ3MTdkNzUzYTMwYWZlYTQKHwie3JD0y43WBBCxspebBhiwISAMMO3Sr44GOAZA9AcaAmxmIiBkMjFjZTlkY2FkMzMzODIyZTViYjNhMGJjNWMzNTcyNg; odin_tt=9695b2e4461b98cc3158ca03ad79632024fd0997099b5b6ede679570c442205307e40c1836335e737c558fe67c0185046b65b490676d58a445544c70baf2a9fd; passport_auth_status=b3208f99fb60e3a32b96849155d969ba%2C9219746d8d454d7e28156c2d958194e8; passport_auth_status_ss=b3208f99fb60e3a32b96849155d969ba%2C9219746d8d454d7e28156c2d958194e8; ucas_sso_c0=CkEKBTEuMC4wEKWIiPTspPayYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC3spebBki35tOdBlCmvJ2gh7Po-GJYbxIUwWQ6d8AIY5vGSbtjuNFa0j6qTDk; ucas_sso_c0_ss=CkEKBTEuMC4wEKWIiPTspPayYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC3spebBki35tOdBlCmvJ2gh7Po-GJYbxIUwWQ6d8AIY5vGSbtjuNFa0j6qTDk; ucas_c0=CkEKBTEuMC4wEKSIj9zGpPayYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC3spebBki35tOdBlCmvJ2gh7Po-GJYbxIU712ywARuqF7PBDHWJsW407Eqh_Q; ucas_c0_ss=CkEKBTEuMC4wEKSIj9zGpPayYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC3spebBki35tOdBlCmvJ2gh7Po-GJYbxIU712ywARuqF7PBDHWJsW407Eqh_Q; sid_guard=bf124405ca8078d7e9338cf4d076b744%7C1667619127%7C5184000%7CWed%2C+04-Jan-2023+03%3A32%3A07+GMT; uid_tt=a2adc9b641680b15609730190474ebab; uid_tt_ss=a2adc9b641680b15609730190474ebab; sid_tt=bf124405ca8078d7e9338cf4d076b744; sessionid=bf124405ca8078d7e9338cf4d076b744; sessionid_ss=bf124405ca8078d7e9338cf4d076b744; sid_ucp_v1=1.0.0-KDFiNTYzODEzYzIxOTVmZWVlOTBhMzNmYTY0OTNiMjE0NTg4YTM1NDgKFwie3JD0y43WBBC3spebBhiwITgGQPQHGgJsZiIgYmYxMjQ0MDVjYTgwNzhkN2U5MzM4Y2Y0ZDA3NmI3NDQ; ssid_ucp_v1=1.0.0-KDFiNTYzODEzYzIxOTVmZWVlOTBhMzNmYTY0OTNiMjE0NTg4YTM1NDgKFwie3JD0y43WBBC3spebBhiwITgGQPQHGgJsZiIgYmYxMjQ0MDVjYTgwNzhkN2U5MzM4Y2Y0ZDA3NmI3NDQ; PHPSESSID=ba508b2b422895bcc4eeb57a97d88e33; PHPSESSID_SS=ba508b2b422895bcc4eeb57a97d88e33; csrf_session_id=e270f905105d9824b2c66f091109664d; ttwid=1%7CJ5NF6vzh2qE17ndeWrsJ1H6RF1Vv1yIe5CILyGE9Yyg%7C1667619857%7C132c2f709572bf8391c867566c549629c8b766034468dbdaebbde6123c7fe28f; LUOPAN_DT=session_7162370172114796841; tt_scid=WWv.hJcW4eYtmBsGIwyIMKqdv0-ObfIs8Ekl0pYN3JRGuhc.nXphx6DgmEzc0xkz709f; msToken=-qunVCaK5G5wtKISUTzsnEuv7EuNAQDOqW4TNQhzWkHYvrS8tGMHqElQaLGq_IVRWT5EkftvVzEIdb2jkF_EfXi34RYFqeZGiSxM-5KNxaT4MEByAjx-vQ==; msToken=Dj5t-Fmg8Eix1M_htwDiuL2f8AUEKwKZ49d9YQZFtvihV6pTFptxEK4t0VbrVwNINIeNWjB6ApSmu2FoaJ4xvwTphb3sxzMcrdKf3gc3a42uDVRfWlXjCQ==',
                        'pragma': 'no-cache',
                        'referer': `${PrefixUrl}/shop/merchandise-traffic-analysis?product_id=${params.product_id}&tab_type=21&tab_value=1666972800%2C1667491200&prepages%5B0%5D=%2Fshop%2Fmerchandise-traffic`,
                        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"macOS"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
                    }
                }
            );
            console.log('res.list = ', res.data);
            let list = res.data.data?.index_list ?? [];

            // 接口请求失败
            if(list.length === 0) {
                ctx.body = {
                    result: ERROR_RES_CODE,
                    ...res.data
                };
                ctx.status = 500;
                return;
            }

            list = list.filter(item => {
                const temp = item.data_head.index;
                if (['product_add_to_cart_ucnt', 'product_wish_ucnt'].includes(temp.index_name)) {
                    return false;
                }
                // 处理百分比
                if (temp.change_value.value < 1 || temp.value?.value < 1){
                    // @ts-ignore
                    temp.value.value = `${(temp.value.value * 100).toFixed(2)}%`;
                    // @ts-ignore
                    temp.change_value.value = `${(temp.change_value.value * 100).toFixed(2)}%`;
                }
                return true;
            });

            ctx.body = {
                result: SUCCESS_CODE,
                data: list
            };
            ctx.status = 200;
        } catch (e) {
            ctx.body = getErrorInfo(e, ERROR_RES_CODE, ctx);
            ctx.status = 500;
        }
    }
}
