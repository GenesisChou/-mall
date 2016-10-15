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
        position: relative;
        line-height: pxTorem(62);
        font-size: pxTorem(30);
        background: $yellow;
        border-top-left-radius: pxTorem(20);
        border-top-right-radius: pxTorem(20);
        .point {
            position: absolute;
            right: pxTorem(48);
            top: 0;
        }
    }
    .panel-content {
        padding: pxTorem(25) pxTorem(55) pxTorem(50) pxTorem(50);
        .answers {
            margin: pxTorem(40) 0;
        }
        input[type='radio'] {
            &:before {
                content: '';
                display: inline-block;
                border-radius: 50%;
                border: pxTorem(1) solid $gray;
                width: pxTorem(15);
                height: pxTorem(15);
            }
            &:checked:before {
                border-color: $white;
                background: $yellow;
            }
        }
        .submit:active {
            transform: translate(pxTorem(1), pxTorem(1));
            box-shadow: pxTorem(1) pxTorem(1) pxTorem(1) rgba(0, 0, 0, .3);
        }
    }
}

.modal-content {
    width: pxTorem(500);
    height: pxTorem(260);
    padding-top: pxTorem(31);
    .icon {
        width: pxTorem(50);
        height: pxTorem(50);
    }
    .msg {
        line-height: pxTorem(101);
    }
}
</style>
<template>
    <div class='v-quiz '>
        <div class='head text-center'>
            <img src='./images/quiz.png' alt="">
        </div>
        <div v-for='($index,item) in questions' class='body'>
            <div v-if='current_number==$index' class='panel bg-white'>
                <div class='panel-head text-center'>
                    <strong>第{{$index+1}}题</strong>
                    <strong class='point'>10分</strong>
                </div>
                <div class='panel-content text-small'>
                    <div class='quiz'>
                        {{item.question}}
                    </div>
                    <div class='answers text-gray flex'>
                        <div class='flex-item' v-for='answer in item.answers'>
                            <input type='radio' :id='answer.id' :value='answer.id' v-model='answer_id'>
                            <label :for='answer.id'>{{answer.option}}</label>
                        </div>
                    </div>
                    <div class='text-center'>
                        <button class='btn btn-pink submit' @click='submitAnswer(toggleModal)'>提交答案</button>
                    </div>
                </div>
            </div>
        </div>
        <v-modal :show.sync='modal'>
            <div class='modal-content text-center'>
                <template v-if='result.is_right'>
                    <img class='icon' src='../../../assets/images/correct-hollow.png' />
                    <h2 class='text-large msg'>回答正确</h2>
                    <button class='btn btn-pink' v-link='{name:"order_detail",query:{order_id:result.id}}'>查看</button>
                </template>
                <template v-else>
                    <img class='icon' src='../../../assets/images/error-hollow.png' />
                    <h2 v-if='answer_id' class='text-large msg'>回答错误</h2>
                    <h2 v-else class='text-large msg'>请选择答案</h2>
                    <button class='btn btn-pink' @click='toggleModal'>关闭</button>
                </template>
            </div>
    </div>
    </v-modal>
    </div>
</template>
<script>
import vModal from 'components/v_modal'
export default {
    components: {
        vModal
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
        }
    },
    name: 'quiz',
    data() {
        return {
            current_number: 0, //当前题目号 0开始
            answer_id: 0, //答案id
            result: {}, //答题结果 is_right is_win desc
            modal: false
        };
    },
    methods: {
        //提交答案
        submitAnswer(func) {
            let question_id = this.questions[this.current_number].id;
            if (typeof func != 'function') {
                return;
            }
            if (this.answer_id) {
                this.$http.post(`${APP.HOST}/question_activity/${this.activityId}`, {
                    question_id: question_id,
                    answer_id: this.answer_id,
                    token: APP.TOKEN,
                    userid: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    this.$set('result', data.data);
                    func();
                }, (response) => {

                })
            } else {
                func();
            }
        },
        toggleModal() {
            this.modal = !this.modal;
        }
    }
};
</script>
