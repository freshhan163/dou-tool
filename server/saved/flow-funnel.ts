/**
 * @file flow-funnel.ts
 * @desc 漏斗数据
 */
import { Context } from 'koa';
import { SUCCESS_CODE, ERROR_RES_CODE } from '../config/errorCode';
import { getErrorInfo } from '../lib/util';
import { controllerDecorator, requestDecorator } from '../decorators/ControlDecorator';
import { get, post } from '../lib/axios';

@controllerDecorator({
    prefix: '/api/dou/flow'
})
export default class ActivityProcessController {
    constructor() {}

    @requestDecorator({
        path: '/funnel',
        type: 'get'
    })
    async getInfo(args: any, ctx: Context): Promise<void> {
        try {
            const res: any = await get(
                'https://compass.jinritemai.com/compass_api/shop/product/product_detail/flow_source?date_type=21&begin_date=2022%2F10%2F27+00:00:00&end_date=2022%2F11%2F02+00:00:00&is_activity=false&activity_id=&product_id=3568103047295009149&index_name=product_show_ucnt,product_click_ucnt,pay_ucnt,product_add_to_cart_ucnt,product_wish_ucnt,product_detail_no_act_leave_ucnt&sort_field=product_show_ucnt&is_asc=false&_lid=826228714647&msToken=VsCBm_k9EaTGUlAlacmab7QTpf2TolWCy7kZq-eKhpj6mPBqDuKuQrKcAEtUZ1GAVCgBSpS_8cGGC_SZoR7B_d_euFESSnBMGrGLZHZFE72c3QI6js__FdqPImr_HV4=&X-Bogus=DFSzsdVOjrUANaPqS0WZL5KMtapC',
                {},
                {
                    headers: {
                        'authority': 'compass.jinritemai.com',
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        'cache-control': 'no-cache',
                        'cookie': 'SHOP_ID=54820011; PIGEON_CID=7129657361257946662; MONITOR_WEB_ID=6f4ac81e-de8e-415c-aaba-63962644dbcb; passport_csrf_token=3cee623584fc8ac7cb520bb9c0194ede; passport_csrf_token_default=3cee623584fc8ac7cb520bb9c0194ede; qc_tt_tag=0; Hm_lvt_ed0a6497a1fdcdb3cdca291a7692408d=1665664012,1666759844; Hm_lvt_729f63f2a2cf56cd38fff0220c787b4a=1665664012,1666759844; _tea_utm_cache_4031=undefined; _tea_utm_cache_4499=undefined; x-jupiter-uuid=16670421128099918; n_mh=-07pB7K7kGEY65o6-x9WIghQfhf3Iv50JU8_a7g8OMY; Hm_lvt_7afe580efa9cda86356bdea8077a83e7=1665664022,1667139434; sso_uid_tt=a8af0f5ab81d9cbdf939e6001d84bee3; sso_uid_tt_ss=a8af0f5ab81d9cbdf939e6001d84bee3; toutiao_sso_user=9c03e0b733fe3b39c73a7fad46f46dff; toutiao_sso_user_ss=9c03e0b733fe3b39c73a7fad46f46dff; sid_ucp_sso_v1=1.0.0-KGU5OTFmNGYwNGI0ZjcyYTU3MmQwM2FhOTFmMjdiMWZiMzk4YTdjYzQKHwie3JD0y43WBBC6gISbBhiwISAMMO3Sr44GOAZA9AcaAmxmIiA5YzAzZTBiNzMzZmUzYjM5YzczYTdmYWQ0NmY0NmRmZg; ssid_ucp_sso_v1=1.0.0-KGU5OTFmNGYwNGI0ZjcyYTU3MmQwM2FhOTFmMjdiMWZiMzk4YTdjYzQKHwie3JD0y43WBBC6gISbBhiwISAMMO3Sr44GOAZA9AcaAmxmIiA5YzAzZTBiNzMzZmUzYjM5YzczYTdmYWQ0NmY0NmRmZg; odin_tt=b45ba05973608b61b9c25754e6d7283d3f382bb5daf879de9702712838ab2d9667439ad690b2ef32d1416f2b6df301e2d6ac9007c36f926cc4b9e2fe475528a7; passport_auth_status=1b7fbd5e59a2630e7ea65fc102723c25%2C5d6b9184ede470d48c537c37247839ff; passport_auth_status_ss=1b7fbd5e59a2630e7ea65fc102723c25%2C5d6b9184ede470d48c537c37247839ff; ucas_sso_c0=CkEKBTEuMC4wEJ-IiqKChcCwYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC9gISbBki9tMCdBlCmvJ2gh7Po-GJYbxIUTxrmto4S4wgNdCiNKLYViki4hs0; ucas_sso_c0_ss=CkEKBTEuMC4wEJ-IiqKChcCwYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC9gISbBki9tMCdBlCmvJ2gh7Po-GJYbxIUTxrmto4S4wgNdCiNKLYViki4hs0; ucas_c0=CkEKBTEuMC4wEKOIgaqchMCwYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC9gISbBki9tMCdBlCmvJ2gh7Po-GJYbxIUEQ7DvTOQjtZAbmgKhJpaAtCWq_w; ucas_c0_ss=CkEKBTEuMC4wEKOIgaqchMCwYxjmJiCU0vDayo2FByiwITCe3JD0y43WBEC9gISbBki9tMCdBlCmvJ2gh7Po-GJYbxIUEQ7DvTOQjtZAbmgKhJpaAtCWq_w; sid_guard=62f5674a916d050f73c7d996605d02f0%7C1667301437%7C5184000%7CSat%2C+31-Dec-2022+11%3A17%3A17+GMT; uid_tt=9487f407039a660e2f037760339d32b6; uid_tt_ss=9487f407039a660e2f037760339d32b6; sid_tt=62f5674a916d050f73c7d996605d02f0; sessionid=62f5674a916d050f73c7d996605d02f0; sessionid_ss=62f5674a916d050f73c7d996605d02f0; sid_ucp_v1=1.0.0-KDMzMGIzMjhhOGU0YjI0M2YzNDg5OGIyNDdjZjBjYjAyZTM1YmU4NmYKFwie3JD0y43WBBC9gISbBhiwITgGQPQHGgJscSIgNjJmNTY3NGE5MTZkMDUwZjczYzdkOTk2NjA1ZDAyZjA; ssid_ucp_v1=1.0.0-KDMzMGIzMjhhOGU0YjI0M2YzNDg5OGIyNDdjZjBjYjAyZTM1YmU4NmYKFwie3JD0y43WBBC9gISbBhiwITgGQPQHGgJscSIgNjJmNTY3NGE5MTZkMDUwZjczYzdkOTk2NjA1ZDAyZjA; PHPSESSID=d6e3a56d2f5c9a1884d20b8da22df3cd; PHPSESSID_SS=d6e3a56d2f5c9a1884d20b8da22df3cd; csrf_session_id=1fd0291e270517eb65a2b31445e8b0b1; ttwid=1%7CJ5NF6vzh2qE17ndeWrsJ1H6RF1Vv1yIe5CILyGE9Yyg%7C1667482570%7C6f5e4b2fc7468bd0fdc441f04be5d9200689774cbeb0acc872a2cd0a9d790461; LUOPAN_DT=session_7161781760320094471; tt_scid=ZsoCEXvn0ccIB4s5awICTXhgHTGoTjHjiiB1eITVpeWAXRWHZSBjPgEl5cDBJeira470; msToken=guEwUcmOoVubGG75FP0rR71B5Up7xzswbuz87Khk1Nli9vnqpe1LPc2oarZiyGgSeHQQlBAGJuIr_W65clW2nk4lhh-ozhbWC_aaZS3tjZcafMblEOnkKBEnMonzP-Q=; msToken=wNDPPUqbXTSfGw9V_ih5G9E6XmxatKSLmgQxg1DJm47ZNQvsDWhelw2v3K_dzw6L_hYWWnjSnhpiPGEwEMUdDAzTqswNMsMjpe7zIq5BWxIM41N3e3CiaI3GCviI1xQ=',
                        'pragma': 'no-cache',
                        'referer': 'https://compass.jinritemai.com/shop/merchandise-traffic-analysis?product_id=3568103047295009149&tab_type=21&tab_value=1666800000%2C1667318400&prepages%5B0%5D=%2Fshop%2Fmerchandise-traffic',
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
            console.log('res = ', res.data);

            ctx.body = {
                result: SUCCESS_CODE,
                data: res.data
            };
            ctx.status = 200;
        } catch (e) {
            ctx.body = getErrorInfo(e, ERROR_RES_CODE, ctx);
            ctx.status = 500;
        }
    }
}
