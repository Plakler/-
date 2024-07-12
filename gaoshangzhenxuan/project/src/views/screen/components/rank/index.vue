<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行榜</p>
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
      text: '景区排行榜',
      link: 'https://www.baidu.com',
      left: '50%',
      textStyle: {
        color: 'purple',
        fontSize: 20
      },
      subtext: '各大景区排行',
      subtextStyle: {
        color: 'green',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    grid: {
      left: 20,
      bottom: 20,
      right: 20
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70, 80],
        label: {
          show: true,
          position: 'insideTop',
          color: 'lightgreen',
        },
        showBackground: true,
        backgroundStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'darkblue'
            }, {
              offset: 1, color: 'darkslateblue'
            }],
            global: false
          }
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: function (data: any) {
            let arr = ['brown', 'darkred', 'bisque', 'chocolate', 'darkviolet', 'forestgreen', 'gold', 'cyan'];
            return arr[data.dataIndex]
          }
        }
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 90, 100, 120],
        smooth: true,
      }
    ],
    tooltip: {
      backgroundColor: 'grey'
    }
  })
})
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .title {
    margin-left: -20px;
    margin-top: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>