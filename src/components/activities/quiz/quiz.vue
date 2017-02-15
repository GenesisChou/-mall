<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-quiz {
        background-color: rgb(243, 243, 243);
        padding-bottom: pxTorem(36);
    }
    
    .head {
        text-align: center;
        img {
            width: pxTorem(493);
            height: pxTorem(193);
        }
    }
    
    .panel {
        width: pxTorem(620);
        height: auto;
        margin: pxTorem(10) auto;
        border-radius: pxTorem(20);
        box-shadow: pxTorem(5) pxTorem(5) pxTorem(5) rgba(0, 0, 0, .1);
        background-color: $white;
        font-size: pxTorem(36);
    }
    
    .panel-head {
        line-height: pxTorem(72);
        text-align: center;
        color: $white;
        background-color: $red;
        border-top-left-radius: pxTorem(20);
        border-top-right-radius: pxTorem(20);
    }
    
    .panel-content {
        padding: pxTorem(35) pxTorem(50) 0 pxTorem(50);
        .quiz {
            margin-bottom: pxTorem(35);
        }
    }
    
    .answers {
        font-size: pxTorem(30);
        color: $gray;
        list-style: none;
        li {
            list-style: none;
        }
        input[type='radio'] {
            display: none;
        }
        label {
            display: block;
            padding: pxTorem(18) 0;
        }
        label:before {
            content: "";
            display: inline-block;
            width: pxTorem(25);
            height: pxTorem(25);
            margin-right: pxTorem(25);
            border: pxTorem(3) solid $gray;
            border-radius: 50%;
            transform: translateY(pxTorem(3));
            -webkit-transform: translateY(pxTorem(3));
        }
        input[type="radio"]:checked+label:before {
            background: $gray;
        }
    }
    
    .panel-footer {
        text-align: center;
        margin-top: pxTorem(30);
        button {
            width: pxTorem(350);
            height: pxTorem(80);
            line-height: pxTorem(80);
            font-size: pxTorem(30);
        }
        h5{
            padding:pxTorem(30);
        }
    }
</style>
<template>
    <div class='v-quiz '>
        <header class='head'>
            <img src='./images/quiz.png' alt="">
        </header>
        <template v-for='(item,$index) in activityDetail.questions'>
            <main v-if='current_number==$index' class='panel'>
                <h1 class='panel-head'>
                    第{{$index+1}}题
                </h1>
                <section class='panel-content '>
                    <article class='quiz '>
                        {{item.question}}
                    </article>
                    <ul class='answers'>
                        <li v-for='answer in item.answers'>
                            <input type='radio' :id='answer.id' :value='answer.id' v-model='answer_id'>
                            <label :for='answer.id'>{{answer.option}}</label>
                        </li>
                    </ul>
                </section>
                <footer class='panel-footer'>
                    <button class='btn btn-red' @click='submitAnswer()'>提交答案</button>
                    <h5>{{notice}}</h5>
                </footer>
            </main>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'quiz',
        props: {
            activityDetail: Object,
            freshFreeTimes: Function,
            id: Number,
            notice: String,
            toOrderDetail: Function
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
        watch: {
            is_right(value) {
                if (this.state != 'start') return;
                this.freshFreeTimes();
                let result = this.activity_result;
                if (value) {
                    this.is_win = result.is_win;
                } else {
                    this.$store.dispatch('toggleAlert', {
                        msg: result.name,
                        type: 'error',
                        callback: () => {
                            this.init();
                        }
                    });
                }
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
                        }
                    });
                } else {
                    this.$store.dispatch('toggleAlert', {
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
                    this.$store.dispatch('toggleAlert', {
                        msg: '请选择答案'
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
                        this.$store.dispatch('toggleAlert', {
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