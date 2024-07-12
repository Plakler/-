<template>
  <div class="box7">
    <div class="title">
      <p>游客年度量对比</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let charts = ref();
onMounted(() => {
  let mychart = echarts.init(charts.value);
  mychart.setOption({
    title: {
      text: '散点图',
      left: '40%',
      textStyle: {
        color: 'white'
      }
    },
    xAxis: {
      type: 'category',
      show: true
    },
    yAxis: {
      show: false
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 20
    },
    series: {
      type: 'scatter',
      data: [400, 550, 120, 780, 777, 263, 100, 110, 642, 250, 750, 840, 512, 560, 450, 178],
      symbol: 'arrow',
      symbolSize: 20,
      label: {
        show: true,
        position: 'top',
        color: 'white'
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'orange'
          }, {
            offset: 1, color: 'yellowgreen'
          }],
          global: false
        }
      }
    }
  })
})
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .title {
    p {
      color: white;
      font-size: 18px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>