import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import type { UserState } from './types/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';
import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type';
import router from '@/router';
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  })
}
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        this.token = (result.data as string);
        SET_TOKEN(result.data as string);
        return 'ok';
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout() {
      let result: any = await reqLogout();
      if (result.code == 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    }
  },
  getters: {

  }
})
export default useUserStore;