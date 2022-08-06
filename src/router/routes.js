/* 
// 引入路由组件  一级路由
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由
// import myOrder from '@/pages/Center/myOrder'
// import groupShopOrder from '@/pages/Center/groupShopOrder' 
*/

// 路由懒加载第二种  一级路由
const Search = () => import('@/pages/Search');
const Login = () => import('@/pages/Login');
const Register = () => import('@/pages/Register');
const Detail = () => import('@/pages/Detail');
const AddCartSuccess = () => import('@/pages/AddCartSuccess');
const ShopCart = () => import('@/pages/ShopCart');
const Trade = () => import('@/pages/Trade');
const Pay = () => import('@/pages/Pay');
const PaySuccess = () => import('@/pages/PaySuccess');
const Center = () => import('@/pages/Center');
// 二级路由
const myOrder = () => import('@/pages/Center/myOrder');
const groupShopOrder = () => import('@/pages/Center/groupShopOrder');

/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

// 配置路由信息
export default [
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到home首页
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    // 路由懒加载第一种
    component: () => import('@/pages/Home'),
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
    // beforeEnter: (to, from, next) => {
    // 如果想去交易页面，必须是从shopcart购物车来的
    // if (from.path == '/shopcart') {
    //   next()
    // } else {
    //   // 其他的路由组件而来，停留在当前
    //   next(false)
    // }
    // }
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    // 路由独享守卫
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
  //其他页面为404
  {
    path: '*',
    name: 'Error',
    component: () => import('@/pages/Error'),
  }
]