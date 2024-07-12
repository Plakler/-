<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: "Tabbar"
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, rgb(195, 244, 244), rgb(104, 244, 239), white);
}

.tabbar .tabbar_left {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.tabbar .tabbar_right {
  display: flex;
  align-items: center;
}
</style>