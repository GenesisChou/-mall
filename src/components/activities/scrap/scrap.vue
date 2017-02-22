<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-scrap {
        padding-bottom: pxTorem(84);
        background-color: #4dd3d6;
        background-image: url('./images/scrapBackground.png');
        background-size: pxTorem(750) pxTorem(1968);
        background-position: pxTorem(0) pxTorem(-130);
        background-repeat: no-repeat;
    }
    
    header {
        position: relative;
    }
    
    .banner {
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .banner-cover {
        position: absolute;
        left: 0;
        bottom: 0;
        width: pxTorem(750);
        height: pxTorem(61);
        z-index: 1;
    }
    
    .derocation {
        position: absolute;
        left: 0;
        top: pxTorem(-35);
        width: pxTorem(746);
        height: pxTorem(446);
        z-index: 2;
    }
    
    main {
        position: relative;
        width: pxTorem(564);
        height: pxTorem(308);
        margin: 0 auto;
        margin-bottom: pxTorem(140);
        background-image: url('./images/scrapPanel.png');
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
        height: pxTorem(82);
        color: $white;
        font-size: pxTorem(38);
    }
    
    #lotteryContainer {
        position: absolute;
        left: pxTorem(15);
        top: pxTorem(85);
    }
    .scrap-cover{
        width:pxTorem(540);
        height:pxTorem(190);
        margin-left:pxTorem(15);
    }
    .start {
        position: absolute;
        left: 50%;
        top: 55%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        width: pxTorem(227);
        height: pxTorem(78);
        line-height: pxTorem(78);
        box-shadow: 0 pxTorem(5) pxTorem(8) 1px rgba(215, 65, 0, 0.75);
        border-radius: pxTorem(10);
        background-color: #ff5004;
        text-align: center;
        font-size: pxTorem(36);
        color: $white;
    }
    
    .notice {
        position: absolute;
        left: 0;
        bottom:10%;
        width: 100%;
        z-index: 2;
        text-align: center;
        color: #a78179;
        .number {
            padding: 0 pxTorem(5);
            font-size: pxTorem(30);
            color: #ff5004;
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
    <div class='v-scrap'>
        <header>
            <template v-if='!activityDetail.pic_banner'>
                <img class='banner' :src='activityDetail.pic_banner'>
                <img class='banner-cover' src='./images/bannerCover.png'>
            </template>
            <template v-else>
                <img class='banner' src='./images/scrapDefaultBanner.png'>
                <img class='derocation' src='./images/derocation.png'>
            </template>
        </header>
        <main>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='black'></v-integral-box>
            </div>
            <div id='lotteryContainer'> </div>
            <img class='scrap-cover' src='./images/scrapCover.png' ref='cover'>
            <a v-if='state=="ready"' class='start' @click='start'>开始刮奖</a>
            <h5 v-if='state=="ready" ' class='notice'>
                <template v-if='freeTimes>0'>
                    今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                </template>
                <template v-else>
                    每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                </template>
            </h5>

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
    import Lottery from './lottery.js'
    import vDescribeTitle from '../vDescribeTitle.vue';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox.vue';
    export default {
        name: 'scrap',
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
            freeTimes: Number
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
        computed: {
            user() {
                return this.$store.state.user;
            }
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
                            let canvas = document.getElementsByTagName('canvas');
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
                            let canvas = document.getElementsByTagName('canvas');
                            canvas = Array.prototype.slice.call(canvas);
                            canvas.forEach(item => {
                                item.parentElement.removeChild(item)
                            });
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
                this.lottery = new Lottery('lotteryContainer', this.$refs.cover, 'image', this.pxTorem(540),
                    this.pxTorem(190), (
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