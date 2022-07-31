import { reqCartList, reqDeleteCart, reqUpdateChecked } from "@/api"
const state = {
    cartList: []
}
const mutations = {
    GETSHOPCART (state, data) {
        state.cartList = data;
    }
}
const actions = {
    // 获取购物车列表的数据
    async getCartList ({ commit, state, dispatch }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETSHOPCART', result.data)
        }
        // 在视频P75(38:23) 添加了这个打印
        // console.log(result);
    },
    //删除某一个商品的数据
    async deleteCartById ({ commit, state, dispatch }, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    //修改某一个商品勾选状态
    async changeChecked ({ commit, state, dispatch }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    //删除选中的商品  资料源码
    /* deleteAllCart ({ commit, state, dispatch }) {
        let arr = [];
        //获取仓库里面购物车的数据
        state.cartList[0].cartInfoList.forEach(item => {
            //商品的勾选状态是勾选的,发请求一个一个删除
            if (item.isChecked == 1) {
                let ps = dispatch('deleteCartById', item.skuId);
                arr.push(ps);
            }
        })
        return Promise.all(arr);
    } */
    // 视频教学
    deleteAllCart ({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            // console.log(123);
            let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
            //   console.log(result); // 返回的是一个promise对象
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    //修改全部商品的勾选的状态
    allUpdateChecked ({ commit, state, dispatch }, isChecked) {
        let arr = [];
        //获取购物车商品的个数,进行遍历
        state.cartList[0].cartInfoList.forEach(item => {
            //调用修改某一个商品的action【四次】
            let ps = dispatch("changeChecked", { skuId: item.skuId, isChecked });
            arr.push(ps);
        })
        //Promise.all():参数需要的是一个数组【数组里面需要promise】
        //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
        //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
        return Promise.all(arr);
    },
}
const getters = {
    cartList (state) {
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}