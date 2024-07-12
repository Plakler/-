import SvgIcon from './SvgIcon/index.vue';
import Pagination from "./Pagination/index.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Category from './Category/index.vue';
const allGloablComponent: any = { SvgIcon, Pagination, Category };
export default {
  //@ts-ignore
  install(app) {
    Object.keys(allGloablComponent).forEach(key => {
      app.component(key, allGloablComponent[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}