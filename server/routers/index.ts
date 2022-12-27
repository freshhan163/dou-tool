import Router from '@koa/router';
import fs, { Stats } from 'fs';
import { join } from 'path';
import { Context, Next } from "koa";

const controllerPath = join(__dirname, '../saved');

type ReqMethod = 'get' | 'post';

// 遍历文件夹
export function walkSync(currentDirPath: string, callback: (filePath: string, stat: Stats)=> void) {
    fs.readdirSync(currentDirPath).forEach(function (name: string) {
        const filePath = join(currentDirPath, name);
        const stat: Stats = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

function controlHandle(controllerObj: any, key: string, type: ReqMethod) {
    return async function (context: Context, next: Next) {
        const args = {
            'get': context.request.query,
            'post': context.request.body
        };
        const result = await Promise.resolve(controllerObj[key](args[type], context)).catch((e: ErrorEvent) => {
            return {
                __NODE_ERROR__: e && e.toLocaleString && e.toLocaleString()
            };
        });

        let body: any = {};
        // 正常情况下请求返回值
        body = context.body ? context.body : {};

        // 出现debug调试时请求返回值
        if (context.cookies.get('debug') && context.state.debug) {
            body.debug = context.state.debug;
        }

        // 一个node请求多个server接口时出现某个接口error
        if (context.state.error) {
            body.error = context.state.error;
        }

        // 当出现node中的error时发送这个标识
        if (result?.__NODE_ERROR__) {
            body.nodeError = result.__NODE_ERROR__;
        }

        context.body = body;
        return next();
    };
}

function controller(router: Router) {
    walkSync(controllerPath, async (filePath: string, stat: Stats) => {
        if (filePath.toLowerCase().endsWith('.ts')) {
            const controller = await import(filePath);
            const controllerObj = new controller.default();
            controllerObj.__requestList__.forEach((item: any) => {
                const type = item.type.toLowerCase();
                if (['get', 'post'].indexOf(type) === -1)  {
                    throw Error(`ERROR: router must get or post, now  ${type}`);
                }
                // @ts-ignore
                router[type](item.path, controlHandle(controllerObj, item.__requestName__, type));
            });
        }
    });
}

const router = new Router();

controller(router);

export default router;