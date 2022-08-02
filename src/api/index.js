// 当前这个模块：API进行统一管理
import requests from './request';
import mockRequests from './mockAjax'

// 三级联动接口
//  /api/product/getBaseCategoryList  get 无参数

export const reqCategoryList = () => {
  // 发请求: axios发请求返回结果是Promise对象  获取三累类级列表数据
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
// export const reqgetCategoryList = () => requests.get(`/product/getBaseCategoryList`) // P34更改 变为ES6模板字符串
// 获取banner（home 首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取search模块数据 地址：/api/list  请求方式：post 需要带参数
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口 URL： /api/item/{skuId}  请求方式：get
// export const reqDetailList = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});  源码更换了接口名为reqDetailList
export const reqGoodsInfo = (skuId) => requests.get(`/item/${skuId}`)

// 将产品添加到购物车中(获取更新某一产品的个数)         请求方式：post 需要带参数
export const reqAddUpdateCart = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 获取购物车列表数据接口
export const reqCartList = () => requests.get(`/cart/cartList`)

//删除某一个商品的接口
// export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
export const reqDeleteCart = (skuId) => requests.delete(`/cart/deleteCart/${skuId}`);


//修改某一个商品的勾选的状态
export const reqUpdateChecked = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`);

// 获取验证码 /user/passport/sendCode/{phone} get方式
export const reqAuthCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

// 注册 /user/passport/register  带的参数phone password code  post方式
export const reqRegister = (data) => requests.post(`/user/passport/register`, data)

// 登录 /user/passport/login  post请求   params：phone password
export const reqLogin = (data) => requests.post(`/user/passport/login`, data)

// 获取用户登录信息【需要带着用户token去向服务器发请求要用户信息】，用户登录只保存用户的token token校验 
// http://182.92.128.115/api/user/passport/auth/getUserInfo 
export const reqUserInfo = () => requests.get(`/user/passport/auth/getUserInfo`)

// 退出登录   /user/passport/logout  get方式
export const reqLogout = () => requests.get(`/user/passport/logout`)


// /user/userAddress/auth/findUserAddressList    获取用户地址信息  get方式
