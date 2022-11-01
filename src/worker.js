/**
 * @file worker.js
 * @description 各个子进程的内部处理机制
 * @author hanxiaofang
 */

const spider = require('./spider');

process.on('message', params => {
    (async () => {
        try {
            const res = await spider.spiderDouApi();
            console.log('res = ', res);
        } catch (e) {
            console.log('e =', e);
        }
        // 发送给子进程
        process.send(`子进程序号：${params[0]}，pid： ${process.pid}`);
    })();
});
