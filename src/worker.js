/**
 * @file worker.js
 * @description 各个子进程的内部处理机制
 * @author hanxiaofang
 */

const spider = require('./spider1');

process.on('message', params => {
    let processCnt = 0; // 第几次子进程的顺序
    let maxNum = params[2]; // 要获取多少次数据
    let currentCnt = processCnt + params[0];

    while (maxNum > currentCnt) {
        let start = currentCnt * 20; // 从第几条数据开始爬取
        (async () => {
            await spider(start);
            // 发送给子进程
            process.send(`子进程序号：${params[0]}，pid： ${process.pid}：从第 ${start} 条数据开始爬取`);
        })();
        processCnt += params[1]; // 运行完一次所有的子进程，就累积一次 子进程数量
        currentCnt = processCnt + params[0];
    }
});
