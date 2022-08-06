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
import { Button, MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);  // P31 更换Vue.component(typeNav.name, typeNav)
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
// 注册全局组件 添加局部elementUI样式
Vue.component(Button.name, Button);
// elementUI注册组件的时候，还有一种写法挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入MockServe.js --mock数据
import "@/mock/mockServe.js";
// 引入Swiper 样式
import 'swiper/css/swiper.css'
/*  //  测试Search数据接口
import { reqGetSearchInfo } from "@/api"
console.log(reqGetSearchInfo({}));  */
// 统一引入接口api文件夹里面的全部请求函数
import * as api from '@/api'
// console.log(api);

import luffy from '@/assets/luffy.gif'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: luffy
})

/* // 引入自定义插件
import myPlugin from '@/plugins/myPlugin'
Vue.use(myPlugin, {
  name: 'upper'
})*/

// 引入表单校验插件
import '@/plugins/validate'

// 关闭Vue的生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate () {
    //配置全局控制组件
    Vue.prototype.$bus = this //this 是View Model （vue 原型对象/实例
    //配置全局接口
    Vue.prototype.$api = api
  },
  // 注册路由:底下的写法KV一致省略【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库
  store
}).$mount('#app')