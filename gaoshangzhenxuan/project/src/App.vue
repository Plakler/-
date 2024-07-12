<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import request from "@/utils/request";
import { onMounted } from "vue";
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
    //@ts-ignore
  }).then(res => {

  })
})
</script>

<style scoped lang="scss"></style>