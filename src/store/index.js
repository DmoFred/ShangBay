// 引入Vuex  相当于最大的仓库
import Vuex from 'vuex'
import Vue from 'vue'

// 使用插件
Vue.use(Vuex)
// 引入小仓库  模块仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
/* // state 仓库存储数据
const state = {}
// mutations修改state唯一手段
const mutations = {}
// 处理业务逻辑 也可以处理异步
const actions = {}
// 计算属性，用于简化仓库数据 让获取仓库的数据更加方便
const getters = {} */

// 对外暴露store类的实例 如果不暴露，外部无法使用
export default new Vuex.Store({
  // namespace: true,
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})