import Vue from 'vue'
import Vuex from 'vuex'
//导入某一个函数
//vue的状态管理
Vue.use(Vuex)

const state = { //状态，用于组件之间的通讯
    reflushObj: {},
}

const mutations = { //立即触发状态，用于同步进行状态触发
    reflushObj(state, reflushObj) {
        state.reflushObj = reflushObj;
    }
}

const actions = { //异步触发状态，用户异步触发mutations,从而更改状态
    reflushObj({commit}, reflushObj) {
        commit('reflushObj', reflushObj)
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})