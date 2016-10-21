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
                        <button class='btn btn-pink submit text-huge' @click='submitAnswer(toggleModal)' :disabled='modal'>提交答案</button>
                    </div>
                </div>
            </div>
        </div>
        <v-alert :cover-close=false :show.sync='modal' :msg='msg' :type='result.is_win?true:false' :func='result.is_win?toOrderDetail:toggleModal' :btn-text='result.is_win?"查看":"关闭"' >
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
            answer_id: 0, //答案id
            result: {}, //答题结果 is_right is_win desc
            modal: false,
            msg: '',
            state: {
                start: false,
                end: false
            }
        };
    },
    computed: {
        start_enble: function() {
            return (parseInt(this.$parent.user.integral) - parseInt(this.integral)) >= 0 ? true : false;
        }
    },
    methods: {
        //提交答案
        submitAnswer(func) {
            this.$set('state.start', this.start_enble);
            if (this.state.start) {
                if (this.answer_id) {
                    let question_id = this.questions[this.current_number].id;
                    this.$http.post(`${APP.HOST}/question_activity/${this.activityId}`, {
                        question_id: question_id,
                        answer_id: this.answer_id,
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        let data = response.data;
                        this.$set('result', data.data);
                        this.$set('msg', data.data.name);
                        this.$parent.gerUserInfor();
                        func();
                    }, (response) => {

                    })
                } else {
                    this.$set('msg', '请选择答案');
                    this.$set('result.is_win', false);
                    func();
                }
            } else {
                this.$set('msg', '积分不足');
                this.$set('result.is_win', false);
                func();
            }

        },
        //获取正确答案
        getRightAnswer(answers = []) {
            let id = '';
            answers.forEach((item) => {
                if (item.isanswer) {
                    return id = item.id;
                }
            })
            return id || 0;
        },
        //路由跳转
        toOrderDetail() {
            this.$router.go({
                name: "order_detail",
                query: {
                    order_id: this.result.id
                }
            });
        },
        toggleModal() {
            this.modal = !this.modal;
        }
    }
};
</script>
