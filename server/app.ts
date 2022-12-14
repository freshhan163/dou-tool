import Koa, { Context } from 'koa';
import koaCors from '@koa/cors';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import historyApiFallback from 'koa2-connect-history-api-fallback';
import { PORT, staticPath } from './config';
import healthCheckMiddleware from './middleware/healthCheck';
import customRouter from './routers/custom';
import Router from '@koa/router';

const app = new Koa();

app.use(koaCors({
    credentials: true,
    allowHeaders: ['trace-context'], // 泳道
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'], // 设置所允许的HTTP请求方法
    // origin: (ctx: Context) => {
    //     return ctx.request.header.origin;
    // }
}));

app.use(koaBody());
app.use(healthCheckMiddleware);

// 装载所有子路由
const router = new Router();
app.use(customRouter.routes()).use(router.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// 防止 /api的请求也指向到index.html
app.use(historyApiFallback({ index: '/index.html', whiteList: ['/api'] })).use(koaStatic(staticPath));

// 捕获未处理错误
app.on('error', (err, ctx) => {
    console.log('err = ', err);
});

// 未捕获的错误处理
process.on('unhandledRejection', (error: any) => {
    console.error({
        tags: {
            errname: 'error-unhandledRejection',
            errmessage: error.message,
            errstack: error.stack
        },
        message: 'unhandledRejection'
    });
});

process.on('uncaughtException', error => {
    console.error({
        tags: {
            errname: 'uncaughtException',
            errmessage: error.message,
            errstack: error.stack
        },
        message: 'uncaughtException'
    });

    // 发生未捕获错误, 给日志写入留出时间, 延时退出
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

const port = process.env.port || PORT;

app.listen(port, () => {
    console.log(`\n 服务已开启，请访问 http://localhost:${port} \n`);
});
