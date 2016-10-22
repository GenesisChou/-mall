<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-quiz {
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
        background: $pink;
        border-top-left-radius: pxTorem(20);
        border-top-right-radius: pxTorem(20);
    }
    .panel-content {
        padding: pxTorem(35) pxTorem(55) pxTorem(50) pxTorem(50);
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
            }
            input[type="radio"]:checked + label:before {
                background: $gray;
            }
        }
        .submit {
            width: pxTorem(350);
            height: pxTorem(70);
            font-size: pxTorem(30);
        }
    }
}
</style>
<template>
    <div class='v-quiz '>
        <div class='head text-center'>
            <img src='./images/quiz.png' alt="">
        </div>
        <div v-for='($index,item) in questions' class='body'>
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
                        <button class='btn btn-pink submit text-huge' @click='submitAnswer()' :disabled='modal'>提交答案</button>
                    </div>
                </div>
            </div>
        </div>
        <v-alert :cover-close=false :show.sync='modal' :msg='msg' :type='is_win' :func='is_win?toOrderDetail:toggleModal' :btn-text='is_win?"查看":"关闭"'>
        </v-alert>
    </div>
</template>
<script>
import vAlert from 'components/v_alert'
export default {
    components: {
        vAlert
    },
    props: {
        questions: {
            type: Array,
            default: () => {
                return [];
            }
        },
        activityId: {
            type: String,
            default: ''
        },
        integral: {
            type: String,
            default: '0'
        },
    },
    name: 'quiz',
    data() {
        return {
            current_number: 0, //当前题目号 0开始
            modal: false,
            msg: '',
            integral_enough: false, //判断是否有足够积分进行活动
            answer_id: 0, //判断是否有选择题目
            is_right: false, //判断回答是否正确
            is_win: false, //判断是否中奖
            order_detail_id: '' //活动结束跳转id
        };
    },
    computed: {
        integral_enough: function() {
            return (parseInt(this.$parent.user.integral) - parseInt(this.integral)) >= 0 ? true : false;
        }

    },
    methods: {
        //提交答案
        submitAnswer() {
            if (this.integral_enough) {
                if (this.answer_id) {
                    this.$http.post(`${APP.HOST}/question_activity/${this.activityId}`, {
                        question_id: this.questions[this.current_number].id,
                        answer_id: this.answer_id,
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        let data = response.data;
                        if (data.status == APP.SUCCESS) {
                            this.$parent.getUserInfor(); //更新用户信息
                            if (data.data.is_right) {
                                if (data.data.is_win) {
                                    this.$set('is_win',data.data.is_win);
                                    this.$set('order_detail_id', data.data.id);
                                    this.toggleModal(data.data.name || '回答正确');
                                } else {
                                    this.toggleModal('谢谢参与');
                                }
                            } else {
                                this.toggleModal('回答错误');

                            }
                        } else {
                            this.toggleModal(data.info);
                        }
                    })

                } else {
                    this.toggleModal('请选择答案');
                }

            } else {
                this.toggleModal('积分不足');
            }

        },
        //路由跳转
        toOrderDetail() {
            this.$router.go({
                name: 'order_detail',
                query: {
                    order_id: this.order_detail_id
                }
            });
        },
        toggleModal(msg) {
            if (msg) {
                this.$set('msg', msg);
            }
            this.modal = !this.modal;
        }
    }
};
</script>
