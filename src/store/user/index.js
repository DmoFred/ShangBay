// 引入API请求
import { reqAuthCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'

// 注册与登录模块
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
}
const mutations = {
    GETAUTHCODE (state, code) {
        state.code = code
    },
    USERLOGIN (state, token) {
        state.token = token
    },
    GETUSERINFO (state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地用户登录数据
    CLEAR (state) {
        state.token = ''
        state.userInfo = {}
        //删除token
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    // 获取验证码
    async getCode ({ commit }, phone) {
        let result = await reqAuthCode(phone)
        // console.log(result)
        if (result.code == 200) {
            commit('GETAUTHCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户点击注册按钮
    async userRegister ({ commit }, user) {
        let result = await reqRegister(user)
        // console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败！请重试'))
        }
    },
    // 登录业务【token】
    async userLogin ({ commit }, data) {
        let result = await reqLogin(data)
        // console.log(result);
        // 服务器下发token，用户唯一标识符（类似UUID）
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化存储
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('账号或密码错误，请重试！'))
        }
    },
    // 获取用户信息
    async getUserInfo ({ commit }) {
        let result = await reqUserInfo()
        // console.log(result);
        if (result.code == 200) {
            // 提交用户信息 用户已经登录成功且获取到token
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout ({ commit }) {
        let result = await reqLogout()
        // action里面不能操作state，需要提交mutation修改state
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}