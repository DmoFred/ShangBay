// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 配置路由信息
export default [
  {
    path: '/home',
    component: Home,
    meta: { show: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true }
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    //路由元信息,控制当前路由是否需要Footer组件
    meta: { show: true },
  },
  {
    path: '/shopcart',
    component: ShopCart,
    //路由元信息,控制当前路由是否需要Footer组件
    meta: { show: true },
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: '*',
    redirect: '/home'
  }
]