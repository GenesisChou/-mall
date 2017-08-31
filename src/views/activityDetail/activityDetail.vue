<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .activity-detail {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
        overflow: hidden;
    }

    .space {
        height: pxTorem(80);
    }

    .activity-detail-content {
        flex: 1;
    }

    .ruler,
    .awards {
        @include flex-center;
        position: absolute;
        top: pxTorem(10);
        height: pxTorem(42);
        padding: 0 pxTorem(15);
        background-color: rgba(0, 0, 0, .75);
        color: $white;
        border-radius: pxTorem(21);
        z-index: 3;
        &.down {
            top: pxTorem(90);
        }
        img {
            width: pxTorem(28);
            height: pxTorem(28);
            margin-right: pxTorem(6);
            transform: translateY(pxTorem(-2));
        }
    }

    .ruler {
        left: pxTorem(10);
    }

    .awards {
        right: pxTorem(10);
    }

    .share-notice {
        li {
            list-style: none;
            font-size: pxTorem(36);
            line-height: pxTorem(66);
        }
        li:first-child {
            position: relative;
            &:after {
                content: '“...”';
                position: absolute;
                right: pxTorem(-40);
                top: 0;
            }
        }
        position:absolute;
        top: pxTorem(-350);
        left: 50%;
        transform: translateX(-50%);
        color: $white;
        z-index:1;
    }
</style>
<template>
    <div class='activity-detail'>
        <template v-if='notice_show'>
            <v-notice></v-notice>
            <div class='space'></div>
        </template>
        <div :class='["ruler",{down:notice_show}]' @click='ruler_show=true'>
            <img src='./images/ruler.png'> 规则
        </div>
        <div :class='["awards",{down:notice_show}]' @click='toMyAwards'>
            <img src='./images/awards.png'> 奖品
        </div>
        <div class='activity-detail-content'>
            <keep-alive>
                <component :is='activity_type' :free-times='free_times>>0' :fresh-free-times='freshFreeTimes' :activity-detail='activity_detail'
                    :id='activity_id>>0' :notice='notice' :to-order-detail='toOrderDetail' :toggleDialog='toggleDialog' :is-off='is_off'>
                </component>
            </keep-alive>
        </div>
        <v-guide v-if='activity_detail.is_share===1' :show.sync='share_show' :has-shared='has_shared' :id='activity_id>>0'></v-guide>
        <v-ruler :show.sync='ruler_show' :activity-detail='activity_detail'></v-ruler>
        <v-dialog :show='dialog_show' :dialog='dialog' :toggle-dialog='toggleDialog'></v-dialog>
        <v-support></v-support>
        <v-share-guide :show.sync='share_show'>
            <ul class='share-notice'>
                <li>1、点击右上角的 </li>
                <li>2、选择“ <i class='iconfont icon-share-time'></i> ”即可</li>
                <li>3、请分享后继续参与</li>
            </ul>
        </v-share-guide>
    </div>
</template>
<script>
    /*global APP */
    import vDialog from './components/vDialog';
    import weChatShare from 'libs/weChatShare.js';
    import vShareGuide from 'components/vShareGuide';
    import vRuler from './components/vRuler';
    import vNotice from 'components/vNotice';
    import vGuide from 'components/vGuide';
    export default {
        name: 'activityDetail',
        components: {
            vDialog,
            vShareGuide,
            vRuler,
            vNotice,
            vGuide,
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
                view_id: '',
                update_view_id: '',
                activity_detail: {},
                activity_type: '',
                free_times: '',
                dialog_show: false,
                dialog: {},
                share_show: false,
                ruler_show: false,
                has_shared: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            notice() {
                return this.free_times > 0 ? `您还剩余${this.free_times}次免费机会` :
                    `消耗积分${this.activity_detail.integral >> 0}`;
            },
            is_off() {
                return this.activity_detail.status === 1;
            },
            notice_show() {
                return APP.ORIGIN !== 'menu' &&
                    this.$store.state.qr_code.qr_code_tips &&
                    this.$store.state.qr_code.qr_code_pic;
            }
        },
        watch: {
            $route(value) {
                this.init();
                window.scrollTo(0, 0);
            }
        },
        beforeRouteEnter(to, from, next) {
            const $script = require('scriptjs');
            $script('http://m.goldmiao.com/yngame/air.min.1.0.1.js', () => {
                next();
            });
        },
        created() {
            this.init();
        },
        beforeRouteLeave(to, from, next) {
            if (this.view_id) {
                this.$store.dispatch('updateItemView', this.view_id);
            }
            this.$store.dispatch('updatePageView');
            next();
        },
        methods: {
            init() {
                this.activity_id = this.$route.query.activity_id;
                this.getActivityPromise(this.getActivityDetail('activity_detail_l'), this.isShare())
                    .then(data => {
                        this.activity_type = this.getActivityType(this.activity_detail.type);
                        this.has_shared = data[1].is_share;
                        const is_share_info = this.activity_detail.is_share_info === 1;
                        weChatShare({
                            router: this.$route,
                            title: is_share_info ? this.activity_detail.share_name : this.activity_detail.name,
                            img: is_share_info ? this.activity_detail.share_pic_thumb_new : this.activity_detail
                                .pic_thumb_new,
                            desc: is_share_info ? this.activity_detail.share_desc : this.activity_detail.desc,
                            link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&page=activity_detail&activity_id=${this.activity_id}`
                        }).then(share_point => {
                            this.share_show = false;
                            return this.shareView(share_point);
                        }).then(() => {
                            this.getActivityPromise(this.getActivityDetail(), this.isShare())
                                .then(data => {
                                    this.has_shared = data[1].is_share;
                                });
                        });
                    });
                this.getFreeTimes();
            },
            getActivityPromise(promiseX, promiseY) {
                return Promise.all([promiseX, promiseY])
                    .then(data => {
                        return data;
                    });
            },
            //获取活动详情
            getActivityDetail(url = 'activity_detail') {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/${url}/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.activity_detail = data.data;
                            if (url === 'activity_detail_l') {
                                this.view_id = data.data.view_id;
                            }
                            if (resolve && typeof resolve === 'function') {
                                resolve(data);
                            }
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            // getRemainingTimes() {
            //     return new Promise(resolve => {
            //         this.$http.post(`${APP.HOST}/get_no_share_times`, {
            //             token: APP.TOKEN,
            //             user_id: APP.USER_ID,
            //             activity_id: this.activity_id
            //         }).then((response) => {
            //             const data = response.data;
            //             if (data.status === APP.SUCCESS) {
            //                 if (typeof resolve === 'function') {
            //                     resolve(data);
            //                 }
            //             }
            //         });
            //     });
            // },
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
            shareView(share_point) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/share_view/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN,
                        share_point,
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
            toMyAwards() {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.ORIGIN);
                    return;
                }
                this.$router.push({
                    name: 'my_awards',
                    query: {
                        activity_id: this.activity_id >> 0
                    }
                });
            }
        }
    };
</script>