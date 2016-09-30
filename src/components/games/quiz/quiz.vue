<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-quiz {
    padding: pxTorem(14) pxTorem(64) pxTorem(36) pxTorem(64);
}

.head {
    img{
        width: pxTorem(509);
        height: pxTorem(240);
    }
}

.panel {
    margin-top:pxTorem(10);
    border-radius: pxTorem(20);
    box-shadow: pxTorem(5) pxTorem(5) pxTorem(5) rgba(0, 0, 0, .1);
    .panel-head {
        position: relative;
        line-height: pxTorem(62);
        font-size: pxTorem(30);
        background: #feca5e;
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
            margin-top: pxTorem(40);
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
            ;
            &:checked:before {
                border-color:$white;
                background: #feca5e;
            }
            ;
        }
    }
}
</style>
<template>
    <div class='v-quiz ' v-for='($index,item) in questions'>
        <div class='head text-center'>
            <img src='./images/quiz.png' alt="">
        </div>
        <div class='body'>
            <div class='panel bg-white'>
                <div class='panel-head text-center'>
                    <strong>第{{$index+1}}题</strong>
                    <strong class='point'>10分</strong>
                </div>
                <div class='panel-content text-small'>
                    <div class='quiz'>
                            {{item.question}}
                    </div>
                    <div class='answers text-gray flex'>
                        <div class='flex-item' v-for='answer in item.answer'>
                            <input type='radio' :id='answer.id' :value='$index' v-model='pick'>
                            <label :for='answer.id'>{{answer.option}}</label>
                        </div>
<!--                         <div class='flex-item'>
                            <input type='radio' id='two' value=2 v-model='pick'>
                            <label for='two'>铁面无私</label>
                        </div>
                        <div class='flex-item'>
                            <input type='radio' id='three' value=3 v-model='pick'>
                            <label for='three'>铁面无私</label>
                        </div>
 -->                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        questions:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    },
    name: 'quiz',
    data() {
        return {
            pick: ''
        };
    }
};
</script>
