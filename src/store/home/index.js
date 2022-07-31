import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
// home模块的小仓库
const state = {
  //state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回初始化】
  // home 仓库中存储三级菜单的数据
  categoryList: [],
  // 轮播图数据/图片
  bannerList: [],
  // floor数据/ 家用电器
  floorList: [],
}
//mutations是唯一修改state的地方
const mutations = {
  CATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST (state, floorList) {
    state.floorList = floorList
  }
}
// actions用户处理派发actions地方的，可以书写异步语句，自己逻辑地方
const actions = {
  // 通过API里面的接口函数函数调用，向服务器发送请求，获取服务器的数据
  // 需要用await接受成功返回的结果，await必须要结合async一起使用，async可以没有await；但用await必须前面加async
  async categoryList ({ commit }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      // 提交mutation
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList ({ commit }) {
    let result = await reqGetBannerList()
    // console.log(result)
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  //获取floor数据
  async getFloorList ({ commit }) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}

// 计算属性
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}