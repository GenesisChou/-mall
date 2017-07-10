    import Lottery from './lottery.js';
    // import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    import vRecommand from '../vRecommand';
    import vTitle from '../vTitle';
    module.exports = {
        components: {
            // vDescribeTitle,
            vIntegralBox,
            vAwardBox,
            vRecommand,
            vTitle
        },
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            freeTimes: Number,
            toggleDialog: Function,
            isOff: Boolean
        },
        data() {
            return {
                state: '', // 游戏状态
                draw_percent: 0, // 画布涂抹面积 大于一定值时触发弹窗
                alert: {},
                lottery: '', // 画布实例
                is_win: '', // 判断是否中奖
                area: 40,
                activity_result: {}
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            draw_percent(value) {
                if (this.state === 'start' && value > this.area) {
                    this.state = 'stop';
                    this.lottery.clear();
                    this.$store.dispatch('toggleLoading');
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        this.toggleDialog(this.alert);
                    }, 1000);
                }
            },
            is_win(value) {
                if (this.state === 'ready') return;
                const result = this.activity_result;
                this.freshFreeTimes();
                if (value) {
                    this.alert = {
                        type: 'success',
                        img: result.pic_thumb_new,
                        msg: '获得' + result.name,
                        btn_text: '查看',
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            let canvas = document.getElementsByTagName('canvas');
                            canvas = Array.prototype.slice.call(canvas);
                            canvas.forEach(item => {
                                item.parentElement.removeChild(item);
                            });
                            this.init();
                        }
                    };
                } else {
                    this.alert = {
                        msg: '很遗憾,未中奖',
                        btn_text: '再来一次',
                        callback: () => {
                            let canvas = document.getElementsByTagName('canvas');
                            canvas = Array.prototype.slice.call(canvas);
                            canvas.forEach(item => {
                                item.parentElement.removeChild(item);
                            });
                            this.init();
                        }
                    };
                }
                this.setLottery(result.name);
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.draw_percent = 0;
                this.lottery = '';
                this.is_win = '';
                this.activity_result = {};
            },
            // 开始活动
            start() {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.ORIGIN);
                    return;
                }
                if (this.state !== 'ready') return;
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/activity_order/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    origin: APP.ORIGIN
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        if (data.data.error_code === APP.INTEGRAL_LACK) {
                            this.toggleDialog({
                                faliure: 'lack',
                                callback: () => {
                                    this.init();
                                }
                            });
                            return;
                        }
                        this.state = 'start';
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            // 设置画布
            setLottery(str) {
                this.lottery = new Lottery('lotteryContainer', '#e2e2e2', 'color', this.pxTorem(542),
                    this.pxTorem(196), (
                        draw_percent) => {
                        this.draw_percent = draw_percent;
                    });
                this.lottery.init(str, 'text');
            },
            pxTorem(value) {
                return value * utils.getClientWidth() / 750;
            }
        }
    };