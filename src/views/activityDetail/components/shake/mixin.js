    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    export default {
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwardBox
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
                state: '', //游戏状态
                alert: {},
                is_win: '', //判断是否中奖
                activity_result: {},
                deviceEvent: '',
                shaking: false,
                animation_time: 1500
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            is_win(value) {
                if (this.state !== 'shaking') return;
                const result = this.activity_result;
                this.sound();
                this.shake();
                this.freshFreeTimes();
                setTimeout(() => {
                    this.$store.dispatch('toggleLoading');
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        if (value) {
                            this.toggleDialog({
                                msg: '获得' + result.name,
                                type: 'success',
                                img: result.pic_thumb_new,
                                btn_text: '查看',
                                callback: this.toOrderDetail(result.id),
                                callback_close: () => {
                                    this.init();
                                },
                            });
                        } else {
                            this.toggleDialog({
                                msg: '很遗憾,未摇中',
                                btn_text: '再来一次',
                                callback: () => {
                                    this.init();
                                },
                            });
                        }
                    }, 500);
                }, this.animation_time);
            }
        },
        created() {
            this.init();
            this.deviceEvent = this.getDeviceEvent();
            window.addEventListener('devicemotion', this.deviceEvent);
        },
        deactivated() {
            window.removeEventListener('devicemotion', this.deviceEvent);
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
            getDeviceEvent() {
                const SHAKE_THRESHOLD = 3000,
                    _this = this;
                let last_update = 0,
                    last_x = 0,
                    last_y = 0,
                    last_z = 0;
                return function (event) {
                    //acceleration:提供了设备在X,Y,Z轴方向上加速度的对象。加速度的单位为 m/s2。
                    const acceleration = event.acceleration,
                        curTime = new Date().getTime(),
                        diffTime = curTime - last_update;
                    if (diffTime > 100) {
                        last_update = curTime;
                        const x = acceleration.x,
                            y = acceleration.y,
                            z = acceleration.z,
                            speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                        if (speed > SHAKE_THRESHOLD) {
                            _this.start();
                        }
                        last_x = x;
                        last_y = y;
                        last_z = z;
                    }
                };
            },
            start() {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.SUBSCRIBED, APP.ORIGIN);
                    return;
                }
                if (this.state !== 'ready') return;
                this.state = 'shaking';
                this.$http.post(`${APP.HOST}/shake_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    origin: APP.ORIGIN
                }).then((response) => {
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
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        });
                    }
                }, (response) => {});
            },
            sound() {
                this.$refs.audio.play();
            },
            shake() {
                this.shaking = true;
                setTimeout(() => {
                    this.shaking = false;
                }, this.animation_time);
            }

        }
    };