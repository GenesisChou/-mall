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
    // ——获取用户信息
    getUserInfor(context, callback) {
        context.commit('getUserInfor', callback);
    },
    getAddressList(context, callback) {
        context.commit('getAddressList', callback);
    },
    pageView(context, page_id) {
        context.commit('pageView', page_id);
    },
};