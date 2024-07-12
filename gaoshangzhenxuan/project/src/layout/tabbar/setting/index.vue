<template>
  <el-button size="small" icon="Refresh" circle @click="updataRefresh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="250" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="setColor" :teleported="false" size="small" v-model="color" show-alpha
          :predefine="predefineColors" />
      </el-form-item>
      <!-- 我觉得暗黑模式得改成全局都是暗黑的 -->
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" style="margin-left: 24px;" inline-prompt size="large"
          active-icon="MoonNight" inactive-icon="Sunrise" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <img :src="userStore.avatar" style="width: 24px;height: 24px;margin: 0 10px;border-radius: 50%">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
let layoutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let dark = ref<boolean>(false);
const updataRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
}
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
const logout = async () => {
  await userStore.userLogout();
  $router.push({ path: '/login', query: { redirect: $route.path } });
}
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const changeDark = () => {
  let html = document.documentElement;
  dark.value ? html.className = 'dark' : html.className = '';
}
const setColor = () => {
  const html = document.documentElement;
  html.style.setProperty('--el-color-primary', color.value);
}
</script>
<script lang="ts">
export default {
  name: "Setting"
}
</script>

<style scoped></style>