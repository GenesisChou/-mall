<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-shake {
        position: relative;
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-color: $white;
    }

    .v-shake>header {
        margin-bottom: pxTorem(-30);
    }

    .banner {
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .integral-message {
        @include flex-center;
        padding-top: pxTorem(65);
        color: $white;
        font-size: pxTorem(38);
    }

    .shake-panel {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(798);
        margin-bottom: pxTorem(30);
        background: url('./images/shakePanel.png') no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }

    .hand {
        position: absolute;
        top: 22%;
        left: 50%;
        margin-left: pxTorem(-179);
        width: pxTorem(348);
        height: pxTorem(412);
        transform: rotate(0deg);
        transform-origin: bottom center;
        &.active {
            animation: shake 1.5s linear;
        }
    }

    .notice {
        position: absolute;
        bottom: pxTorem(90);
        left: 50%;
        transform: translateX(-50%);
        padding-top: pxTorem(10);
        text-align: center;
        color: $white;
        font-size: pxTorem(36);
        width: pxTorem(586);
        height: pxTorem(129);
        background-image: url('./images/shakeNotice.png');
        background-size: pxTorem(586) pxTorem(129);
        background-repeat: no-repeat;
        z-index: 1;
        .number {
            padding: 0 pxTorem(5);
            color: #fde638;
            font-size: pxTorem(44);
        }
    }

    .describe {
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: #ad0406;
        }
    }

    @keyframes shake {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(40deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-40deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>
<template>
    <div class='v-shake '>
        <header>
            <img class='banner' v-if='activityDetail.pic_icon' :src='activityDetail.pic_icon'>
            <img class='banner' v-else src='./images/shakeDefaultBanner.png'>
        </header>
        <main class='shake-panel'>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='red'></v-integral-box>
            </div>
            <img :class='["hand",state=="shaking"?"active":""]' src="./images/shakeHand.png">
            <div class='notice'>
                <template v-if='freeTimes>0'>
                    今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                </template>
                <template v-else>
                    每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                </template>
            </div>
        </main>
        <article class='describe'>
            <v-describe-title text='详细说明' color='red'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='red'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='red'></v-describe-title>
        </article>
        <footer>
            <v-aword-box :awords='activityDetail.items' color='red'></v-aword-box>
        </footer>
        <audio ref='audio'>
            <source src="http://xunlei.sc.chinaz.com/files/download/sound1/201410/5018.wav" type="audio/mpeg" />
        </audio>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox';
    export default {
        name: 'shake',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwordBox
        },
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            freeTimes: Number,
            toggleDialog: Function
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
                                img: result.pic_thumb,
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
        activated() {
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
                if (this.state !== 'ready') return;
                this.state = 'shaking';
                this.$http.post(`${APP.HOST}/shake_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
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
</script>