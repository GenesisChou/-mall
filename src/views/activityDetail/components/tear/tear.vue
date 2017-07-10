<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-tear {
        position: relative;
        overflow: hidden;
        background: url('./images/tearBackground.png');
        background-size: pxTorem(750) pxTorem(750);
        ul,
        li {
            list-style: none;
        }
    }

    .header {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(330);
        margin-bottom: pxTorem(-80);
    }

    .banner-decoration {
        position: absolute;
        left: 0;
        top: 0;
        width: pxTorem(750);
        height: pxTorem(37);
    }

    .banner {
        width: pxTorem(750);
        height: pxTorem(434);
    }

    .background {
        position: absolute;
        width: pxTorem(750);
        height: pxTorem(1026);
        left: 0;
        top: pxTorem(90);
    }

    .machine-panel {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(908);
        margin-bottom: pxTorem(30);
        background-image: url('./images/tearPanel.png');
        background-size: 100%;
        overflow: hidden;
        .integral-message {
            @include flex-center;
            margin-top: pxTorem(90);
            font-size: pxTorem(38);
            color: #fff907;
            z-index: 1;
        }
    }

    .notice {
        @include flex-center;
        position: absolute;
        bottom: pxTorem(342);
        left: 50%;
        height: pxTorem(54);
        font-weight: 500;
        color: $white;
        z-index: 1;
        transform: translateX(-50%);
        .number {
            padding: 0 pxTorem(5);
            font-size: pxTorem(36);
            color: #5a1909;
        }
    }

    .container {
        display: flex;
        justify-content: space-between;
        position: relative;
        width: pxTorem(530);
        height: pxTorem(148);
        margin: pxTorem(77) auto 0 auto; // background-color: $white;
        overflow: hidden;
    }

    .group {
        position: absolute;
        &:nth-child(1) {
            left: 0;
        }

        &:nth-child(2) {
            left: pxTorem(199);
            .awards {
                animation-delay: -3.33s;
            }
        }

        &:nth-child(3) {
            right: 0;
            .awards {
                animation-delay: -6.66s;
            }
        }
    }

    .awards {
        animation: rotate 10s linear infinite;
        li {
            @include flex-center;
            list-style: none;
            width: pxTorem(135);
            height: pxTorem(135);
        }
        img {
            width: pxTorem(120);
            height: pxTorem(120);
        }
    }


    @keyframes rotate {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-100%);
        }
    }

    .tickets {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: pxTorem(350);
        position: absolute;
        padding: 0 pxTorem(87);
        top: pxTorem(585);
        overflow: hidden;
    }

    .ticket {
        position: relative;
        list-style: none;
        &.active {
            animation: move-fast 2s;
        }
        &.moving {
            animation: move 1s infinite;
        }
    }

    .ticket-top {
        width: pxTorem(166);
        height: pxTorem(60);
        background: url('./images/tearTicket.png') no-repeat;
        background-size: 100%;
    }

    .ticket-bottom {
        width: pxTorem(166);
        height: pxTorem(220);
        background: url('./images/tearTicket.png') no-repeat;
        background-position-y: pxTorem(-60);
        background-size: 100%;
        &:after {
            content: '';
            display: none;
            position: absolute;
            right: pxTorem(-48);
            bottom: pxTorem(10);
            width: pxTorem(93);
            height: pxTorem(98);
            background: url('./images/tearHand.png') no-repeat;
            background-size: 100%;
        }
        &.select {
            transform-origin: left top;
            transition: .5s linear;
            transition-delay: 1.2s;
            transform: rotate(30deg);
            &:after {
                display: block;
            }
        }
    }




    @keyframes move {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes move-fast {
        0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(-10%);
        }
        20% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-10%);
        }
        40% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10%);
        }
        60% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(0);
        }
    }

    .describe {
        position: relative;
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: $white;
        }
    }
</style>
<template>
    <div class='v-tear'>
        <header class='header'>
            <img class='img-responsive' :src='activityDetail.pic_banner_new'>
        </header>
        <main>
            <div class='machine-panel'>
                <header class='integral-message'>
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='yellow'></v-integral-box>
                </header>
                <div class='container'>
                    <div v-for='i in 3' class='group'>
                        <ul v-for='j in 2' class='awards'>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class='notice'>
                    <template v-if='isOff'>
                        活动已结束！
                    </template>
                    <template v-else-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </div>
                <ul class='tickets'>
                    <li v-for='(i,$index) in 3' :class='["ticket",ticket_state,{active:$index===select_num}]' @click='start($index)'>
                        <div class='ticket-top'></div>
                        <div :class='["ticket-bottom",{select:$index===select_num}]'></div>
                    </li>
                </ul>
            </div>
        </main>
        <!--<article class='describe'>
            <v-describe-title text='详细说明' color='emerald'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='emerald'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='emerald'></v-describe-title>
        </article>-->
        <footer>
            <v-award-box :awords='activityDetail.items' color='emerald'></v-award-box>
            <template v-if='activityDetail.recommend_items.length>0'>
                <v-title color='emerald'></v-title>
                <v-recommand :recommands='activityDetail.recommend_items' color='emerald'></v-recommand>
            </template>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    import vRecommand from '../vRecommand';
    import vTitle from '../vTitle';
    export default {
        name: 'tear',
        components: {
            vDescribeTitle,
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
                state: '', //游戏状态
                alert: {},
                activity_result: {},
                groups: '',
                select_num: ''
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            ticket_state() {
                if (this.state === 'ready') {
                    return 'moving';
                } else if (this.state === 'start') {
                    return '';
                }
            },

        },
        watch: {
            state(value) {
                if (value === 'start') {
                    const result = this.activity_result,
                        is_win = result.is_win;
                    this.freshFreeTimes();
                    if (is_win) {
                        this.alert = {
                            type: 'success',
                            style: 'reel',
                            img: result.pic_thumb_new,
                            msg: result.name,
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
                    setTimeout(() => {
                        this.toggleDialog(this.alert);
                    }, 2000);
                }
            },
        },
        deactivated() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.activity_result = {};
                this.select_num = '';
            },
            start(num) {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.ORIGIN);
                    return;
                }
                if (this.state !== 'ready') return;
                this.state = 'block';
                this.$http.post(`${APP.HOST}/ticket_activity/${this.id}`, {
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
                        this.state = 'start';
                        this.select_num = num;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        });
                    }
                });
            },
        },
    };
</script>