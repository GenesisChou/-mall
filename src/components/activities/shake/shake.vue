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
    <div :style='shake_style'>
        <div class='msg'>
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
                activity_result: {}
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
            state(value) {

            },
            is_win(value) {
                if (this.state != 'start') return;
                let result = this.activity_result;
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
            }
        },
        created() {
            this.init();
            window.addEventListener('devicemotion', this.deviceMotionHandler, false);
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
            deviceMotionHandler(eventData) {
                const SHAKE_THRESHOLD = 3000;
                let last_update = 0,
                    x = 0,
                    y = 0,
                    z = 0,
                    last_x = 0,
                    last_y = 0,
                    last_z = 0,
                    acceleration = eventData.accelerationIncludingGravity,
                    curTime = new Date().getTime();
                if ((curTime - last_update) > 100) {
                    let diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    if (speed > SHAKE_THRESHOLD) {
                        alert("摇动了");
                        this.start();
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            },
            start() {
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