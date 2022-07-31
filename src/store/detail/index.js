import { reqGoodsInfo, reqAddUpdateCart } from '@/api'
// 引入uuid_token.js
import { getUuid } from '@/utils/uuid_token';
const state = {
  goodInfo: {},
  uuidToken: getUuid(),
};
const mutations = {
  GETGOODINFO (state, goodInfo) {
    state.goodInfo = goodInfo
  }
};
const actions = {
  // 获取产品信息的action
  async getGoodInfo ({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品加入购物车中
  async addUpdateCart ({ state, commit, dispatch }, { skuId, skuNum }) {
    //底下即为：加入购物车(修改商品个数)的请求,参数顺序不能瞎写
    let result = await reqAddUpdateCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject()
    }
    // console.log(result)
  }
};
// 简化数据
const getters = {
  // 路径导航简化的数据
  categoryView (state) {
    // return state.goodInfo.categoryView   //直接这样写会报错undefined   因state.goodInfo初始状态空是对象(至少是）
    return state.goodInfo.categoryView || {}
  },
  // 简化产品信息的数据
  skuInfo (state) {
    return state.goodInfo.skuInfo || {}   //同上
  },
  // 产品售卖属性的简化
  spuSaleAttrList (state) {
    return state.goodInfo.spuSaleAttrList || []
  }
};
export default {
  state,
  actions,
  mutations,
  getters
}