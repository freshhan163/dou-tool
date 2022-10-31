/**
 * @file master
 * @description 管理集群
 * @author hanxiaofang
 */
const cluster = require('cluster');
const os = require('os');

const cpuNums = os.cpus().length;

cluster.setupMaster({
    exec: './src/worker1.js', // 路径必须是根目录下的相对路径
    args: ['--use', 'http']
});

function startMultiProcess(pageNum) {
    let maxNum = pageNum; // 获取多少次数据
    const start = Date.now();

    for (let i = 0; i < cpuNums; i++) {
        let work = cluster.fork();

         // 发送消息给主进程，或工作进程
         // 在子进程中工作，是发送给 主进程； 在主进程中工作，是发送给子进程
        work.send([i, cpuNums, maxNum]);

        // 接收子进程发送回来的消息
        work.on('message', res => {
            --maxNum;
            console.log(res);
            if (maxNum === 0) {
                console.log(`已经爬取${pageNum * 20}条数据，用时 ${Date.now() - start}ms \n`);
                console.log('开始关闭各个子进程');
                cluster.disconnect(); // 只能由主进程调用，将在每个工作进程中，调用disconnect
            }
        });
    }
}
cluster.on('fork', worker => {
    console.log(`[master] : fork worker ${worker.id}\n`);
});
cluster.on('exit', worker => {
    console.log(`[master] : 子进程 ${worker.id}被关闭 \n`);
});

console.log(`一共开启${cpuNums}个子进程来进行爬取`);
startMultiProcess(1);
