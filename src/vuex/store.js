"use strict";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    // TODO: 放置初始状态
    user: '', //用户信息
    hot_items:'',
    hot_banners:'',
    integral_param: '', //积分获取方式
    integral_list: '', //积分明细
    v_alert: {
        type: 'suprise',
        show: false,
        event: 'close',
        msg: '',
        btn_text: '',
        cover_close: true,
        callback: function() {}
    },
    v_confirm:{
        show:false,
        msg:'',
        callback:function(){}
    }
}

const mutations = {
    //全局
    //显示/关闭弹窗
    toggleAlert(state, alert = {}) {
        state.v_alert.show = !state.v_alert.show;
        state.v_alert.msg = alert.msg;
        state.v_alert.callback = alert.callback;
        state.v_alert.cover_close = alert.cover_close;
        state.v_alert.btn_text = alert.btn_text;
        state.v_alert.type = alert.type;
    },
    toggleConfirm(state,confirm={}){
        state.v_confirm.show = confirm.show;
        state.v_confirm.msg = confirm.msg;
        state.v_confirm.callback = confirm.callback;

    },
    //——获取用户信息
    getUserInfor(state, callback) {
        Vue.http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.user = response.data.data;
            if (callback) {
                callback();
            }
            // dispatch('GET_USER_INFOR', response.data.data);
            // Vue.etIntegralList(); //每次更新用户信息,必定更新积分明细列表
        }, (response) => {

        })
    },
    //首页
    //签到
    checkIn(state, callback) {
        if (!state.user.ischecked) {
            Vue.http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                if (data.status ==APP.SUCCESS) {

                    store.dispatch('getUserInfor');
                    if (callback) {
                        callback();
                    }
                }else{
                    store.dispatch('toggleAlert',{msg:data.info})
                }
            }, (response) => {

            })
        }
    },
    //热门banner列表
    getHotBanners(state){
        Vue.http.post(`${APP.HOST}/hot_banner`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.hot_banners = response.data.data.list;
        }, (response) => {
        });
    },
    //  热门商品和活动列表，用于首页列表
    getHotItems(state){
        Vue.http.post(`${APP.HOST}/hot_item`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.hot_items = response.data.data.list;
        }, (response) => {
        });
    },
    //积分明细
    //——获取积分赚取方式
    getIntegralParam(state) {
        Vue.http.post(`${APP.HOST}/get_integral_param`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.integral_param = response.data.data;
        }, (response) => {

        })
    },
    //——获取积分明细列表
    getIntegralList(state) {
        Vue.http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.integral_list = response.data.data;
        })
    },

}
const actions = {
    //全局
    //显示/关闭 弹窗
    toggleAlert({ commit }, alert) {
        commit('toggleAlert', alert);
    },
    toggleConfirm({commit},confirm){
        commit('toggleConfirm',confirm);
    },
    //——获取用户信息
    getUserInfor({ commit }, callback) {
        commit('getUserInfor', callback);
    },
    //首页
    //签到
    checkIn({ commit }, callback) {
        commit('checkIn', callback);
    },
    getHotItems({commit}){
        commit('getHotItems');
    },
    getHotBanners({commit}){
        commit('getHotBanners');
    },
    //积分明细
    //——获取赚取积分方式
    getIntegralParam({ commit }) {
        commit('getIntegralParam');
    },
    //——获取积分明细
    getIntegralList({ commit }) {
        commit('getIntegralList');
    },
    //获取商品列表
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
});

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
module.exports = store;
