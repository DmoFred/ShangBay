import Vue from 'vue';

import App from './App.vue';
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carsousel from '@/components/Carsousel'
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);  // P31 更换Vue.component(typeNav.name, typeNav)
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
// 引入MockServe.js --mock数据
import "@/mock/mockServe.js";
// 引入Swiper 样式
import 'swiper/css/swiper.css'
/*  //  测试Search数据接口
import { reqGetSearchInfo } from "@/api"
console.log(reqGetSearchInfo({}));  */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate () {
    Vue.prototype.$bus = this //this 是View Model （vue 原型对象/实例
  },
  // 注册路由:底下的写法KV一致省略【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库
  store
}).$mount('#app')