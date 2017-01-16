<style lang='sass' scoped>
    @import '../../../assets/scss/variable.scss';
    .msg {
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
        transform: -webkit-translate(-50%, -50%);
        transform: -moz-translate(-50%, -50%);
        transform: -ms-translate(-50%, -50%);
    }
    
    img {
        width: pxTorem(235);
        height: pxTorem(304);
        margin: pxTorem(20) auto;
    }
</style>
<template>
    <div class='v-shake' :style='shake_style'>
        <div class='msg'>
            <audio id='audio'>
                <source src="http://xunlei.sc.chinaz.com/files/download/sound1/201410/5018.wav" type="audio/mpeg" />
            </audio>
            <img src='./images/shake.png'>
            <h3>{{notice}}</h3>
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
                audio: ''
            }
        },
        computed: {
            shake_style() {
                return {
                    width: '100%',
                    height: utils.getClientHeight() + 'px',
                    position: 'relative',
                    backgroundColor: '#2e3132',
                    color: '#fff',
                }
            }
        },
        watch: {
            is_win(value) {
                if (this.state != 'start') return;
                this.audio.play();
                let result = this.activity_result;
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
                }, 1000);
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
                this.$http.post(`${APP.HOST}/shake_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.state = 'start';
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {})
            }

        }
    }
</script>