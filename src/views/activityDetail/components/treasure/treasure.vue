<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-treasure {
        margin-top: pxTorem(-50);
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        overflow: hidden;
        background-color: #00627f;
        background-image: url('./images/treasureBackground.jpg');
        background-size: pxTorem(750) pxTorem(1671);
        background-repeat: no-repeat;
        background-position: 0 pxTorem(395);
    }

    .header {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .banner {
        position: absolute;
        width: pxTorem(750);
        height: pxTorem(330);
        z-index: 0;
    }

    .wave {
        position: absolute;
        left: pxTorem(-14);
        bottom: pxTorem(-75);
        width: pxTorem(764);
        height: pxTorem(108);
        z-index: 2;
        animation: wave 5s linear infinite;
        transform: translateY(3%);
    }

    @keyframes wave {
        50% {
            transform: translateY(-3%) translateX(pxTorem(14));
        }
        100% {
            transform: translateY(3%);
        }
    }

    .container {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(560);
        margin-top: pxTorem(80);
    }

    .chest {
        position: absolute;
        width: pxTorem(135);
        height: pxTorem(132);
        background-image: url('./images/chest.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        z-index: 1;
        transform-origin: left top;
        animation: chest 5s linear infinite;
        &:nth-child(1) {
            left: pxTorem(20);
            top: pxTorem(320);
            opacity: 0.7;
        }
        &:nth-child(2) {
            left: pxTorem(80);
            top: pxTorem(120);
            animation-delay: -1s;
        }
        &:nth-child(3) {
            left: pxTorem(240);
            top: pxTorem(20);
            width: pxTorem(120);
            height: pxTorem(117.6);
            opacity: 0.7;
            animation-delay: -3.4s;
        }
        &:nth-child(4) {
            left: pxTorem(210);
            top: pxTorem(250);
            animation-delay: -3.8s;
        }
        &:nth-child(5) {
            left: pxTorem(430);
            top: pxTorem(70);
            width: pxTorem(120);
            height: pxTorem(117.6);
            opacity: 0.7;
            animation-delay: -1.2s;
        }
        &:nth-child(6) {
            left: pxTorem(375);
            top: pxTorem(110);
            width: pxTorem(150);
            height: pxTorem(147);
            animation-delay: -2.4s;
        }
        &:nth-child(7) {
            left: pxTorem(560);
            top: pxTorem(250);
            width: pxTorem(150);
            height: pxTorem(147);
            animation-delay: -4.6s;
        }
        &:nth-child(8) {
            left: pxTorem(600);
            top: pxTorem(20);
            width: pxTorem(120);
            height: pxTorem(117.6);
            animation-delay: -1.2s;
        }
    }

    @keyframes chest {
        0% {
            transform: translateY(0%);
        }
        25% {
            transform: translateY(-7%);
        }
        50% {
            transform: translateY(0%);
        }
        75% {
            transform: translateY(7%);
        }
        100% {
            transform: translateY(0%);
        }
    }

    .buble {
        position: relative;
        width: pxTorem(533);
        height: pxTorem(263);
        margin-top: pxTorem(150);
        z-index: 2;
        opacity: 0.2;
        animation: buble 7s linear infinite;
    }

    @keyframes buble {
        10% {
            opacity: 0.5;
        }
        25% {
            opacity: 1;
            transform: translateY(-10%) translateX(1%);
        }
        50% {
            opacity: 1;
            transform: translateY(-17%) translateX(0%);
        }
        75% {
            opacity: 1;
            transform: translateY(-24%) translateX(-1%);
        }
        100% {
            opacity: 0;
            transform: translateY(-30%) translateX(0%);
        }
    }

    .notice {
        position: absolute;
        bottom: pxTorem(75);
        left: 50%;
        width: pxTorem(310);
        height: pxTorem(78);
        line-height: pxTorem(65);
        text-align: center;
        margin-left: pxTorem(-310/2);
        background-image: url('./images/treasureNotice.png');
        background-size: 100% 100%;
        font-weight: 500;
        color: #89deee;
        .number {
            padding: 0 pxTorem(10);
            font-size: pxTorem(38);
            color: $white;
        }
    }

    .operation {
        @include flex-center-h;
        position: relative;
        width: pxTorem(750);
        height: pxTorem(138);
        text-align: center;
        margin-bottom: pxTorem(55);
        img {
            position: relative;
            width: pxTorem(243);
            height: pxTorem(138);
            margin-left: pxTorem(100);
            z-index: 1;
        }
        .integral-message {
            @include flex-center;
            flex-direction: column;
            position: relative;
            width: pxTorem(243);
            height: pxTorem(130);
            background-color: #008198;
            border-radius: pxTorem(20);
            box-shadow: 0 pxTorem(8) 0 #156872;
            color: $white;
            font-size: pxTorem(38);
            z-index: 1;
        }
        .line {
            position: absolute;
            top: 50%;
            left: pxTorem(30);
            width: pxTorem(690);
            height: pxTorem(4);
            background-color: #76e6f7;
            box-shadow: 0 pxTorem(5) pxTorem(5) #4a93f0;
            transform: translateY(-50%);
            z-index: 0;
        }
        .line:before,
        .line:after {
            content: '';
            position: absolute;
            top: 50%;
            width: pxTorem(14);
            height: pxTorem(14);
            border-radius: 50%;
            background-color: #76e6f7;
            box-shadow: 0 pxTorem(5) pxTorem(5) #4a93f0;
            transform: translateY(-50%);
        }
        .line:before {
            left: pxTorem(-7);
        }
        .line:after {
            right: pxTorem(-7);
        }
    }

    .describe {
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: $white;
        }
    }
</style>

<template>
    <div class='v-treasure'>
        <header class='header'>
            <img class='banner' :src='activityDetail.pic_banner_new'>
            <img class='wave' src='./images/wave.png'>
            <v-people :action='action' :state='state'></v-people>
        </header>
        <main class='main'>
            <section class='container'>
                <img class='buble' src='./images/buble.png'>
                <div class='chests' ref='chests'>
                    <div v-for='i in 8' class='chest'></div>
                </div>
                <div class='notice'>
                    <template v-if='isOff'>
                        活动已结束！
                    </template>
                    <template v-else-if='freeTimes>0'>
                        今天还有<strong class='number'>{{freeTimes}}</strong>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<strong class='number'>{{activityDetail.integral>>0}}</strong>积分
                    </template>
                </div>
            </section>
            <div class='operation'>
                <div class='integral-message'>
                    现有积分
                    <v-integral-box :integral='user.integral>>0' color='blue'></v-integral-box>
                </div>
                <img src='./images/treasureButton.png' @click='start'>
                <div class='line'></div>
            </div>
        </main>
        <article class='describe'>
            <v-describe-title text='详细说明' color='navy'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='navy'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='navy'></v-describe-title>
        </article>
        <footer>
            <v-award-box :awords='activityDetail.items' color='navy'></v-award-box>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    import vPeople from './components/people';
    export default {
        name: 'treasure',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwardBox,
            vPeople
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
                alert: {},
                is_win: '',
                activity_result: {},
                chests: '',
                random: '',
                action: ''
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
                    // this.$store.dispatch('toggleLoading');
                    setTimeout(() => {
                        // this.$store.dispatch('toggleLoading');
                        this.toggleDialog(this.alert);
                    }, 1900);
                } else if (value === 'fishing') {
                    this.action = Math.random() > 0.5 ? 'one' : 'two';
                    let time = 0;
                    if (this.action === 'one') {
                        this.random = 3 + Math.floor(Math.random() * 3);
                    } else if (this.action === 'two') {
                        this.random = 1 + Math.floor(Math.random() * 2);
                    }
                    if (this.random === 1) {
                        time = 900;
                    } else if (this.random === 2) {
                        time = 600;
                    } else if (this.random === 3) {
                        time = 900;
                    } else if (this.random === 4) {
                        time = 600;
                    } else if (this.random === 5) {
                        time = 650;
                    }
                    setTimeout(() => {
                        this.chests[this.random].style.visibility = 'hidden';
                        this.state = 'stop';
                    }, time);
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
                        msg: '很遗憾,未捞中',
                        btn_text: '再来一次',
                        callback: () => {
                            this.init();
                        }
                    };
                }
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.chests = this.$refs.chests.children;
        },
        methods: {
            init() {
                if (this.random) {
                    this.chests[this.random].style.visibility = 'visible';
                    this.random = '';
                }
                this.state = 'ready';
                this.action = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
            start() {
                if (this.state !== 'ready') return;
                this.state = 'start';
                this.$http.post(`${APP.HOST}/hot_pot_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        if (data.data.error_code == APP.INTEGRAL_LACK) {
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
                        this.state = 'fishing';
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

        }
    }
</script>