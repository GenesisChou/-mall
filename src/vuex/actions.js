module.exports = {
    //全局
    //——获取用户信息
    getUserInfor({ dispatch }) {
        this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            dispatch('GET_USER_INFOR', response.data.data);
        }, (response) => {

        })
    },
    //首页
    //——获取热门活动列表
    getHotActivityList({ dispatch }) {
        this.$http.post(`${APP.HOST}/hot_activity`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            dispatch('GET_HOT_ACTIVITY_LIST', response.data.data.list);
        }, (response) => {
            // error callback
        });
    },
    //——获取热门商品列表
    getHotProductList({ dispatch }) {
        this.$http.post(`${APP.HOST}/hot_product`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            dispatch('GET_HOT_PRODUCT_LIST', response.data.data.list);
        }, (response) => {
            // error callback
        });
    },

    //积分明细
    //——获取积分赚取方式
    getIntegralParam({ dispatch }) {
        this.$http.post(`${APP.HOST}/get_integral_param`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            dispatch('GET_INTEGRAL_PARAM',response.data.data);
        }, (response) => {

        })
    },
}
