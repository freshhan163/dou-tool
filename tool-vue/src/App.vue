<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import LineChartCom from './components/LineChart.vue';
import { getCompareData, getFlowData } from './api/index';
import { format } from 'date-fns';

// 当前时间
const currentTime = new Date();
// 当天日期
const currentDate = format(currentTime, 'yyyy-MM-dd');
// 上一小时
const lastHour = ref(currentTime.getHours() - 1);
// 设置localStorageKey：当天日期_上一小时
const DEAD_HOUR_COMPARE_DATA_STORAGE_KEY = `dead_hour_compare_data_${currentDate}_${lastHour.value}`;
// 实时时间
const realTime = ref(format(currentTime, 'yyyy-MM-dd HH:mm:ss'));
const loading = ref(false);

// 实时数据
const flowData = ref<any>([]);
// 下面的数据，是当天，每个小时的统计数据
// 曝光人数
const showUcntCompareData = ref<any>({
    data: [],
    deadHour: 0,
    deadNumber: 0,
});
// 处理后的图表数据
const showChartInfo = ref<any>({
    labels: [],
    yesterday: [],
    today: [],
});
// 点击人数
const clickUcntCompareData = ref<any>({
    data: [],
    deadHour: 0,
    deadNumber: 0,
});
// 处理后的图表数据
const clickChartInfo = ref<any>({
    labels: [],
    yesterday: [],
    today: [],
});
// 成交人数
const payUcntCompareData = ref<any>({
    data: [],
    deadHour: 0,
    deadNumber: 0,
});
// 处理后的图表数据
const payChartInfo = ref<any>({
    labels: [],
    yesterday: [],
    today: [],
});

// 图标类型，六种
const CHART_TYPE_SHOW_UCNT = 'product_show_ucnt'; // 曝光人数
const CHART_TYPE_CLICK_UCNT = 'product_click_ucnt'; // 点击人数
const CHART_TYPE_PAY_UCNT = 'product_pay_ucnt'; // 成交人数
const CHART_TYPE_CLICK_SHOW_UCNT_RATIO = 'product_click_show_ucnt_ratio'; // 点击率
const CHART_TYPE_SHOW_PAY_UCNT_RATIO = 'product_show_pay_ucnt_ratio'; // 曝光成交率
const CHART_TYPE_PAY_CLICK_UCNT_RATIO = 'product_pay_click_ucnt_ratio'; // 点击成交率

// 计算图表数据
function calculateLineChartData(list: any, type: string) {
    let info: any = {
        labels: [],
        yesterday: [],
        today: [],
    };
    if (list?.data?.length === 0) {
        return info;
    }

    // 百分比相关的图表，需要手动计算一下百分比
    if (type.indexOf('_ratio') > -1) {
        // TODO:需要手动计算一下百分比

    } else {
        list.data.forEach((item: any) => {
            info.yesterday.push(item.yesterday);
            info.today.push(item.increment);
            info.labels.push(item.time);
        });
    }
    // 找到对应类型的实时数据：点击/展现/成交
    const currentItem = flowData.value.find(
        (item: any) => item.data_head.index.index_name === type
    );
    if (currentItem && currentItem.value) {
        // 下标是从0开始计算，当前小时是 deadHour + 1
        info.today[list.deadHour] = currentItem?.value?.value - list.deadNumber;
    }
    console.log('type = ', type, 'chartInfo = ', info);
    return info;
}

async function getAllCompareData() {
    try {
        const productId = '3568103047295009149';
        const [showUcntRes, clickUCntRes, payUcntRes] = await Promise.all([
            getCompareData({ index_selected: 'product_show_ucnt', productId }),
            getCompareData({ index_selected: 'product_click_ucnt', productId }),
            getCompareData({ index_selected: 'pay_ucnt', productId }),
        ]);

        // @ts-ignore
        showUcntCompareData.value = showUcntRes.data;
        // @ts-ignore
        clickUcntCompareData.value = clickUCntRes.data;
        // @ts-ignore
        payUcntCompareData.value = payUcntRes.data;

        const info = {
            showUcntCompareData: showUcntCompareData.value,
            clickUcntCompareData: clickUcntCompareData.value,
            payUcntCompareData: payUcntCompareData.value,
        };
        // 保存数据
        localStorage.setItem(DEAD_HOUR_COMPARE_DATA_STORAGE_KEY, JSON.stringify(info));
        // 计算图表数据
        handleChartInfo(info);
    } catch (e) {
        console.log('e = ', e);
    }
}

