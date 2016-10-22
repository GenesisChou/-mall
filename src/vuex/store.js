"use strict";
import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)
    // 创建一个对象来保存应用启动时的初始状态
const state = {
    // TODO: 放置初始状态
    user: '', //用户信息
    hot_activity_list:'',//热门活动列表
    hot_product_list:'',//热门商品列表
    integral_param: '' //积分获取方式
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    // TODO: 放置我们的状态变更函数
    //全局
    //——获取用户信息
    GET_USER_INFOR(state, data) {
        state.user = data;
    },
    //首页
    //——获取热门活动列表
    GET_HOT_ACTIVITY_LIST(state, data) {
        state.hot_activity_list = data;
    },
    //——获取热么商品列表
    GET_HOT_PRODUCT_LIST(state, data) {
        state.hot_product_list = data;
    },
    //积分明细
    //——获取赚取积分方式
    GET_INTEGRAL_PARAM(state, data) {
        state.integral_param = data;
    }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})
