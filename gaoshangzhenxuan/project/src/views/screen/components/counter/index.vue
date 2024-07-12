<template>
  <div class="box8">
    <div class="title">
      <p>数据统计</p>
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
  let option = {
    title: {
      text: '游客消费统计',
      textStyle: {
        color: 'white'
      }
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '交通', max: 6500 },
        { name: '购物', max: 16000 },
        { name: '看电影', max: 30000 },
        { name: 'KTV', max: 38000 },
        { name: '住宿', max: 52000 },
        { name: '参观', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '饮食'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '娱乐'
          }
        ]
      }
    ]
  };
  mychart.setOption(option);
})
</script>

<style scoped lang="scss">
.box8 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;

  .title {
    p {
      color: white;
      font-size: 18px;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>