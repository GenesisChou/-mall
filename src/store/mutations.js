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
            const data = response.data;
            if (data.status === APP.SUCCESS) {
                state.user = data.data;
            }
            if (callback && typeof callback === 'function') {
                callback(response);
            }
        });
    },
    getTitle(state, callback) {
        Vue.http.post(`${APP.HOST}/imall_title`, {
            token: APP.TOKEN,
            userid: APP.USER_ID,
            media_id: APP.MEDIA_ID
        }).then((response) => {
            const data = response.data;
            if (data.status === APP.SUCCESS) {
                state.title = data.data.imall_title;
                if (callback && typeof callback === 'function') {
                    callback(response);
                }
            }
        });
    },
    // 获取地址列表
    getAddressList(state, callback) {
        Vue.http.post(`${APP.HOST}/address_list/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            const data = response.data;
            if (data.status === APP.SUCCESS) {
                state.address_list = data.data;
                if (callback && typeof callback === 'function') {
                    callback(data.data);
                }
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
            open_id: APP.OPEN_ID,
            origin: APP.ORIGIN || 'menu'
        }).then(response => {
            const data = response.data;
            if (data.status === APP.SUCCESS) {
                state.update_page_id = data.data;
            }
        });
    },
    currentPageView(state, page_id) {
        Vue.http.post(`${APP.HOST}/current_page_view`, {
            token: APP.TOKEN,
            user_id: APP.USER_ID,
            page_id,
            media_id: APP.MEDIA_ID,
            open_id: APP.OPEN_ID,
            origin: APP.ORIGIN || 'menu'
        });
    },
    updateItemView(state, view_id) {
        Vue.http.post(`${APP.HOST}/update_item_view/${view_id}`, {
            token: APP.TOKEN,
            media_id: APP.MEDIA_ID,
            user_id: APP.USER_ID,
            open_id: APP.OPEN_ID,
        });
    },
    updatePageView(state) {
        Vue.http.post(`${APP.HOST}/update_page_view/${state.update_page_id}`, {
            token: APP.TOKEN,
            media_id: APP.MEDIA_ID,
            user_id: APP.USER_ID,
            open_id: APP.OPEN_ID,
        });
    },
    savePosition(state, callback) {
        if (callback && typeof callback === 'function') {
            callback(state.position);
        }
    },
    changeCurrentSignature(state, name) {
        state.current_signature_page = name;
    },
    getQrCode(state, qr_code) {
        state.qr_code = qr_code;
    },
};