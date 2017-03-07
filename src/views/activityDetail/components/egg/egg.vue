<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .egg {
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-color: #fdf860;
    }
    
    .header {
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .main {
        position: relative;
    }
    
    .integral-message {
        display: flex;
        align-items: center;
        justify-content: center;
        display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-justify-content: center;
        width: pxTorem(412);
        height: pxTorem(83);
        margin: 0 auto;
        background-color: #c92426;
        border-radius: pxTorem(10);
        color: $white;
        font-size: pxTorem(38);
    }
    
    .eggs {
        margin-top: pxTorem(70);
        td {
            position: relative;
            width: pxTorem(250);
            height: pxTorem(250);
            background-image: url('./images/egg.png');
            background-size: pxTorem(202) pxTorem(200);
            background-position: center center;
            background-repeat: no-repeat;
        }
        td.active {
            background-image: url('./images/brokenEgg.png');
        }
        td.active:after {
            content: '';
            position: absolute;
            width: pxTorem(108);
            height: pxTorem(87);
            top: pxTorem(-35);
            left: pxTorem(250/2-108/2+30);
            background-image: url('./images/hammer.png');
            background-size: 100%;
            -webkit-transform-origin: right bottom;
            -webkit-animation: break 1.5s linear;
        }
    }
    
    .notice {
        padding-top: pxTorem(30);
        text-align: center;
        font-weight: 500;
        color: #ad0406;
        .number {
            padding: 0 pxTorem(3);
            color: #ff494b;
            font-size: pxTorem(36);
        }
    }
    
    .describe {
        position: relative;
        padding: pxTorem(50) pxTorem(40) 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: #ad0406;
        }
    }
    
    .background {
        position: absolute;
        left: 0;
        top: pxTorem(335);
        width: pxTorem(750);
        height: pxTorem(928);
        z-index: 0;
    }
    
    @-webkit-keyframes break {
        0% {
            -webkit-transform: rotate(0deg);
        }
        25% {
            -webkit-transform: rotate(30deg);
        }
        50% {
            -webkit-transform: rotate(0deg);
        }
        75% {
            -webkit-transform: rotate(30deg);
        }
        100% {
            -webkit-transform: rotate(0deg);
        }
    }
</style>

<template>
    <div class='egg'>
        <header class='header'>
            <img class='img-responsive' src='./images/eggDefaultBanner.png'>
        </header>
        <img class='background' src="./images/eggBackground.png">
        <main class='main'>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='red'></v-integral-box>
            </div>
            <table class='eggs'>
                <tr>
                    <td :class='{active:active_num==1}' @click='breakEgg(1)'> </td>
                    <td :class='{active:active_num==2}' @click='breakEgg(2)'> </td>
                    <td :class='{active:active_num==3}' @click='breakEgg(3)'> </td>
                </tr>
                <tr>
                    <td :class='{active:active_num==4}' @click='breakEgg(4)'> </td>
                    <td :class='{active:active_num==5}' @click='breakEgg(5)'> </td>
                    <td :class='{active:active_num==6}' @click='breakEgg(6)'> </td>
                </tr>
            </table>
            <h2 class='notice'>
                <template v-if='freeTimes>0'>
                    今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                </template>
                <template v-else>
                    每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                </template>
            </h2>
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
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox';
    export default {
        name: 'egg',
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
            toggleDialog: Function
        },
        data() {
            return {
                state: '',
                activity_result: {},
                active_num: '',
                is_win: '',
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            is_win(value) {
                if (this.state != 'start') return;
                let result = this.activity_result;
                this.freshFreeTimes();
                if (value) {
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        setTimeout(() => {
                            this.$store.dispatch('toggleLoading');
                            this.toggleDialog({
                                type: 'success',
                                img: result.pic_thumb,
                                msg: '获得' + result.name,
                                callback: this.toOrderDetail(result.id),
                                callback_close: () => {
                                    this.init();
                                },
                                btn_text: '查看'
                            });
                        }, 1500);
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this.$store.dispatch('toggleLoading');
                        setTimeout(() => {
                            this.$store.dispatch('toggleLoading');
                            this.toggleDialog({
                                msg: result.name,
                                btn_text: '再来一次',
                                callback: () => {
                                    this.init();
                                },
                            });
                        }, 1500);
                    }, 1500);
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.activity_result = {};
                this.active_num = 0;
                this.is_win = '';
            },
            breakEgg(num) {
                if (this.state != 'ready') return;
                this.state = 'start';
                this.active_num = num;
                this.$http.post(`${APP.HOST}/turntable_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info
                        })
                    }
                }, (response) => {})
            }
        }
    }
</script>