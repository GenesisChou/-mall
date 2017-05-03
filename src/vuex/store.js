import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
        // TODO: 放置初始状态
        user: '', // 用户信息
        address_list: '', // 用户地址列表
        v_alert: {
            type: 'suprise',
            show: false,
            close_btn: false,
            msg: '',
            btn_text: '',
            img: '',
            callback: function () {},
            callback_close: function () {}
        },
        v_confirm: {
            show: false,
            msg: '',
            msg_second: '',
            callback: function () {}
        },
        v_loading: {
            show: false
        }
    },
    mutations = {
        // 全局
        // 显示/关闭弹窗
        toggleAlert(state, alert = {}) {
            state.v_alert.show = !state.v_alert.show;
            state.v_alert.close_btn = alert.close_btn;
            state.v_alert.msg = alert.msg;
            state.v_alert.callback = alert.callback;
            state.v_alert.callback_close = alert.callback_close;
            state.v_alert.btn_text = alert.btn_text;
            state.v_alert.type = alert.type;
            state.v_alert.img = alert.img;
        },
        toggleConfirm(state, confirm = {}) {
            state.v_confirm.show = !state.v_confirm.show;
            state.v_confirm.msg = confirm.msg;
            state.v_confirm.msg_second = confirm.msg_second;
            state.v_confirm.callback = confirm.callback;
        },
        toggleLoading(state) {
            state.v_loading.show = !state.v_loading.show;
        },
        // 获取用户信息
        getUserInfor(state, callback) {
            Vue.http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                state.user = response.data.data;
                if (callback) {
                    callback(response);
                }
            }, (response) => {

            });
        },
        // 获取地址列表
        getAddressList(state, callback) {
            Vue.http.post(`${APP.HOST}/address_list/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                state.address_list = response.data.data;
                if (callback) {
                    callback(response.data.data);
                }
            }, (response) => {

            });
        },
        pageView(state, page_id) {
            Vue.http.post(`${APP.HOST}/page_view`, {
                token: APP.TOKEN,
                user_id: APP.USER_ID,
                page_id,
                media_id: APP.MEDIA_ID,
                open_id: APP.OPEN_ID
            });
        },
    },
    actions = {
        // 全局
        // 显示/关闭 弹窗
        toggleAlert({
            commit
        }, alert) {
            commit('toggleAlert', alert);
        },
        toggleConfirm({
            commit
        }, confirm) {
            commit('toggleConfirm', confirm);
        },
        toggleLoading({
            commit
        }, loading) {
            commit('toggleLoading');
        },
        // ——获取用户信息
        getUserInfor({
            commit
        }, callback) {
            commit('getUserInfor', callback);
        },
        getAddressList({
            commit
        }, callback) {
            commit('getAddressList', callback);
        },
        pageView({
            commit
        }, page_id) {
            commit('pageView', page_id);
        },
    },
    store = new Vuex.Store({
        state,
        mutations,
        actions
    });
module.exports = store;