async function handleGetFlowData() {
    try {
        // @ts-ignore
        const flowRes: any = (await getFlowData({
            product_id: '3568103047295009149',
        })).data;
        flowData.value = flowRes.data;
    } catch (e) {
        console.log('e = ', e);
    }
}

// 刷新数据
async function refreshData() {
    const time = new Date();
    realTime.value = format(time, 'yyyy-MM-dd HH:mm:ss');

    await handleGetFlowData();

    const last = time.getHours() - 1;
    // 只更新实时数据
    if (last === lastHour.value) {
        const listObj: string = localStorage.getItem(DEAD_HOUR_COMPARE_DATA_STORAGE_KEY) || '';
        handleChartInfo(listObj);
    } else {
        // 更新所有数据
        lastHour.value = last;
        await getAllCompareData();
    }
}

// 处理图表数据
function handleChartInfo(compareInfo: any) {
    showChartInfo.value = calculateLineChartData(compareInfo.showUcntCompareData, CHART_TYPE_SHOW_UCNT);
    clickChartInfo.value = calculateLineChartData(compareInfo.clickUcntCompareData, CHART_TYPE_CLICK_UCNT);
    payChartInfo.value = calculateLineChartData(compareInfo.payUcntCompareData, CHART_TYPE_PAY_UCNT);

    loading.value = false;
}

onMounted(async () => {
    loading.value = true;
    await handleGetFlowData();
    const listObj: string = localStorage.getItem(DEAD_HOUR_COMPARE_DATA_STORAGE_KEY) || '';
    // 一个小时内请求一次compareData即可
    if (listObj) {
        return;
    }
    // await getAllCompareData();
});
</script>

<template>
    <div class="body">
        <div class="product">
            <div class="product-left">
                <img class="product-logo" src="https://p9-aio.ecombdimg.com/obj/ecom-shop-material/slCkiDYg_m_bedc825608121583bde945b4d671a168_sx_613220_www800-800" />
                <div class="product-content">
                    <p class="product-title">网红轻奢家用收纳盒化妆品收纳盒梳妆台面膜护肤杂物整理盒</p>
                    <p class="product-time">更新时间：{{ realTime }}</p>
                </div>
            </div>
            <div class="product-right">
                <button class="refresh-btn" @click="refreshData">刷新数据</button>
            </div>
        </div>
        <div v-if="loading" class="loading-wrapper">数据刷新中...</div>
        <div class="header">
            <div
                v-for="(item, index) in flowData"
                :key="index"
                class="header-item"
            >
                <p class="item-title">{{ item.data_head.index.index_display }}</p>
                <p class="item-today">{{ item.data_head.index.value.value }}</p>
                <p class="item-yesterday">昨日{{ item.data_head.index.change_value.value }}</p>
            </div>
        </div>
        <div v-if="flowData.length > 0" class="content">
            <line-chart-com :info="showChartInfo" title="商品曝光人数" />
            <line-chart-com :info="clickChartInfo" title="商品点击人数" />
            <line-chart-com :info="payChartInfo" title="商品成交人数" />
        </div>
    </div>
</template>

<style scoped>
.body {
    padding: 20px 0;
}

.product {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.product-left {
    display: flex;
    flex-direction: row;
}

.product-logo {
    width: 104px;
    height: 104px;
    margin-right: 20px;
}

.product-content {
    display: flex;
    flex-direction: column;
    height: 104px;
}

.product-title {
    color: #121314;
    display: -webkit-box;
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
    max-width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
}

.header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.header-item {
    width: 200px;
    margin: 0 20px 20px 0;
    border: 1px solid #ebecf0;
    border-radius: 4px;
    padding: 12px;
    cursor: pointer;
}

.header-item:hover {
    background: #f5f8ff;
    border-radius: 4px;
    cursor: pointer;
}

.item-title {
    color: #5e6066;
    line-height: 18px;
    font-size: 12px;
    font-weight: 500;
}

.item-today {
    font-size: 18px;
    line-height: 46px;
    color: rgb(18, 19, 20);
    height: 46px;
    font-weight: 600;
}

.item-yesterday {
    color: #909299;
    font-size: 12px;
}

.refresh-btn {
    width: 112px;
    height: 48px;
    border-radius: 28px;
    background-color: #fff;
    border: 1px solid #222;
    outline: none;
    cursor: pointer;
}
</style>
