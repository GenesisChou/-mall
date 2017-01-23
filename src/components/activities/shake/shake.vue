<style lang='sass' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-shake {
        overflow: hidden;
        background-color: $sliver;
    }
    
    .shake {
        width: pxTorem(200);
        height: pxTorem(130);
    }
    
    .flower {
        position: absolute;
        left: 50%;
        top: 50%;
        width: pxTorem(140);
        height: pxTorem(140);
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
    }
    
    .top {
        position: absolute;
        bottom: 50%;
        width: 100%;
        height: 50%;
        background-color: #2e3132;
        z-index: 1;
        .shake {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
        }
        &.active {
            border-bottom: pxTorem(5) solid $white;
            animation: up 1.5s linear;
            -webkit-animation: up 1.5s linear;
            -moz-animation: up 1.5s linear;
            -ms-animation: up 1.5s linear;
        }
    }
    
    .bottom {
        position: absolute;
        top: 50%;
        width: 100%;
        height: 50%;
        padding-top: pxTorem(150);
        background-color: #2e3132;
        color: $white;
        z-index: 1;
        .shake {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
        }
        &.active {
            border-top: pxTorem(5) solid $white;
            animation: down 1.5s linear;
            -webkit-animation: down 1.5s linear;
            -moz-animation: down 1.5s linear;
            -ms-animation: down 1.5s linear;
        }
    }
    
    @keyframes up {
        0% {
            bottom: 50%;
        }
        40% {
            bottom: 60%;
        }
        60% {
            bottom: 60%;
        }
        100% {
            bottom: 50%;
        }
    }
    
    @-webkit-keyframes up {
        0% {
            bottom: 50%;
        }
        40% {
            bottom: 60%;
        }
        60% {
            bottom: 60%;
        }
        100% {
            bottom: 50%;
        }
    }
    
    @-moz-keyframes up {
        0% {
            bottom: 50%;
        }
        40% {
            bottom: 60%;
        }
        60% {
            bottom: 60%;
        }
        100% {
            bottom: 50%;
        }
    }
    
    @-ms-keyframes up {
        0% {
            bottom: 50%;
        }
        40% {
            bottom: 60%;
        }
        60% {
            bottom: 60%;
        }
        100% {
            bottom: 50%;
        }
    }
    
    @keyframes down {
        0% {
            top: 50%;
        }
        40% {
            top: 60%;
        }
        60% {
            top: 60%;
        }
        100% {
            top: 50%;
        }
    }
    
    @-webkit-keyframes down {
        0% {
            top: 50%;
        }
        40% {
            top: 60%;
        }
        60% {
            top: 60%;
        }
        100% {
            top: 50%;
        }
    }
    
    @-moz-keyframes down {
        0% {
            top: 50%;
        }
        40% {
            top: 60%;
        }
        60% {
            top: 60%;
        }
        100% {
            top: 50%;
        }
    }
    
    @-ms-keyframes down {
        0% {
            top: 50%;
        }
        40% {
            top: 60%;
        }
        60% {
            top: 60%;
        }
        100% {
            top: 50%;
        }
    }
</style>
<template>
    <div class='v-shake ' :style='shake_style'>
        <audio id='audio'>
            <source src="http://xunlei.sc.chinaz.com/files/download/sound1/201410/5018.wav" type="audio/mpeg" />
        </audio>
        <img class='flower' src='./images/flower.png'>
        <div :class='["top",{active:this.shaking}]'>
            <img class='shake' src='./images/shake_top.png'>
        </div>
        <div :class='["bottom",{active:this.shaking}]'>
            <img class='shake' src='./images/shake_bottom.png'>
            <h3 class='text-center'>{{notice}}</h3>
            <!--<button class='btn btn-red' @click='start'>shake</button>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: 'shake',
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function
        },
        data() {
            return {
                state: '', //游戏状态
                alert: {},
                is_win: '', //判断是否中奖
                activity_result: {},
                deviceEvent: '',
                audio: '',
                shaking: false,
                animation_time: 1500
            }
        },
        computed: {
            shake_style() {
                return {
                    width: '100%',
                    height: utils.getClientHeight() + 'px',
                    position: 'relative',
                }
            }
        },
        watch: {
            is_win(value) {
                if (this.state != 'shaking') return;
                let result = this.activity_result;
                this.sound();
                this.shake();
                this.freshFreeTimes();
                setTimeout(() => {
                    this.$store.dispatch('toggleLoading');
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        if (value) {
                            this.$store.dispatch('toggleAlert', {
                                close_btn: true,
                                msg: '获得' + result.name,
                                type: 'img',
                                img: result.pic_thumb,
                                btn_text: '查看',
                                callback: this.toOrderDetail(result.id),
                                callback_close: () => {
                                    this.init();
                                },
                            });
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: result.name,
                                callback: () => {
                                    this.init();
                                },
                            });
                        }
                    }, 500);
                }, this.animation_time);
            }
        },
        mounted() {
            this.init();
            this.audio = document.querySelector('.v-shake #audio');
            this.deviceEvent = this.getDeviceEvent();
            window.addEventListener('devicemotion', this.deviceEvent);
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
            getDeviceEvent() {
                let SHAKE_THRESHOLD = 3000,
                    last_update = 0,
                    last_x = 0,
                    last_y = 0,
                    last_z = 0,
                    _this = this;
                return function (event) {
                    //acceleration:提供了设备在X,Y,Z轴方向上加速度的对象。加速度的单位为 m/s2。
                    let acceleration = event.acceleration,
                        curTime = new Date().getTime(),
                        diffTime = curTime - last_update;
                    if (diffTime > 100) {
                        last_update = curTime;
                        let x = acceleration.x,
                            y = acceleration.y,
                            z = acceleration.z;
                        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                        if (speed > SHAKE_THRESHOLD) {
                            _this.start();
                        }
                        last_x = x;
                        last_y = y;
                        last_z = z;
                    }

                }
            },
            start() {
                if (this.state != 'ready') return;
                // this.state = 'start';
                // this.state = 'shaking';
                // this.is_win = false;
                this.$http.post(`${APP.HOST}/shake_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.state = 'shaking';
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        })
                    }
                }, (response) => {})
            },
            sound() {
                this.audio.play();
            },
            shake() {
                this.shaking = true;
                setTimeout(() => {
                    this.shaking = false;
                }, this.animation_time);
            }

        }
    }
</script>