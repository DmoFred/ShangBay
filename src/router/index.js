// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'

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
  (resolve && reject)
    ? originReplace.call(this, location, resolve, reject)
    : originReplace.call(this, location, () => { }, () => { });
}

// 配置路由
const router = new VueRouter({
  // 配置路由
  routes,
  // 路由跳转detail页面滚动条处在最上方
  scrollBehavior (to, from, savedPosition) {
    // 返回的这个y=0，代表的滚动条在最上方
    return { y: 0 }
  },
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  // to：可以获取到你要跳转到哪个路由信息
  // console.log(to)
  // from：可以获取到你从哪个路由来的信息
  // next：放行函数     next()放行
  // next('/login')  next('path') 放行到指定路由   next(false) 取消当前的导航，返回到从哪跳转--打哪来回哪去
  // 为了测试全都放行
  // next()
  // console.log(store);
  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo
  // 已登录
  if (token) {
    // 如果用户已登录 要去login页面 做判断
    if (to.path == '/login') {
      // next('/home')  or  next('/')
      next('/home')
      // console.log(111)
      // 登录了，去的可能不是login|home|search|detail|shopcart
    } else {
      // next()
      // console.log(678);
      // 如果用户名已有
      if (name) {
        next()
        // console.log(222)
      } else {
        // 没有用户信息,派发action让仓库存储用户信息再跳转
        try {
          // 获取用户信息，派发action让仓存储用户信息成功
          await store.dispatch('getUserInfo')
          next()
          // console.log(333)
        } catch (error) {
          // token失效 获取不到用户信息，重新登录
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
          // console.log(666)
        }
      }
    }
    // 未登录
  } else {
    next()
    // console.log(888)
  }

})



export default router