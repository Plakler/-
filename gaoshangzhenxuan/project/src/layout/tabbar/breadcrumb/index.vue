<template>
  <el-icon style="margin-right: 10px;" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 3px; vertical-align: middle;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
//@ts-ignore
import { ref } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore = useLayOutSettingStore();
let $route = useRoute();
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
}
</script>
<script lang="ts">
export default {
  name: "Breadcrumb"
}
</script>
<style scoped></style>