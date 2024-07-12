<template>
  <div class="box5">
    <div class="title">
      <p>未来7天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let line = ref();
onMounted(() => {
  let mycharts = echarts.init(line.value);
  mycharts.setOption({
    title: {
      text: '访问量'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: "white"
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLabel: {
        color: "white"
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    grid: {
      left: 40,
      top: 0,
      right: 20,
      bottom: 20
    },
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 199, 2321, 890, 1200],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'orange'
            }, {
              offset: 1, color: 'dodgerblue'
            }],
            global: false
          }
        }
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.box5 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .title {
    margin-left: 10px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>