/**
 * @fiile health-check.ts
 * @desc server的健康状态检查
 */
import { Context } from 'koa';

export default async (context: Context, next: ()=> void) => {
    if (context.path !== '/health-check') {
        await next();
        return;
    }
    context.body = 'ok';
    context.status = 200;
};
