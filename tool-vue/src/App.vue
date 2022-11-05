<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import LineChartCom from './components/LineChart.vue';
import { getCompareData, getFlowData } from './api/index';

const currentData = ref({
    productShowUCnt: 0, // 商品曝光人数
    productClickUcnt: 0, // 商品点击人数
    payUcnt: 0, // 商品成交人数
    productClickShowUcntRatio: 0, // 商品点击率(人数)
    productShowPayUcntRatio: 0, // 商品曝光-成交率(人数)
    productPayClickUcntRatio: 0, // 商品点击-成交率(人数)
});

const headerInfo = [
    {
        key: 'time',
        title: '时间段',
    },
    {
        key: 'productShowUCnt',
        title: '商品曝光人数',
    },
    {
        key: 'productClickUcnt',
        title: '商品点击人数',
    },
    {
        key: 'payUcnt',
        title: '商品成交人数',
    },
    {
        key: 'productClickShowUcntRatio',
        title: '商品点击率(人数)',
    },
    {
        key: 'productShowPayUcntRatio',
        title: '商品曝光-成交率(人数)',
    },
    {
        key: 'productPayClickUcntRatio',
        title: '商品点击-成交率(人数)',
    },
];

const currentHour = new Date().getHours();

onMounted(async ()=> {
    const data = await getFlowData({
        product_id: 3568103047295009149,
    });
    const compareData = await getCompareData({
        product_id: 3568103047295009149,
        index_selected: 'product_click_ucnt'
    });
    console.log('data = ', data);
});
</script>

<template>
    <div class="body">
        <div class="header">
            <div class="header-row">
                <div class="header-item">
                    <p class="item-title">商品曝光人数</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
                <div class="header-item">
                    <p class="item-title">商品点击人数</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
                <div class="header-item">
                    <p class="item-title">商品成交人数</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
                <div class="header-item">
                    <p class="item-title">商品成交订单数</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
                <div class="header-item">
                    <p class="item-title">商品成交金额</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
            </div>
            <div class="header-row">
                <div class="header-item">
                    <p class="item-title">商品点击率(人数)</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
                <div class="header-item">
                    <p class="item-title">商品点击-成交率(人数)</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
                <div class="header-item">
                    <p class="item-title">商品曝光-成交率(人数)</p>
                    <p class="item-today"></p>
                    <p class="item-yesterday">昨日</p>
                </div>
            </div>
            <div class="input-item">
                <label>商品点击人数</label>
                <input v-model="currentData.productClickUcnt" />
            </div>
            <div class="input-item">
                <label>商品成交人数</label>
                <input v-model="currentData.payUcnt" />
            </div>
            <div class="analyze-item">
                商品点击率(人数)&nbsp;&nbsp;&nbsp;{{
                    currentData.productClickShowUcntRatio
                }}
            </div>
            <div class="analyze-item">
                商品点击-成交率(人数){{
                    currentData.productPayClickUcntRatio
                }}
            </div>
            <div class="analyze-item">
                商品曝光-成交率(人数){{
                    currentData.productShowPayUcntRatio
                }}
            </div>
            <div class="analyze-item">
                商品曝光-成交率(人数){{
                    currentData.productShowPayUcntRatio
                }}
            </div>
        </div>
        <div class="content">
            <line-chart-com />
            <line-chart-com />
            <line-chart-com />
            <line-chart-com />
            <line-chart-com />
        </div>
    </div>
</template>

<style scoped>
.body {
    padding: 20px 0;
}

.header-row {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
}

.header-item {
    width: 200px;
    margin-right: 20px;
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
</style>
