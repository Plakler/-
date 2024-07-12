<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar">
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀！{{ userStore.username }}</h3>
        <p class="subtitle">羔尚甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="sbottom">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: lawngreen;
    }
  }
}

.sbottom {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>