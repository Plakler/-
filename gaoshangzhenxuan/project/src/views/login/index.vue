<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到羔尚甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
//@ts-ignore
import { getTime } from '@/utils/time';
//@ts-ignore
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
let loginForms = ref();
let $router = useRouter();
let $route = useRoute();
let loading = ref(false);
let loginForm = reactive({ username: 'admin', password: '111111' })
const login = async () => {
  await loginForms.value.validate();
  loading.value = true;
  try {
    await useStore.userLogin(loginForm);
    let redirect: any = $route.query.redirect;
    $router.push({ path: redirect || '/' });
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
//@ts-ignore
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (/^\w{4,12}$/.test(value)) {
    callback();
  } else {
    callback(new Error('账号长度至少为四位，最多不超过十二位！'))
  }
}
//@ts-ignore
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (/^\w{6,16}$/.test(value)) {
    callback();
  } else {
    callback(new Error('密码长度至少为六位，最多不超过十六位！'))
  }
}
const rules = {
  //@ts-ignore
  username: [
    // {required: true,min:4,max:12,message:'账号长度至少为四位，最多不超过十二位！',trigger:'change'}
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    // {required: true,min:6,max:16,message:'密码长度至少为六位，最多不超过十六位！',trigger:'change'}
    { trigger: 'change', validator: validatorPassword }
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
}

h1 {
  color: white;
  font-size: 40px;
}

h2 {
  font-size: 20px;
  color: white;
  margin: 20px 0;
}

.login_btn {
  width: 100%;
}
</style>