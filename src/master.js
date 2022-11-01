/**
 * @file master
 * @description 管理集群
 * @author hanxiaofang
 */
const cluster = require('cluster');
const os = require('os');

const cpuNums = 1;

cluster.setupMaster({
    exec: './src/worker.js', // 路径必须是根目录下的相对路径
    args: ['--use', 'http']
});

function startMultiProcess() {
    for (let i = 0; i < cpuNums; i++) {
        let work = cluster.fork();

         // 发送消息给主进程，或工作进程
         // 在子进程中工作，是发送给 主进程； 在主进程中工作，是发送给子进程
        work.send([i]);

        // 接收子进程发送回来的消息
        work.on('message', res => {
            console.log('开始关闭子进程 res = ', res);
            cluster.disconnect(); // 只能由主进程调用，将在每个工作进程中，调用disconnect
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
startMultiProcess();
