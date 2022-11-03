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

function spiderDouApi() {
    return new Promise((resolve, reject) => {
        spider
        .get('https://compass.jinritemai.com/compass_api/shop/product/product_detail/flow_source')
        .query({
            date_type: 1,
            begin_date: '2022/10/31 00:00:00',
            end_date: '2022/10/31 00:00:00',
            is_activity: false,
            activity_id: '',
            product_id: 3568103047295009149,
            index_name: 'product_show_ucnt,product_click_ucnt,pay_ucnt,product_add_to_cart_ucnt,product_wish_ucnt,product_detail_no_act_leave_ucnt',
            sort_field: 'product_show_ucnt',
            is_asc: false,
            _lid: 148999423745,
            msToken: '5p1aNaUVBq7_EvC_j9VaCR2ow9vzNWrTpTWpQ-33_4--yMf93WwFU3HVA48gx_lW_qTSChexnBEZcI1GAmxzoglyy_OCXmmbzh5PdVctGZClsqB3AhjyUw==',
            'X-Bogus': 'DFSzsdVOBKiANrwwS0fxncKMtaDC'
        })
        .accept('application/json')
        .set('Cookie', 'msToken=6hijmTqCkBVaeUeFob1eK6erJgf4MtlTdVwl5cmj3hDNDZdam-d7gjgPHb6BtjRC2STIn_U81lFSOcDz58rzlqNqNSgeNQjZXK2i5RtjgY7-2vGrTw20Gw==')
        .set('sec-ch-ua', '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"')
        .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')
        .set('sec-ch-ua-platform', '"macOS"')
        .set('sec-ch-ua', '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"')
        .set('referer', 'https://compass.jinritemai.com/shop/merchandise-traffic-analysis?product_id=3568103047295009149&tab_type=1&begin_date=1667059200&prepages%5B0%5D=%2Fshop%2Ftraffic-analysis-product')
        .set({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'authority': 'compass.jinritemai.com'
        })
        .end((err, res) => {
            if (err) {
                reject(err);
            }
            console.log('res.text =', res.text);
            resolve(res.text);
        });
    });
}

module.exports = {
    spiderDouApi,
};
