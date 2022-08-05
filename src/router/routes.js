// 引入路由组件  一级路由
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupShopOrder from '@/pages/Center/groupShopOrder'
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
    path: '/trade',
    component: Trade,
    //路由元信息,控制当前路由是否需要Footer组件
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 如果想去交易页面，必须是从shopcart购物车来的
      if (from.path == '/shopcart') {
        next()
      } else {
        // 其他的路由组件而来，停留在当前
        next(false)
      }
    }
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
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
  },
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: 'myorder',
        component: myOrder,
      }, {
        path: 'groupshoporder',
        component: groupShopOrder
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path: '*',
    redirect: '/home'
  }
]