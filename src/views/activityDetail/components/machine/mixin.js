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
                groups: '',
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            state(value) {
                if (value === 'stop') {
                    this.$store.dispatch('toggleLoading');
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        this.toggleDialog(this.alert);
                    }, 1000);
                } else if (value === 'start') {
                    if (this.is_win) {
                        const name = this.activity_result.name,
                            stop_num = this.getPosition(name, this.activityDetail.items);
                        this.rotate(0, stop_num);
                        this.rotate(1, stop_num, 1000);
                        this.rotate(2, stop_num, 2000, () => {
                            setTimeout(() => {
                                this.toggleDialog(this.alert);
                            }, 500);
                        });
                    } else {
                        //获取三个不重复的数字组成的数组
                        const random_array = this.createRandomArray();
                        this.rotate(0, random_array[0]);
                        this.rotate(1, random_array[1], 1000);
                        this.rotate(2, random_array[2], 2000, () => {
                            setTimeout(() => {
                                this.toggleDialog(this.alert);
                            }, 500);
                        });
                    }
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
                            this.init();
                        },
                    };
                } else {
                    this.alert = {
                        msg: '很遗憾,未抽中',
                        btn_text: '再来一次',
                        callback: () => {
                            this.init();
                        }
                    };
                }
            }
        },
        deactivated() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.groups = this.$refs.container.querySelectorAll('.awards');
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
            start() {
                if (this.state !== 'ready') return;
                this.state = 'block';
                this.$http.post(`${APP.HOST}/slot_machine_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
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
                        this.state = 'start';
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
            rotate(group_num, stop_num, delay_time = 0, callback) {
                this.loop(group_num, stop_num, delay_time, () => {
                    this.stop(group_num, stop_num).then(() => {
                        if (callback) {
                            callback();
                        }
                    });
                });
            },
            loop(group_num, stop_num, delay_time, callback) {
                let current_top = 0,
                    current_turn = 0;
                const turns = 8,
                    limit_top = (this.activityDetail.items.length - 1) * 100;
                setTimeout(() => {
                    const timer = setInterval(() => {
                        this.groups[group_num].style.marginTop = `-${current_top}%`;
                        current_top += 10;
                        if (current_top > limit_top + 100) {
                            current_top = 0;
                            if (++current_turn > turns) {
                                clearInterval(timer);
                                this.groups[group_num].style.marginTop = 0;
                                if (callback) {
                                    callback();
                                }
                            }
                        }
                    }, 10);
                }, delay_time);
            },
            stop(group_num, stop_num) {
                return new Promise(resolve => {
                    let current_top = 0;
                    const timer = setInterval(() => {
                        this.groups[group_num].style.marginTop = `-${current_top}%`;
                        current_top += 10;
                        if (stop_num === 0) {
                            stop_num = this.activityDetail.items.length;
                        }
                        if (current_top > (stop_num - 1) * 100) {
                            clearInterval(timer);
                            if (resolve && typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    }, 10);
                });
            },
            getPosition(name, awards) {
                let stop_num = 0;
                awards.forEach((award, index) => {
                    if (award.name === name) {
                        stop_num = index;
                        return true;
                    }
                });
                return stop_num;
            },
            createRandomArray() {
                const temp = {},
                    result = [],
                    limit = this.activityDetail.items.length;
                let state = true;
                while (state) {
                    const random = Math.floor(Math.random() * limit);
                    if (!temp[random]) {
                        temp[random] = true;
                        result.push(random);
                    }
                    if (result.length === 3) {
                        state = false;
                    }
                }
                return result;
            }
        },
    };