<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-machine {
        position: relative;
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-color: #64acff;
        ul,
        li {
            list-style: none;
        }
    }
    
    .header {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .banner-decoration {
        position: absolute;
        left: 0;
        top: 0;
        width: pxTorem(750);
        height: pxTorem(37);
        z-index: 2;
    }
    
    .default-banner {
        position: absolute;
        width: pxTorem(750);
        height: pxTorem(434);
        z-index: 2;
    }
    
    .background {
        position: absolute;
        width: pxTorem(750);
        height: pxTorem(1026);
        left: 0;
        top: pxTorem(90);
        z-index: 0;
    }
    
    .machine {
        position: relative;
        padding: pxTorem(32);
        margin: pxTorem(66) auto;
        width: pxTorem(740);
        height: pxTorem(525);
        background-image: url('./images/machinePanel.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .integral-message {
            position: absolute;
            top: pxTorem(-40);
            left: 50%;
            margin-left: pxTorem(-416/2);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            width: pxTorem(416);
            height: pxTorem(85);
            background-color: #fdc713;
            border-radius: pxTorem(10);
            box-shadow: 0 pxTorem(5) pxTorem(5) #fbab07;
            font-size: pxTorem(38);
            color: $white;
            z-index: 1;
        }
        .notice {
            position: absolute;
            bottom: pxTorem(-20);
            left: 50%;
            margin-left: pxTorem(-320/2);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            width: pxTorem(320);
            height: pxTorem(63);
            background-color: #76e6f7;
            border-radius: pxTorem(10);
            box-shadow: 0 pxTorem(5) pxTorem(5) #367fe5;
            font-weight: 500;
            color: #fc4c60;
            z-index: 1;
            .number {
                padding: 0 pxTorem(5);
                font-size: pxTorem(36);
                color: $white;
            }
        }
        .container {
            display: flex;
            display: -webkit-flex;
            position: relative;
            background-color: $white;
            width: 100%;
            height: 100%;
            border: pxTorem(30) solid #fdc713;
            border-radius: pxTorem(12);
            box-shadow: 0 0 pxTorem(8) rgba(0, 0, 0, .6);
        }
        .shadow {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        .group {
            flex: 1;
            -webkit-flex: 1;
            height: pxTorem(400);
            border-right: pxTorem(6) solid #fdc713;
            overflow: hidden;
            &:last-child {
                border: none;
            }
        }
        .awords {
            position: relative;
            top: -25%;
            li {
                display: flex;
                display: -webkit-flex;
                align-items: center;
                -webkit-align-items: center;
                justify-content: center;
                -webkit-justify-content: center;
                height: pxTorem(200);
            }
            img {
                width: pxTorem(180);
                height: pxTorem(140);
            }
        }
    }
    
    .operation {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(138);
        text-align: center;
        margin-bottom: pxTorem(40);
        img {
            position: relative;
            width: pxTorem(243);
            height: pxTorem(138)
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
            -webkit-transform: translateY(-50%);
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
            -webkit-transform: translateY(-50%);
        }
        .line:before {
            left: pxTorem(-7);
        }
        .line:after {
            right: pxTorem(-7);
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
    <div class='v-machine'>
        <img class='background' src='./images/machineBackground.png'>
        <header class='header'>
            <img v-if='activityDetail.pic_icon' :src='activityDetail.pic_icon' class='img-responsive'>
            <img v-else class='default-banner' src='./images/machineDefaultBanner.png'>
            <img class='banner-decoration' src='./images/machineDecoration.png'>
        </header>
        <main>
            <div class='machine'>
                <header class='integral-message'>
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='pink'></v-integral-box>
                </header>
                <ul class='container' ref='container'>
                    <img class='shadow' src='./images/machineShadow.png'></img>
                    <li class='group'>
                        <ul class='awords'>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                        </ul>
                    </li>
                    <li class='group'>
                        <ul class='awords'>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>

                        </ul>
                    </li>
                    <li class='group'>
                        <ul class='awords'>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                        </ul>
                    </li>


                </ul>
                <footer class='notice'>
                    <template v-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </footer>
            </div>
            <div class='operation'>
                <div class='line'></div>
                <img @click='start' src='./images/machineButton.png'>
            </div>
        </main>
        <article class='describe'>
            <v-describe-title text='详细说明' color='blue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='blue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='blue'></v-describe-title>
        </article>
        <footer>
            <v-aword-box :awords='activityDetail.items' color='blue'></v-aword-box>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox';
    export default {
        name: 'machine',
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
                groups: '',
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            state(value) {
                if (value == 'stop') {
                    this.$store.dispatch('toggleLoading');
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        this.toggleDialog(this.alert);
                    }, 1000)
                } else if (value == 'rotating') {
                    if (this.is_win) {
                        let name = this.activity_result.name,
                            stop_num = this.getPosition(name, this.activityDetail.items);
                        this.rotate(0, stop_num);
                        this.rotate(1, stop_num, 800);
                        this.rotate(2, stop_num, 1600, () => {
                            setTimeout(() => {
                                this.toggleDialog(this.alert)
                            }, 500)
                        });
                    } else {
                        //获取三个不重复的数字组成的数组
                        const random_array = this.createRandomArray();
                        console.log(random_array);
                        this.rotate(0, random_array[0]);
                        this.rotate(1, random_array[1], 800);
                        this.rotate(2, random_array[2], 1600, () => {
                            setTimeout(() => {
                                this.toggleDialog(this.alert);
                            }, 500)
                        });
                    }
                }
            },
            is_win(value) {
                if (this.state == 'ready') return;
                let result = this.activity_result;
                this.freshFreeTimes();
                if (value) {
                    this.alert = {
                        type: 'success',
                        img: result.pic_thumb,
                        msg: '获得' + result.name,
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
            }
        },
        deactivated() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.groups = this.$refs.container.querySelectorAll('.awords');
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
            start() {
                if (this.state != 'ready') return;
                this.state = 'start';
                this.$http.post(`${APP.HOST}/hot_pot_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                        this.state = 'rotating';
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        })
                    }
                }, (response) => {})

            },
            rotate(group_num, stop_num, delay_time = 0, callback) {
                this.loop(group_num, stop_num, delay_time, () => {
                    this.stop(group_num, stop_num).then(() => {
                        if (callback) {
                            callback();
                        }
                    });
                });
            },
            loop(group_num, stop_num, delay_time, callback) {
                let current_top = 0,
                    current_turn = 0,
                    turns = 8;
                const limit_top = (this.activityDetail.items.length - 1) * 100;
                setTimeout(() => {
                    const timer = setInterval(() => {
                        this.groups[group_num].style.marginTop = `-${current_top}%`;
                        current_top += 10;
                        if (current_top > limit_top + 100) {
                            current_top = 0;
                            if (++current_turn > turns) {
                                clearInterval(timer);
                                this.groups[group_num].style.marginTop = 0;
                                if (callback) {
                                    callback();
                                }
                            }
                        }
                    }, 10);
                }, delay_time);
            },
            stop(group_num, stop_num) {
                return new Promise(resolve => {
                    let current_top = 0;
                    const timer = setInterval(() => {
                        this.groups[group_num].style.marginTop = `-${current_top}%`;
                        current_top += 10;
                        if (stop_num == 0) {
                            stop_num = this.activityDetail.items.length;
                        }
                        if (current_top > (stop_num - 1) * 100) {
                            clearInterval(timer);
                            if (resolve) {
                                resolve();
                            }
                        }
                    }, 10);
                })

            },
            getPosition(name, awords) {
                let stop_num = 0;
                awords.forEach((award, index) => {
                    if (award.name == name) {
                        stop_num = index;
                        return true;
                    }
                })
                return stop_num;
            },
            createRandomArray() {
                let temp = {},
                    result = [],
                    state = true,
                    limit = this.activityDetail.items.length;
                while (state) {
                    let random = Math.floor(Math.random() * limit);
                    if (!temp[random]) {
                        temp[random] = true;
                        result.push(random);
                    }
                    if (result.length == 3) {
                        state = false;
                    }
                }
                return result;
            }
        },

    }
</script>