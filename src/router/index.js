// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)


//备份VueRouter.prototype原有的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  //函数对象的apply与call的区别?
  //相同点:都可以改变函数的上下文一次，而且函数会立即执行一次
  //不同：函数执行的时候，传递参数不同，apply需要的是数组，call传递参数的时候用逗号隔开
  //原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter类的实例
  //第一种情况：外部在使用push的时候传递成功与失败的回调
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    //第二种情况：外部在使用push方法的时候没有传递成功与失败的回调函数
    originPush.call(this, location, () => { }, () => { });
  }
}
//重写VueRouter.prototype.replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  (resolve && reject) ? originReplace.call(this, location, resolve, reject) : originReplace.call(this, location, () => { }, () => { });
}

// 配置路由
export default new VueRouter({
  // 配置路由
  routes,
  // 路由跳转detail页面滚动条处在最上方
  scrollBehavior (to, from, savedPosition) {
    // 返回的这个y=0，代表的滚动条在最上方
    return { y: 0 }
  },
})