<style lang='scss' scoped>
    .activity-detail {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
        overflow: hidden;
    }

    .activity-detail-content {
        flex: 1;
    }
</style>
<template>
    <div class='activity-detail'>
        <div class='activity-detail-content'>
            <keep-alive>
                <component :is='activity_type' :free-times='free_times>>0' :fresh-free-times='freshFreeTimes' :activity-detail='activity_detail'
                    :id='activity_id>>0' :notice='notice' :to-order-detail='toOrderDetail' :toggleDialog='toggleDialog' :is-off='is_off'>
                </component>
            </keep-alive>
        </div>
        <v-dialog :show='dialog_show' :dialog='dialog' :toggle-dialog='toggleDialog'></v-dialog>
        <v-support></v-support>
    </div>
</template>
<script>
    /*global APP */
    import vDialog from './components/vDialog';
    import weChatShare from 'libs/weChatShare.js';
    export default {
        name: 'activityDetail',
        components: {
            vDialog,
            quiz: require('./components/quiz'),
            scrap: require('./components/scrap'),
            game: require('./components/game'),
            shake: require('./components/shake'),
            fortune: require('./components/fortune'),
            egg: require('./components/egg'),
            machine: require('./components/machine'),
            treasure: require('./components/treasure'),
            doll: require('./components/doll'),
            card: require('./components/card'),
            tear: require('./components/tear'),
            marble: require('./components/marble')
        },
        data() {
            return {
                activity_id: '',
                activity_detail: {},
                activity_type: '',
                free_times: '',
                dialog_show: false,
                dialog: {}
            };
        },
        computed: {
            notice() {
                return this.free_times > 0 ? `您还剩余${this.free_times}次免费机会` :
                    `消耗积分${this.activity_detail.integral >> 0}`;
            },
            is_off() {
                return this.activity_detail.status === 1;
            }
        },
        beforeRouteEnter(to, from, next) {
            const $script = require('scriptjs');
            $script('http://m.goldmiao.com/yngame/air.min.1.0.1.js', () => {
                next();
            });
        },

        created() {
            this.activity_id = this.$route.query.activity_id;
            this.getActivityDetail().then(data => {
                this.activity_type = this.getActivityType(this.activity_detail.type);
                weChatShare({
                    router: this.$route,
                    title: this.activity_detail.name,
                    img: this.activity_detail.pic_thumb_new,
                    desc: this.activity_detail.name_show,
                    link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&page=activity_detail&activity_id=${this.activity_id}`
                }).then(() => {
                    return this.shareView();
                }).then(() => {
                    this.getActivityDetail();
                });
            });
            this.getFreeTimes();
        },
        methods: {
            //获取活动详情
            getActivityDetail() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/activity_detail_l/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.activity_detail = data.data;
                        }
                        if (resolve && typeof resolve === 'function') {
                            resolve(data);
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            //获取免费活动次数
            getFreeTimes() {
                this.$http.post(`${APP.HOST}/get_free_times/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    activity_id: this.activity_id
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.free_times = data.data.free_times;
                    }
                });
            },
            //刷新免费次数 刷新用户信息
            freshFreeTimes() {
                this.$store.dispatch('getUserInfor');
                this.getFreeTimes();
            },
            //中奖后的路由跳转
            toOrderDetail(order_id) {
                return function () {
                    this.$router.push({
                        name: 'order_detail',
                        query: {
                            order_id: order_id
                        }
                    });
                };
            },
            getActivityType(type) {
                /* 1:刮刮卡 2:有奖问答 3:游戏 4:摇一摇 5:大转盘 6:砸金蛋 7:老虎机 8:海底捞 9:抓娃娃机 10:翻纸牌 11:撕票机 12:弹珠 */
                let result = '';
                const type_list = ['scrap', 'quiz', 'game', 'shake', 'fortune', 'egg', 'machine', 'treasure',
                    'doll', 'card', 'tear', 'marble'
                ];
                type_list.forEach((name, index) => {
                    if (type === index + 1) {
                        result = name;
                        return;
                    }
                });
                return result || 'scrap';
            },
            toggleDialog(dialog) {
                this.dialog = dialog;
                this.dialog_show = !this.dialog_show;
            },
            shareView() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/share_view/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        type: 2
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
            isShare() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/is_share/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        type: 2
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                    });
                });
            },
        }
    };
</script>