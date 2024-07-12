<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="">
    <button @click="goHome">点我进首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter();
const goHome = () => {
  $router.push('/home');
}
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: aquamarine;
  display: flex;
  justify-content: center;

  img {
    width: 800px;
    height: 400px;
    margin: auto 0;
  }

  button {
    width: 100px;
    height: 50px;
    margin: auto 0;
  }
}
</style>