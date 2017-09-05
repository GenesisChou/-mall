import weChatShare from 'libs/weChatShare.js';
module.exports = {
    template: `
    <keep-alive exclude="lottery">
         <router-view></router-view>
    </keep-alive> 
    `,
    data() {
        return {
            game_id: '',
            play_avaliable: false,
            notice: ''
        }
    },
    watch: {
        $route() {
            window.scrollTo(0, 0);
        }
    },
    created() {
        let cache = utils.getLocalStorage(APP.MEDIA_ID);
        const authorize = cache.AUTHORIZE || parseInt(utils.getParameterByName('authorize'));
        this.game_id = parseInt(this.$route.params.id);
        if (authorize === 1) {
            cache.AUTHORIZE = 1;
            utils.setLocalStorage(APP.MEDIA_ID, cache);
            this.getGamesInfor().then(data => {
                const game = data.data;
                this.play_avaliable = (game.is_play === 1);
                this.notice = game.message;
                weChatShare({
                    title: game.title,
                    img: game.pic_thumb_new,
                    desc: game.sub_title,
                    link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&origin=wechat&page=games&game_id=${this.game_id}`
                }).then(share_point => {
                    this.$store.dispatch('getLotteryInfor', this.game_id);
                    this.shareView(share_point);
                })
            });
        } else {
            this.authorize();
        }
    },
    methods: {
        authorize() {
            location.href = `${APP.HOST}/justtong_base_auth/${APP.USER_ID}?callback=${location.href+'?authorize=1'}`;
        },
        getGamesInfor() {
            return new Promise(resolve => {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/game_tool/${this.game_id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                    origin: APP.ORIGIN
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS && typeof resolve === 'function') {
                        resolve(data);
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            });
        },
        shareView(share_point) {
            return new Promise(resolve => {
                this.$http.post(`${APP.HOST}/share_view/${this.game_id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                    origin: APP.ORIGIN,
                    share_point,
                    type: 4
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        if (resolve && typeof resolve === 'function') {
                            resolve();
                        }
                    }
                });
            });
        },
    }
}