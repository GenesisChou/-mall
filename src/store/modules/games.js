import Vue from 'vue';
module.exports = {
    state: {
        lottery_infor: {
            notice: '',
            type: '',
            avaliable: false,
            lottery_show: false
        }
    },
    mutations: {
        getLotteryInfor(state, data) {
            const temp = data.data;
            state.lottery_infor.notice = temp.message;
            state.lottery_infor.avaliable = (temp.is_draw === 1);
            state.lottery_infor.type = temp.draw_type;
            state.lottery_infor.lottery_show = (temp.is_show === 1);
        }
    },
    actions: {
        getLotteryInfor(context, game_id) {
            return new Promise(resolve => {
                Vue.http.post(`${APP.HOST}/is_game_draw/${game_id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                    origin: APP.ORIGIN,
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        context.commit('getLotteryInfor', data);
                    }
                });
            })
        }
    },
};