<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .fortune {
        padding-bottom: pxTorem(84);
        background-color: #fdf860;
        background-image: url('./images/fortuneBackground.png');
        background-size: pxTorem(750) pxTorem(1380);
        background-position: pxTorem(0) pxTorem(400);
        background-repeat: no-repeat;
    }
    
    .banner {
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .panel {
        width: pxTorem(623);
        height: pxTorem(809);
        margin: pxTorem(10) auto pxTorem(58) auto;
        background-image: url('./images/panel.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    
    .integral-message {
        display: flex;
        align-items: center;
        justify-content: center;
        display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-justify-content: center;
        height: pxTorem(100);
        color: $white;
        font-size: pxTorem(38);
    }
    
    table {
        margin: 0 auto;
        padding-top: pxTorem(70);
        border-spacing: pxTorem(10);
    }
    
    td {
        width: pxTorem(169);
        height: pxTorem(169);
        vertical-align: middle;
        text-align: center;
        background-image: url('./images/panelItem.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        img {
            width: pxTorem(115);
            height: pxTorem(75);
            margin-bottom: pxTorem(10);
        }
        &.center {
            background-image: url('./images/startButton.png');
        }
        &.active {
            background-image: url('./images/panelItemActive.png');
        }
        &.center.active {
            background-image: url('./images/startButtonActive.png');
        }
    }
    
    .notice {
        padding-top: pxTorem(30);
        text-align: center;
        color: #b50300;
        .number {
            padding: 0 pxTorem(3);
            color: #ffff66;
            font-size: pxTorem(34);
        }
    }
    
    .describe {
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: #ad0406 !important;
        }
    }
</style>
<template>
    <div class='fortune'>
        <header>
            <img class='banner' v-if='!activityDetail.pic_banner' :src='activityDetail.pic_banner'>
            <img class='banner' v-else src='./images/fortuneDefaultBanner.png'>
        </header>
        <main>
            <div class='panel'>
                <div class='integral-message'>
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='red'></v-integral-box>
                </div>
                <table>
                    <tr>
                        <td :class='{active:current_index==0}'>
                            <img :src='awards[0].pic'>
                        </td>
                        <td :class='{active:current_index==1}'>
                            <img :src='awards[1].pic'>
                        </td>
                        <td :class='{active:current_index==2}'>
                            <img :src='awards[2].pic'>
                        </td>
                    </tr>
                    <tr>
                        <td :class='{active:current_index==7}'>
                            <img :src='awards[7].pic'>
                        </td>
                        <td :class='["center",state=="start"?"active":""]' @click='start'>

                        </td>
                        <td :class='{active:current_index==3}'>
                            <img :src='awards[3].pic'>
                        </td>
                    </tr>
                    <tr>
                        <td :class='{active:current_index==6}'>
                            <img :src='awards[6].pic'>
                        </td>
                        <td :class='{active:current_index==5}'>
                            <img :src='awards[5].pic'>
                        </td>
                        <td :class='{active:current_index==4}'>
                            <img :src='awards[4].pic'>
                        </td>
                    </tr>
                </table>
                <h5 class='notice'>
                    <template v-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </h5>
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
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle.vue';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox.vue';
    export default {
        name: 'fortune',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwordBox
        },
        props: {
            freshFreeTimes: Function,
            freeTimes: Number,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            toggleDialog:Function
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
            },
            is_win() {
                return this.activity_result.is_win || false;
            },
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.init();
        },
        watch: {
            state(value) {
                if (value == 'start') {
                    let result = this.activity_result;
                    this.freshFreeTimes();
                    if (result.is_win) {
                        this.alert = {
                            type: 'success',
                            img: result.pic_thumb,
                            msg: '获得' + result.name,
                            callback: this.toOrderDetail(result.id),
                            callback_close: () => {
                                this.init(this.stop_position);
                            },
                            btn_text: '查看'
                        };
                    } else {
                        this.alert = {
                            msg: result.name,
                            btn_text:'再来一次',
                            callback: () => {
                                this.init(this.stop_position);
                            },
                        };

                    }
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
                    this.toggleDialog(this.alert);
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
                        this.toggleDialog({
                            msg: data.info
                        })
                    }
                }, (response) => {})

            },
            move() {
                this.current_index = (this.current_index + 1) % this.grid_num;
            },
            getPosition(name) {
                let stop_position = 0;
                this.awards.forEach((award, index) => {
                    if (award.name == name) {
                        stop_position = index;
                        return true;
                    }
                })
                return stop_position;
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