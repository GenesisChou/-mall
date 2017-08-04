import Vue from 'vue';
module.exports = {
    state: {
        banners: [],
        wish_wall: ''
    },
    mutations: {
        getWishBanners(state, banners) {
            state.banners = banners;
        },
        getWishWall(state, wish_wall) {
            state.wish_wall = wish_wall;
        }
    },
    actions: {
        getWishBanners(context) {
            return new Promise(resolve => {
                Vue.http.post(`${APP.HOST}/wish_wall_banner`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        context.commit('getWishBanners', data.data.items);
                        resolve(data);
                    }
                });
            });
        },
        getWishWall(context) {
            return new Promise((resolve, reject) => {
                Vue.http.post(`${APP.HOST}/wishes_wall`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        context.commit('getWishWall', data.data);
                        if (typeof resolve === 'function') {
                            resolve(data);
                        }
                    } else {
                        reject();
                    }
                }, () => {
                    reject();
                });
            });
        }
    },
};