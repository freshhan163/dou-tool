/**
 * @file 实时数据
 */
import { Context } from "koa";
import { SUCCESS_CODE, ERROR_RES_CODE } from '../config/errorCode';
import { getErrorInfo, validateFields } from '../lib/util';
import { get, generateCommonHeaders } from '../lib/axios';

export default async function getFunnelData(ctx: Context, next: ()=> void) {
    try {
        const params = {
            begin_date: undefined, // '2022/10/31'
            end_date: undefined, // '2022/10/31'
            product_id: undefined, // 3568103047295009149
            '_lid': '092089726937',
            msToken: 'FcGddp0z7gkctW3JNhYgTMWajwsSRgW0rE0Jgy_BWM4MgfF9UAU3e2vyB0dDMQMqa1a0cn_LQfTH_AyKimbjbTheyMtds1Bc__HZVOM65yvSyoFxP6Wp5w==',
            'X-Bogus': 'DFSzsdVYMbJANepTS/z3bcKMtakD'
        };
        const args = ctx.request.query;
        // 验证参数
        validateFields(Object.assign(params, args));

        const originPath = 'https://compass.jinritemai.com/compass_api/shop/product/product_detail/flow_funnel';
        const url = 
            `${originPath}?date_type=1&begin_date=${encodeURIComponent(args.begin_date as string)}+00:00:00&end_date=${encodeURIComponent(args.end_date as string)}+00:00:00&is_activity=false&activity_id=&product_id=${args.product_id}&_lid=${params._lid}&msToken=${params.msToken}&X-Bogus=${params['X-Bogus']}`;
        // console.log('url = ', url);
        const commonHeaders = generateCommonHeaders({ product_id: args.product_id as string });
        const res: any = await get(url, {}, { headers: commonHeaders });
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
    await next();
}
