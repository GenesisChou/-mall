"use strict";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
    // TODO: 放置初始状态
    user: '', //用户信息
    hot_activity_list: '', //热门活动列表
    hot_product_list: '', //热门商品列表
    integral_param: '', //积分获取方式
    integral_list: '', //积分明细
    v_alert: {
        type: 'suprise',
        show: false,
        event:'close',
        msg: '',
        btn_text:'',
        cover_close:true,
        callback: function() {}
    },
    v_modal: {
        show: false
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
    },
    toggleModal(state) {
        state.v_modal.show = !state.v_modal.show;
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
    checkIn(state) {
        if (!state.user.ischecked) {
            Vue.http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                store.dispatch('getUserInfor', function() {
                    store.dispatch('toggleAlert', { msg: '签到成功' });
                });
            }, (response) => {

            })
        } else {
            store.dispatch('toggleAlert', { msg: '已签到' });
        }
    },
    //——获取热门活动列表
    getHotActivityList(state) {
        Vue.http.post(`${APP.HOST}/hot_activity`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.hot_activity_list = response.data.data.list;
            // dispatch('GET_HOT_ACTIVITY_LIST', response.data.data.list);
        }, (response) => {
            // error callback
        });
    },
    //——获取热门商品列表
    getHotProductList(state) {
        Vue.http.post(`${APP.HOST}/hot_product`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            state.hot_product_list = response.data.data.list;
        }, (response) => {
            // error callback
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
    toggleModal({ commit }) {
        commit('toggleModal');
    },
    //——获取用户信息
    getUserInfor({ commit }, callback) {
        commit('getUserInfor', callback);
    },
    //首页
    //签到
    checkIn({ commit }) {
        commit('checkIn');
    },
    //——获取热门活动列表
    getHotActivityList({ commit }) {
        commit('getHotActivityList');
    },
    //——获取热么商品列表
    getHotProductList({ commit }) {
        commit('getHotProductList');
    },
    //积分明细
    //——获取赚取积分方式
    getIntegralParam({ commit }) {
        commit('getIntegralParam');
    },
    //——获取积分明细
    getIntegralList({ commit }) {
        commit('getIntegralList');
    }
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
});

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
module.exports = store;
