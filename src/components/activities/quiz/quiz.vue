<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-quiz {
    background-color: rgb(243, 243, 243);
    padding: pxTorem(14) pxTorem(64) pxTorem(36) pxTorem(64);
}

.head {
    img {
        width: pxTorem(493);
        height: pxTorem(193);
    }
}

.panel {
    margin-top: pxTorem(10);
    border-radius: pxTorem(20);
    box-shadow: pxTorem(5) pxTorem(5) pxTorem(5) rgba(0, 0, 0, .1);
    .panel-head {
        line-height: pxTorem(72);
        background-color: $red;
        border-top-left-radius: pxTorem(20);
        border-top-right-radius: pxTorem(20);
    }
    .panel-content {
        padding: pxTorem(35) pxTorem(55) pxTorem(100) pxTorem(50);
        .quiz {
            margin-bottom: pxTorem(35);
        }
        .answers {
            font-size: pxTorem(30);
            margin-bottom: pxTorem(50);
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
                -ms-transform: translateY(pxTorem(3));
                -moz-transform: translateY(pxTorem(3));
                -webkit-transform: translateY(pxTorem(3));
                -o-transform: translateY(pxTorem(3));
            }
            input[type="radio"]:checked + label:before {
                background: $gray;
            }
        }
        .submit {
            width: pxTorem(350);
            font-size: pxTorem(30);
        }
    }
}
.free-time-message{
  position:absolute;
  left:50%;
  bottom:6%;
  transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -o-transform: translateX(-50%);
}
</style>
<template>
    <div class='v-quiz '>
        <div class='head text-center'>
            <img src='./images/quiz.png' alt="">
        </div>
        <div v-for='(item,$index) in questions' class='body'>
            <div v-if='current_number==$index' class='panel bg-white text-huge '>
                <div class='panel-head text-center text-white'>
                    第{{$index+1}}题
                </div>
                <div class='panel-content '>
                    <div class='quiz '>
                        {{item.question}}
                    </div>
                    <div class='answers text-gray '>
                        <div class='answer ' v-for='answer in item.answers'>
                            <input type='radio' :id='answer.id' :value='answer.id' v-model='answer_id'>
                            <label :for='answer.id'>{{answer.option}}</label>
                        </div>
                    </div>
                    <div class='text-center'>
                        <button class='btn btn-red btn-large submit ' @click='submitAnswer()'>提交答案</button>
                    </div>
                </div>
            </div>
        </div>
        <div class='free-time-message'>
            提示:您还剩余{{freeTimes}}次免费机会啦
        </div>
    </div>
</template>
<script>
export default {
    name: 'quiz',
    props: {
        questions: Array,
        freeTimes: Number
    },
    data() {
        return {
            current_number: 0, //当前题目号 0开始
            // integral_enough: false, //判断是否有足够积分进行活动
            answer_id: 0, //判断是否有选择题目
            is_right: false, //判断回答是否正确
            is_win: false, //判断是否中奖
            order_detail_id: '' //活动结束跳转id
        };
    },
    methods: {
        //提交答案
        submitAnswer() {
            if (this.answer_id) {
                this.$store.dispatch('toggleLoading', {
                    show: true
                });
                this.$http.post(`${APP.HOST}/question_activity/${this.$parent.activity_id}`, {
                    question_id: this.questions[this.current_number].id,
                    answer_id: this.answer_id,
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');

                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.freshFreeTimes();
                        this.$store.dispatch('getUserInfor'); //更新用户信息
                        if (data.data.is_right) {
                            if (data.data.is_win) {
                                this.is_win = data.data.is_win;
                                this.order_detail_id = data.data.id;
                                this.toggleAlert({
                                    msg: data.data.name,
                                    type: 'correct',
                                    btn_text: '查看',
                                    callback: this.toOrderDetail
                                });
                            } else {
                                this.toggleAlert({
                                    msg: '谢谢参与',
                                });
                            }
                        } else {
                            this.toggleAlert({
                                msg: '回答错误',
                                type: 'error'
                            });
                        }
                    } else {
                        this.toggleAlert({
                            msg: data.info
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })

            } else {
                this.toggleAlert({
                    msg: '请选择答案'
                });
            }

        },
        //路由跳转
        toOrderDetail() {
            this.$router.push({
                name: 'order_detail',
                query: {
                    order_id: this.order_detail_id
                }
            })
        },
        toggleAlert(alert) {
            alert.cover_close = false;
            this.$store.dispatch('toggleAlert', alert);
        },
        //刷新免费次数
        freshFreeTimes() {
            this.$parent.getFreeTimes();
        }
    }
};
</script>
