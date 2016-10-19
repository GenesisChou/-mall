module.exports = {
    setUser({ dispatch }) {
        this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then((response) => {
            let data = response.data;
            dispatch('SET_USER', data.data);
        }, (response) => {

        })

    }
}
