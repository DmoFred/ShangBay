import { reqGetSearchInfo } from '@/api'
// search模块的小仓库
const state = {
  searchList: {} // 服务器请求的数据（对象名  不能瞎起 根据请求的数据 例：search模块里（Vuex里看)state里 searchList:Object
};
const mutations = {
  GETSEARCHLIST (state, searchList) {
    state.searchList = searchList;
  }
};
const actions = {
  // 获取Search模块数据
  async getSearchList ({ commit }, params = {}) {
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    // params 形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
};
// 计算属性，在项目中，为了简化数据而生，
const getters = {
  //简化数据
  goodsList (state) {
    // 当前形参state是当前仓库的state，并非是大仓库的那个state
    // console.log(state);
    // return state.searchList.goodsList     // 这样书写是有问题的之后会有问题 如果服务器数据回来了，没问题是一个数组
    // 假如网络不给力/没有网的情况下(数据返回不为空) 会返回的是undefined;所以需要后面加上 || []
    return state.searchList.goodsList || [];
  },
  trademarkList (state) {
    return state.searchList.trademarkList
  },
  attrsList (state) {
    return state.searchList.attrsList
  },
};
export default {
  state,
  mutations,
  actions,
  getters
}