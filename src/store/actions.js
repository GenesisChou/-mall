import Vue from 'vue';
module.exports = {
    // 全局
    // 显示/关闭 弹窗
    toggleAlert(context, alert) {
        context.commit('toggleAlert', alert);
    },
    toggleConfirm(context, confirm) {
        context.commit('toggleConfirm', confirm);
    },
    toggleLoading(context, loading) {
        context.commit('toggleLoading');
    },
    getUserInfor(context, callback) {
        context.commit('getUserInfor', callback);
    },
    updateIntegral(context, integral) {
        if (typeof integral === 'number' && integral >= 0) {
            context.commit('updateIntegral', integral);
        }
    },
    getTitle(context, callback) {
        context.commit('getTitle', callback);
    },
    getAddressList(context, callback) {
        context.commit('getAddressList', callback);
    },
    pageView(context, page_id) {
        context.commit('pageView', page_id);
    },
    currentPageView(context, page_id) {
        context.commit('currentPageView', page_id);
    },
    updateItemView(context, view_id) {
        context.commit('updateItemView', view_id);
    },
    updatePageView(context, view_id) {
        context.commit('updatePageView', view_id);
    },
    savePosition(context, callback) {
        context.commit('savePosition', callback);
    },
    changeCurrentSignature(context, name) {
        context.commit('changeCurrentSignature', name);
    },
    getQrCode(context, callback) {
        return new Promise(resolve => {
            Vue.http.post(`${APP.HOST}/get_qr_code`, {
                token: APP.TOKEN,
                media_id: APP.MEDIA_ID,
                user_id: APP.USER_ID,
                open_id: APP.OPEN_ID,
                origin: APP.ORIGIN
            }).then((response) => {
                const data = response.data;
                if (data.status === APP.SUCCESS) {
                    context.commit('getQrCode', data.data);
                }
                if (typeof resolve === 'function') {
                    resolve(data.data);
                }
            });
        });
    },
};