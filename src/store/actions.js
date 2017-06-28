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
    getTitle(context, callback) {
        context.commit('getTitle', callback);
    },
    getAddressList(context, callback) {
        context.commit('getAddressList', callback);
    },
    pageView(context, page_id) {
        context.commit('pageView', page_id);
    },
    savePosition(context, callback) {
        context.commit('savePosition', callback);
    },
    changeCurrentSignature(context, name) {
        context.commit('changeCurrentSignature', name);
    },
    getQrCode(context, callback) {
        context.commit('getQrCode', callback);
    },
};