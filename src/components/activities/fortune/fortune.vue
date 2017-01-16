<style lang='sass' scoped>
    @import '../../../assets/scss/variable.scss';
    .fortune {
        position: relative;
        background-color: #ffc21c;
        height: pxTorem(650);
        padding-top: pxTorem(150);
    }
    
    .title {
        position: absolute;
        top: pxTorem(10);
        left: 50%;
        width: pxTorem(462);
        height: pxTorem(133);
        transform: translateX(-50%);
        transform: -webkit-translateX(-50%);
        transform: -moz-translateX(-50%);
        transform: -ms-translateX(-50%);
    }
    
    table {
        border-spacing: pxTorem(10);
        margin: 0 auto;
        background-color: #c43700;
        border: pxTorem(10) solid #c43700;
        border-radius: pxTorem(10);
    }
    
    td {
        width: pxTorem(208);
        height: pxTorem(136);
        background-color: $white;
        border-radius: pxTorem(10);
        vertical-align: middle;
        text-align: center;
        &.active {
            background-color: #edd900;
        }
        img {
            width: pxTorem(115);
            height: pxTorem(75);
            margin-bottom: pxTorem(10);
        }
        h6 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            color: $gray;
            font-size: pxTorem(22);
        }
    }
    
    td.button {
        background-color: #edd900;
        h2 {
            font-size: pxTorem(32);
            padding-bottom: pxTorem(10);
        }
        h5 {
            color: $gray;
        }
        &:active {
            background-color: darken(#edd900, 10%);
        }
    }
</style>
<template>
    <div class='fortune'>
        <img class='title' src='./images/title.png'>
        <table>
            <tr class='list-inline'>
                <td :class='{active:current_index==0}'>
                    <img :src='awards[0].pic'>
                    <h6> {{awards[0].name}} </h6>
                </td>
                <td :class='{active:current_index==1}'>
                    <img :src='awards[1].pic'>
                    <h6> {{awards[1].name}} </h6>
                </td>
                <td :class='{active:current_index==2}'>
                    <img :src='awards[2].pic'>
                    <h6> {{awards[2].name}} </h6>
                </td>
            </tr>
            <tr class='list-inline'>
                <td :class='{active:current_index==7}'>
                    <img :src='awards[7].pic'>
                    <h6> {{awards[7].name}} </h6>
                </td>
                <td class='button' @click='start()'>
                    <h2><strong>点击抽奖</strong></h2>
                    <h5>{{notice}}</h5>
                </td>
                <td :class='{active:current_index==3}'>
                    <img :src='awards[3].pic'>
                    <h6> {{awards[3].name}} </h6>
                </td>
            </tr>
            <tr class='list-inline'>
                <td :class='{active:current_index==6}'>
                    <img :src='awards[6].pic'>
                    <h6> {{awards[6].name}} </h6>
                </td>
                <td :class='{active:current_index==5}'>
                    <img :src='awards[5].pic'>
                    <h6> {{awards[5].name}} </h6>
                </td>
                <td :class='{active:current_index==4}'>
                    <img :src='awards[4].pic'>
                    <h6> {{awards[4].name}} </h6>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        name: 'fortune',
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
                current_index: '', //当前激活索引
                turn: '', //旋转次数 >3 
                grid_num: '', //格子数 8
                stop_position: '',
                alert: {},
                activity_result: {},
            }
        },
        computed: {
            awards() {
                return this.activityDetail.table_items;
            }
        },
        created() {
            this.init();
        },
        watch: {
            state(value) {
                console.log(value);
                if (value == 'start') {
                    let result = this.activity_result;
                    this.freshFreeTimes();
                    this.alert = {
                        close_btn: true,
                        type: 'img',
                        img: result.pic_thumb,
                        msg: '获得' + result.name,
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init(this.stop_position);
                        },
                        btn_text: '查看'
                    };
                    this.stop_position = this.getPosition(this.activity_result.name);
                    let _this = this, //执行环境
                        stop_position = this.stop_position, //停止位置
                        move_times = this.getMoveTimes(stop_position), //总循环次数
                        time = 0, //计数器
                        speed_min = 500, //最小速度
                        speed_max = 20, //最大速度
                        interval = 500, //执行频率
                        speed_buffer = 10, //速度缓冲区
                        speed_interval = Math.abs(speed_max - speed_min) / speed_buffer; //速度提升间隔
                    setTimeout(() => {
                        step();
                    }, interval);

                    function step() {
                        if (time < speed_buffer) {
                            interval = _this.speedUp(interval, speed_interval);
                        } else if (time > move_times - speed_buffer) {
                            interval = _this.speedDown(interval, speed_interval);
                        }
                        if (time >= move_times) {
                            _this.state = 'stop';
                            return;
                        }
                        time++;
                        _this.move();
                        setTimeout(step, interval);
                    }
                } else if (value == 'stop') {
                    this.$store.dispatch('toggleAlert', this.alert);
                }
            }
        },
        methods: {
            init(position = 0) {
                this.state = 'ready';
                this.current_index = position;
                this.turn = 8;
                this.grid_num = 8;
                this.activity_result = {};
            },
            start() {
                if (this.state != 'ready') return;
                this.$http.post(`${APP.HOST}/turntable_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.activity_result = data.data;
                        this.state = 'start';
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {})

            },
            move() {
                this.current_index = (this.current_index + 1) % this.grid_num;
            },
            getPosition(name) {
                return this.awards.findIndex(award => award.name == name);
            },
            getMoveTimes(stop_position) {
                let step = stop_position - this.current_index;
                if (step < 0) {
                    step = this.grid_num + step;
                }
                return step + this.turn * this.grid_num;
            },
            speedUp(interval, speed_interval) {
                return interval -= speed_interval;
            },
            speedDown(interval, speed_interval) {
                return interval += speed_interval;
            }
        }
    }
</script>