<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg1"></p>
      <p class="right">可预约总量<span>999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">11</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
let people = ref('216908人');
let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption({
    title: {
      text: '水球图'
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    series: {
      type: 'liquidFill',
      data: [0.7, 0.5, 0.3, 0.1],
      waveAnimation: true,
      animationDuration: 0.1,
      animationDurationUpdate: 0,
      radius: '100%',
      outline: {
        show: true,
        borderDistance: 6,
        itemStyle: {
          color: 'lightblue',
          borderColor: '#29fcff',
          borderwidth: 4,
          shadowBlur: 10,
          shadowColor: 'lightgreen'
        }
      }
    },

  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg1 {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: palegreen;
      }
    }
  }

  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>