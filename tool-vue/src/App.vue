<script setup lang="ts">
import TheWelcome from "./components/TheWelcome.vue";
import { ref, computed } from "vue";
import { format } from "date-fns";

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
    key: "time",
    title: "时间段",
  },
  {
    key: "productShowUCnt",
    title: "商品曝光人数",
  },
  {
    key: "productClickUcnt",
    title: "商品点击人数",
  },
  {
    key: "payUcnt",
    title: "商品成交人数",
  },
  {
    key: "productClickShowUcntRatio",
    title: "商品点击率(人数)",
  },
  {
    key: "productShowPayUcntRatio",
    title: "商品曝光-成交率(人数)",
  },
  {
    key: "productPayClickUcntRatio",
    title: "商品点击-成交率(人数)",
  },
];

const currentHour = new Date().getHours();

const timeZone: any = [];
function createTimeZone() {
  for (let i = currentHour - 1; i >= 1; --i) {
    timeZone.push({
      title: `${i - 1 > 9 ? "" : "0"}${i - 1}:00-${i > 9 ? "" : "0"}${i}:00`,
      productShowUCnt: 0,
      productClickUcnt: 0,
      payUcnt: 0,
      productClickShowUcntRatio: 0,
      productShowPayUcntRatio: 0,
      productPayClickUcntRatio: 0,
      key: i,
    });
  }
}
createTimeZone();
console.log("timeZone = ", timeZone);
</script>

<template>
  <div class="body">
    <div class="header">
      <div class="header-input">
        <div class="input-item">
          <label>商品曝光人数</label>
          <input v-model="currentData.productShowUCnt" />
        </div>
        <div class="input-item">
          <label>商品点击人数</label>
          <input v-model="currentData.productClickUcnt" />
        </div>
        <div class="input-item">
          <label>商品成交人数</label>
          <input v-model="currentData.payUcnt" />
        </div>
      </div>
      <div class="header-analyze">
        <div class="analyze-item">
          商品点击率(人数)&nbsp;&nbsp;&nbsp;{{ currentData.productClickShowUcntRatio }}
        </div>
        <div class="analyze-item">
          商品点击-成交率(人数){{ currentData.productPayClickUcntRatio }}
        </div>
        <div class="analyze-item">
          商品曝光-成交率(人数){{ currentData.productShowPayUcntRatio }}
        </div>
      </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div v-for="item in headerInfo" :key="item.key" class="header-item">
          {{ item.title }}
        </div>
      </div>
      <div class="table-body">
        <div v-for="item in timeZone" :key="item.key" class="table-row">
          <div
            v-for="(row, index) in Object.keys(item).filter(
              (item) => item !== 'key'
            )"
            :key="index"
            class="row-item"
          >
            <span>{{ item[row] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
}

.header-item,
.row-item {
  width: 180px;
  text-align: center;
}

.table-row {
  display: flex;
  justify-content: space-between;
}

.row-item {
  text-align: center;
}

.header-input,
.header-analyze {
  display: flex;
}

.input-item,
.analyze-item {
  margin-right: 20px;
  width: 300px;
}

</style>
