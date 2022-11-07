<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { chartTimeZoneConfig, bgColor, borderColor } from '../utils/chart';
Chart.register(...registerables);

const props = defineProps<{
    info: {
        labels: string[];
        today: number[];
        yesterday: number[];
    },
    title: string;
}>();

const chartRef = ref();

function createLineChart() {
    const ctx = chartRef.value.getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: props.info.labels,
            datasets: [
                {
                    label: '今天',
                    data: props.info.today,
                    borderColor: borderColor[0],
                    borderWidth: 2,
                    pointBorderWidth: 1,
                },
                {
                    label: '昨日',
                    data: props.info.yesterday,
                    borderColor: borderColor[1],
                    borderWidth: 2,
                    pointBorderWidth: 1,
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    display: true,
                    beginAtZero: true,
                },
                x: {
                    display: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10,
                    },
                },
            },
            layout: {
                padding: 10
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: props.title
                }
            }
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
