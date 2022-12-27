import Router from '@koa/router';
import getActualData from '../controller/actual-data';
import getSourceData from '../controller/source-data';
import getFunnelData from '../controller/funnel-data';
import getCompareData from '../controller/compare-data';

const router = new Router();

router.get('/test', async (ctx, next: ()=> void) => {
    ctx.body = 'test';
    ctx.status = 200;
});

// 实时数据（精确到秒）
router.get('/api/dou/flow_data', getActualData);

// 今天、昨天对比图，分小时数据
router.get('/api/dou/flow_data_compare', getCompareData);

// 当天整体的点击数、转化数（漏斗）
router.get('/api/dou/flow_funnel', getFunnelData);

// 底部的数据表格
router.get('/api/dou/flow_source', getSourceData);

export default router;
