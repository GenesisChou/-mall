<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-quiz {
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-image: url('./images/quizBackground.png');
        background-size: pxTorem(750) pxTorem(2235);
        background-color: #f7be14;
    }
    
    .banner {
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .panel {
        position: relative;
        width: pxTorem(591);
        height: auto;
        margin: pxTorem(45) auto 0 auto;
        border-radius: pxTorem(40);
        border: pxTorem(13) solid #6a3c05;
        background-color: $white;
    }
    
    .panel-head {
        position: absolute;
        left: 50%;
        top: pxTorem(-98);
        width: pxTorem(450);
        height: pxTorem(175);
        background-image: url('./images/quizPanelHead.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        color: #e65413;
        z-index: 1;
    }
    
    .integral-message {
        @include flex-center;
        width: 100%;
        height: 100%;
        font-size: pxTorem(38);
    }
    
    .panel-content {
        padding-bottom: pxTorem(80);
        color: #6f3a04;
        .quiz {
            position: relative;
            padding: pxTorem(90) pxTorem(60) pxTorem(40) pxTorem(60);
            font-size: pxTorem(30);
            text-align: justify;
        }
        .number {
            position: absolute;
            left: pxTorem(20);
            top: pxTorem(83);
            color: #e65413;
            font-size: pxTorem(36);
        }
    }
    
    .answers {
        @include flexbox;
        @include flex-wrap(wrap);
        font-size: pxTorem(34);
        color: #6f3a04;
        list-style: none;
        li {
            list-style: none;
            width: 50%;
            text-align: center;
            label {
                text-align: left;
                display: block;
                padding-left: pxTorem(37.5);
            }
        }
        input[type='radio'] {
            display: none;
        }
        label:before {
            content: "";
            display: inline-block;
            width: pxTorem(44);
            height: pxTorem(44);
            margin-right: pxTorem(30);
            background-image: url('./images/circle.png');
            background-size: 100% 100%;
            transform: translateY(pxTorem(5));
        }
        input[type="radio"]:checked+label:before {
            background-image: url('./images/selectedCircle.png');
        }
    }
    
    .panel-footer {
        position: absolute;
        left: 0;
        bottom: pxTorem(-85);
        width: 100%;
        .notice {
            width: pxTorem(520);
            height: pxTorem(134);
            text-align: center;
            margin: 0 auto;
            padding-top: pxTorem(30);
            background-image: url('./images/quizNotice.png');
            background-size: pxTorem(563) pxTorem(134);
            background-repeat: no-repeat;
            color: #6f3a04;
            font-size: pxTorem(24);
            .number {
                padding: 0 pxTorem(5);
                font-size: pxTorem(30);
                color: #f9bd16;
            }
        }
    }
    
    .submit {
        position: relative;
        display: block;
        width: pxTorem(322);
        height: pxTorem(82);
        line-height: pxTorem(82);
        margin: pxTorem(60) auto;
        box-shadow: pxTorem(4) pxTorem(3) pxTorem(5) 1px rgba(67, 160, 9, 0.68);
        border-radius: pxTorem(31);
        text-align: center;
        font-size: pxTorem(40);
        background-color: #62be11;
        color: $white;
        &:after {
            content: '';
            position: absolute;
            right: pxTorem(10);
            top: pxTorem(10);
            width: pxTorem(29);
            height: pxTorem(25);
            background-image: url('./images/buttonLight.png');
            background-size: 100% 100%;
        }
    }
    
    .describe {
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: #6a3c05;
        }
    }
</style>
<template>
    <div class='v-quiz '>
        <header>
            <img class='banner' v-if='activityDetail.pic_icon' :src='activityDetail.pic_icon'>
            <img class='banner' v-else src='./images/quizDefaultBanner.png'>
        </header>
        <template v-for='(item,$index) in activityDetail.questions'>
            <main v-if='current_number==$index' class='panel'>
                <header class='panel-head'>
                    <div class='integral-message'>
                        现有积分:
                        <v-integral-box :integral='user.integral>>0' color='white'></v-integral-box>
                    </div>
                </header>
                <main class='panel-content '>
                    <article class='quiz '>
                        <span class='number'>{{$index+1}}.</span> {{item.question}}
                    </article>
                    <ul class='answers'>
                        <li v-for='answer in item.answers'>
                            <input type='radio' :id='answer.id' :value='answer.id' v-model='answer_id'>
                            <label :for='answer.id'>{{answer.option}}</label>
                        </li>
                    </ul>
                </main>
                <footer class='panel-footer'>
                    <div v-if='freeTimes>0' class=' notice '>今天还有<span class='number'>{{freeTimes}}</span>次免费机会</div>
                    <div v-else class=' notice '>每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分</div>
                </footer>
            </main>
            <div class='submit' @click='submitAnswer'>提交答案</div>
        </template>
        <article class='describe'>
            <v-describe-title text='详细说明' color='green'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='green'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='green'></v-describe-title>
        </article>
        <footer>
            <v-aword-box :awords='activityDetail.items' color='green'></v-aword-box>
        </footer>

    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox';
    export default {
        name: 'quiz',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwordBox
        },
        props: {
            activityDetail: Object,
            freshFreeTimes: Function,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            freeTimes: Number,
            toggleDialog: Function
        },
        data() {
            return {
                state: '',
                current_number: 0, //当前题目号 0开始
                // integral_enough: false, //判断是否有足够积分进行活动
                answer_id: 0, //判断是否有选择题目
                is_right: '', //判断回答是否正确
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
            is_right(value) {
                if (this.state != 'start') return;
                this.freshFreeTimes();
                let result = this.activity_result;
                if (value) {
                    this.is_win = result.is_win;
                } else {
                    this.toggleDialog({
                        msg: '回答错误',
                        btn_text: '继续答题',
                        callback: () => {
                            this.init();
                        },
                    });
                }
            },
            is_win(value) {
                if (this.state != 'start') return;
                let result = this.activity_result;
                if (value) {
                    this.toggleDialog({
                        close_btn: true,
                        msg: '获得' + result.name,
                        type: 'success',
                        img: result.pic_thumb,
                        btn_text: '查看',
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init();
                        }
                    });
                } else {
                    this.toggleDialog({
                        msg: result.name,
                        callback: () => {
                            this.init();
                        }
                    });
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.current_number = 0; //当前题目号 0开始
                this.answer_id = 0; //判断是否有选择题目
                this.is_right = ''; //判断回答是否正确
                this.is_win = ''; //判断是否中奖
                this.activity_result = {};
            },
            //提交答案
            submitAnswer() {
                if (!this.answer_id) {
                    this.toggleDialog({
                        msg: '请选择答案',
                        btn_text: '我知道了'
                    })
                    return;
                }
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/question_activity/${this.id}`, {
                    question_id: this.activityDetail.questions[this.current_number].id,
                    answer_id: this.answer_id,
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.state = 'start';
                        this.activity_result = data.data;
                        this.is_right = this.activity_result.is_right;
                    } else {
                        this.toggleDialog({
                            msg: data.info
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })

            },
        }
    };
</script>