<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-egg {
        // min-height: pxTorem(1250);
        // padding-bottom: pxTorem(84);
        background-color: #fdf860;
        overflow: hidden;
    }

    .header {
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .main {
        position: relative;
    }

    .integral-message {
        @include flex-center;
        width: pxTorem(412);
        height: pxTorem(83);
        margin: 0 auto;
        background-color: #c92426;
        border-radius: pxTorem(10);
        color: $white;
        font-size: pxTorem(38);
    }

    .eggs {
        // flex:1;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        margin-top: pxTorem(50);
        li {
            position: relative;
            width: pxTorem(250);
            height: pxTorem(250);
            list-style: none;
            background-image: url('./images/egg.png');
            background-size: pxTorem(202) pxTorem(200);
            background-position: center center;
            background-repeat: no-repeat;
            &.active {
                transform: translateY(-20%);
            }
            &.broken {
                background-image: url('./images/brokenEgg.png');
            }
        }
        .hammer {
            position: absolute;
            width: pxTorem(108);
            height: pxTorem(87);
            top: pxTorem(-150);
            left: pxTorem(750-108);
            transition: 1s linear;
            transform-origin: right bottom;
            &.active {
                animation: hammer 1s linear infinite;
            }
        }
    }

    .notice {
        @include flex-center;
        height: pxTorem(60);
        font-weight: 500;
        color: #ad0406;
        .number {
            padding: 0 pxTorem(3);
            color: #ff494b;
            font-size: pxTorem(36);
        }
    }

    .describe {
        position: relative;
        padding: pxTorem(50) pxTorem(40) 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: #ad0406;
        }
    }

    .background {
        position: absolute;
        left: 0;
        top: pxTorem(250);
        width: pxTorem(750);
        height: pxTorem(928);
        z-index: 0;
    }

    @keyframes hammer {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(30deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(30deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>

<template>
    <div class='v-egg'>
        <header class='header'>
            <img class='img-responsive' :src='activityDetail.pic_banner_new'>
        </header>
        <img class='background' src="./images/eggBackground.png">
        <main class='main'>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='red'></v-integral-box>
            </div>
            <ul class='eggs' ref='eggs'>
                <li v-for='(egg,$index) in 6' :class='{active:active_num==$index+1}' @click='start($index+1)'> </li>
                <img class='hammer' src='./images/hammer.png' ref='hammer'>
            </ul>
            <h2 class='notice'>
                <template v-if='isOff'>
                    活动已结束！
                </template>
                <template v-else-if='freeTimes>0'>
                    今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                </template>
                <template v-else>
                    每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                </template>
            </h2>
        </main>
        <footer>
            <v-award-box :awords='activityDetail.items' color='red'></v-award-box>
            <v-recommand :recommands='activityDetail.recommend_items' color='red'></v-recommand>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    import vRecommand from 'components/vRecommand';
    import vTitle from '../vTitle';
    export default {
        name: 'egg',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwardBox,
            vRecommand,
            vTitle
        },
        props: {
            freshFreeTimes: Function,
            freeTimes: Number,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            toggleDialog: Function,
            isOff: Boolean
        },
        data() {
            return {
                state: '',
                activity_result: {},
                active_num: '',
                broken_num: '',
                egg_number: 6,
                eggs: '',
                hammer: '',
                is_win: '',
                timer: ''
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            state(value) {
                if (value === 'ready') {
                    this.timer = setInterval(() => {
                        this.active_num = ++this.active_num % (this.egg_number + 1) || 1;
                    }, 600);
                } else if (value === 'start') {
                    this.active_num = 0;
                    clearInterval(this.timer);
                }
            },
            broken_num(value, old_value) {
                if (value) {
                    let left = 0,
                        top = 0;
                    if (value >= 1 && value <= 3) {
                        left = (value - 1) * 250;
                    } else if (value >= 4 && value <= 6) {
                        left = (value - 4) * 250;
                        top = 250;
                    }
                    // this.hammer.style.visibility = 'visible';
                    this.hammer.style.left = utils.pxTorem(100 + left);
                    this.hammer.style.top = utils.pxTorem(-40 + top);
                    //1秒后锤子开启动画 之后蛋破裂2次 弹出弹框
                    setTimeout(() => {
                        this.hammer.classList.toggle('active');
                        let time = 0;
                        const timer = setInterval(() => {
                            this.eggs[value - 1].classList.toggle('broken');
                            if (++time >= 3) {
                                clearInterval(timer);
                                this.hammer.classList.toggle('active');
                            }
                        }, 300);
                    }, 1000);
                } else if (old_value) {
                    if (this.eggs) {
                        this.eggs[old_value - 1].classList.toggle('broken');
                    }
                    this.hammer.style.left = utils.pxTorem(750 - 108);
                    this.hammer.style.top = utils.pxTorem(-150);
                    // this.hammer.style.visibility = 'hidden';
                }
            },
            is_win(value) {
                if (this.state !== 'start') return;
                const result = this.activity_result;
                this.freshFreeTimes();
                setTimeout(() => {
                    if (value) {
                        this.toggleDialog({
                            type: 'success',
                            img: result.pic_thumb_new,
                            msg: '获得' + result.name,
                            callback: this.toOrderDetail(result.id),
                            callback_close: () => {
                                this.init();
                            },
                            btn_text: '查看'
                        });
                    } else {
                        this.toggleDialog({
                            msg: '很遗憾,未砸中',
                            btn_text: '再来一次',
                            callback: () => {
                                this.init();
                            },
                        });
                    }
                }, 3000);
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.eggs = this.$refs.eggs.querySelectorAll('li');
            this.hammer = this.$refs.hammer;
        },
        methods: {
            init() {
                clearInterval(this.timer);
                this.state = 'ready';
                this.activity_result = {};
                this.active_num = 0;
                this.broken_num = 0;
                this.is_win = '';
            },
            start(num) {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.ORIGIN);
                    return;
                }
                if (this.state !== 'ready') return;
                this.state = 'block';
                this.$http.post(`${APP.HOST}/smashing_eggs_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    origin: APP.ORIGIN
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.state = 'start';
                        if (data.data.error_code === APP.INTEGRAL_LACK) {
                            this.toggleDialog({
                                faliure: 'lack',
                                callback: () => {
                                    this.init();
                                }
                            });
                            return;
                        }
                        this.broken_num = num;
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            },
                        });
                    }
                }, (response) => {});
            },
        }
    };
</script>