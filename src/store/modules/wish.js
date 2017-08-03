import Vue from 'vue';
module.exports = {
    state: {
        banners: []
    },
    mutations: {
        getWishBanners(state) {
            Vue.http.post(`${APP.HOST}/wish_wall_banner`, {
                token: APP.TOKEN,
                media_id: APP.MEDIA_ID,
                user_id: APP.USER_ID,
                open_id: APP.OPEN_ID,
            }).then((response) => {
                const data = response.data;
                if (data.status === APP.SUCCESS) {
                    state.banners = data.data.items;
                }
            });
        }
    },
    actions: {
        getWishBanners(context) {
            context.commit('getWishBanners');
        }
    },
};