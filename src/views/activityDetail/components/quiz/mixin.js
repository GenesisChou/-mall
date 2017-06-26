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
            activityDetail: Object,
            freshFreeTimes: Function,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            freeTimes: Number,
            toggleDialog: Function,
            isOff: Boolean
        },
        data() {
            return {
                state: '',
                current_number: 0, //当前题目号 0开始
                // integral_enough: false, //判断是否有足够积分进行活动
                answer_id: 0, //判断是否有选择题目
                is_right: '', //判断回答是否正确
                is_win: '', //判断是否中奖
                activity_result: {}
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            is_right(value) {
                if (this.state !== 'start') return;
                this.freshFreeTimes();
                const result = this.activity_result;
                if (value) {
                    this.is_win = result.is_win;
                } else {
                    this.toggleDialog({
                        msg: '回答错误',
                        btn_text: '继续答题',
                        callback: () => {
                            this.init();
                        },
                    });
                }
            },
            is_win(value) {
                if (this.state !== 'start') return;
                const result = this.activity_result;
                if (value) {
                    this.toggleDialog({
                        close_btn: true,
                        msg: '获得' + result.name,
                        type: 'success',
                        img: result.pic_thumb_new,
                        btn_text: '查看',
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init();
                        }
                    });
                } else {
                    this.toggleDialog({
                        msg: result.name,
                        callback: () => {
                            this.init();
                        }
                    });
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.current_number = 0; //当前题目号 0开始
                this.answer_id = 0; //判断是否有选择题目
                this.is_right = ''; //判断回答是否正确
                this.is_win = ''; //判断是否中奖
                this.activity_result = {};
            },
            //提交答案
            submitAnswer() {
                if (!this.answer_id) {
                    this.toggleDialog({
                        msg: '请选择答案',
                        btn_text: '我知道了'
                    });
                    return;
                }
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/question_activity/${this.id}`, {
                    question_id: this.activityDetail.questions[this.current_number].id,
                    answer_id: this.answer_id,
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
                        this.is_right = this.activity_result.is_right;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
        }
    };