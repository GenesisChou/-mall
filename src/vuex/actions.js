module.exports = {
    getUserInfor({ dispatch }) {
        this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            let data = response.data;
            dispatch('GET_USER_INFOR', data.data);
        }, (response) => {

        })

    }
}
