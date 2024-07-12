<template>
  <div class="box4" ref="map">
    地图
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import chinaJSON from './china.json';
let map = ref();
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let mychart = echarts.init(map.value);
  mychart.setOption({
    geo: {
      map: 'china',
      roam: true,
      scaleLimit: {
        min: 1,
        max: 10
      },
      label: {
        show: true,
        color: 'white',
        fontSize: 14
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'yellowgreen'
          }, {
            offset: 1, color: 'lightblue'
          }],
          global: false
        },
        opacity: .8
      },
      emphasis: {
        itemStyle: {
          color: 'red'
        },
        label: {
          fontSize: 40
        }
      }
    },
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [119.306239, 26.075302]
            ],
            lineStyle: {
              color: 'purple',
              width: 5
            }
          },
          {
            coords: [
              [116.405285, 39.904989],
              [114.298572, 30.584355]
            ],
            lineStyle: {
              color: 'pink',
              width: 5
            }
          }
        ],
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'cyan',
          symbolSize: 10
        }
      }
    ]
  })
})
</script>

<style scoped></style>