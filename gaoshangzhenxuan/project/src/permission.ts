import router from '@/router';
import setting from './setting';
//@ts-ignore
import nprogress from 'nprogress';
import "nprogress/nprogress.css";
import useUserStore from './store/modules/user';
import pinia from './store';
nprogress.configure({ showSpinner: false });
let userStore = useUserStore(pinia);
// @ts-ignore
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`;
  nprogress.start();
  let token = userStore.token;
  let username = userStore.username;
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo();
          // 我将next({ ...to })改为next({ ...to, replace: true })
          next({ ...to, replace: true });
        } catch (error) {
          await userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
});
// @ts-ignore
router.afterEach((to: any, from: any) => {
  nprogress.done();
});
