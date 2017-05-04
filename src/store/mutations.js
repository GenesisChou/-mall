import Vue from 'vue';
module.exports = {
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
};