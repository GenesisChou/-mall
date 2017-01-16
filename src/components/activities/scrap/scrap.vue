<style lang='sass' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-scrap {
        position: relative;
        height: pxTorem(600);
        background: url('./images/scrap.png') no-repeat;
        background-size: 100%;
    }
    
    #lotteryContainer {
        position: absolute;
        overflow: auto;
        width: pxTorem(500);
        height: pxTorem(200);
        left: pxTorem(138);
        top: pxTorem(310);
        background: $gray-light;
    }
    
    #start {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        padding: 0;
        width: pxTorem(180);
        height: pxTorem(68);
        line-height: pxTorem(68);
        font-size: pxTorem(30);
        text-indent: pxTorem(12);
        letter-spacing: pxTorem(12);
    }
    
    .free-time-message {
        position: absolute;
        left: 50%;
        top: 75%;
        transform: translateX(-45%);
        -moz-transform: translateX(-45%);
        -webkit-transform: translateX(-45%);
        -ms-transform: translateX(-45%);
        z-index: 2;
    }
</style>
<template>
    <!--<div class='v-scrap' :style='bg_img'>-->
    <div class='v-scrap'>
        <div id='lotteryContainer'>
            <button class='btn btn-red' id='start' @click='start'>开始</button>
        </div>
        <div v-if='state=="ready"' class='free-time-message'>{{notice}}</div>
    </div>
</template>
<script>
    import Lottery from 'libs/lottery.js'
    export default {
        name: 'scrap',
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
                draw_percent: 0, //画布涂抹面积 大于一定值时触发弹窗
                alert: {},
                lottery: '', //画布实例
                is_win: '', //判断是否中奖
                activity_result: {}
            };
        },
        watch: {
            draw_percent(value) {
                if (this.state == 'start' && value > 40) {
                    this.state = 'stop';
                }
            },
            state(value) {
                if (value == 'start') {
                    this.freshFreeTimes();
                } else if (value == 'stop') {
                    this.$store.dispatch('toggleAlert', this.alert);
                }
            },
            is_win(value) {
                if (this.state != 'start') return;
                let result = this.activity_result;
                if (value) {
                    this.alert = {
                        close_btn: true,
                        type: 'img',
                        img: result.pic_thumb,
                        msg: '获得' + result.name,
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            let canvas = document.querySelectorAll('canvas');
                            canvas = Array.prototype.slice.call(canvas);
                            canvas.forEach(item => {
                                item.parentElement.removeChild(item)
                            });
                            this.init();
                        },
                        btn_text: '查看'
                    };
                } else {
                    this.alert = {
                        msg: result.name,
                        callback: () => {
                            this.init();
                        }
                    };
                }
                this.setLottery(result.name);
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.draw_percent = 0;
                this.lottery = '';
                this.is_win = '';
                this.activity_result = {};
            },
            //开始活动
            start() {
                if (this.state != 'ready') return;
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/activity_order/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.activity_result = data.data;
                        this.state = 'start';
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })

            },
            //设置画布
            setLottery(str) {
                this.lottery = new Lottery('lotteryContainer', '#ddd', 'color', this.pxTorem(500), this.pxTorem(200), (
                    draw_percent) => {
                    this.draw_percent = draw_percent;
                });
                this.lottery.init(str, 'text');
            },
            pxTorem(value) {
                return value * utils.getClientWidth() / 750;
            },
        },
    };
</script>