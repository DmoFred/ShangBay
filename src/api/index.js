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
