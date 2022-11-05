<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { chartTimeZoneConfig, bgColor, borderColor } from '../utils/chart';
Chart.register(...registerables);

// const props = defineProps<{
//     msg: string;
// }>();

const chartRef = ref();

function createLineChart() {
    const ctx = chartRef.value.getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartTimeZoneConfig,
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3, 10, 10, 20, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
                x: {
                    beginAtZero: true,
                },
            },
        },
    });
}
onMounted(() => {
    createLineChart();
});
</script>

<template>
    <div class="line-chart-wrapper">
        <canvas
            id="line-chart"
            ref="chartRef"
            width="400px"
            height="400px"
        ></canvas>
    </div>
</template>

<style scoped>
.line-chart-wrapper {
    background-color: #fff;
}

#line-chart {
    width: 200px;
    height: 200px;
}
</style>
