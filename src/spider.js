/**
 * @file spider
 * @description 发送数据包
 * @author hanxiaofang
 */
const spider = require('superagent');
const fs = require('fs');
const api = 'https://movie.douban.com/j/new_search_subjects';

function writeToJsonFile(name, data) {
    fs.writeFile(name, data, err => {
        if (err) {
            console.log(`写入文件${name}.json失败!!!`);
            throw err;
        }
        console.log(`写入文件${name}.json成功！`)
    });
}

module.exports = function (start) {
    return new Promise((resolve, reject) => {
        spider
        .get(api)
        .query({
            sort: 'U',
            tags: '',
            start: start,
            range: '0,10',
            genres: '动画',
            countries: '日本'
        })
        .type('form')
        .accept('application/json')
        .end((err, res) => {
            if (err) {
                reject(err);
            }

            // 加唯一id，保证多线程爬取数据的先后顺序可以确定
            let resObj = JSON.parse(res.text);
            writeToJsonFile(`${start}.json`, res.text);
            if (resObj.data) {
                console.log(resObj.data.length);
            }
            resolve();
        });
    });
};
