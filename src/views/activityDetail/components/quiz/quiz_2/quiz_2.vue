<style lang='scss' scoped>
    @import '../style.scss';
    .v-quiz {
        background: #ff7366;
    }

    .panel {
        border: pxTorem(6) solid #72113e;
        background-color: #ffb681;
    }

    .panel-head {
        strong {
            font-weight: normal;
            color: $white;
            text-shadow: 2px 0 1px #209a9d;
        }
    }

    .notice {
        color: $white;
        .number {
            color: #6a1333;
        }
    }

    .submit {
        @include active(#efd861,
        5%);
        box-shadow: pxTorem(4) pxTorem(3) pxTorem(5) 1px rgba(253, 35, 38, 0.68);
        background-color: #efd861;
        color: #72113e;
        &:after {
            background-color: $white;
            box-shadow: 0 0 pxTorem(4) 1px rgba(255, 255, 255, .3); //  width: pxTorem(29);
        }
    }

    .describe {
        .editor-style {
            color: $white;
        }
    }
</style>
<template>
    <div class='v-quiz '>

        <header class='header'>
            <img class='banner' :src='activityDetail.pic_banner_new'>
        </header>
        <template v-for='(item,$index) in activityDetail.questions'>
            <main v-if='current_number==$index' class='panel'>
                <header class='panel-head'>
                    <div class='integral-message'>
                        <strong>现有积分:</strong>
                        <v-integral-box :integral='user.integral>>0' color='aquamarine'></v-integral-box>
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
                    <div class='notice'>
                        <template v-if='isOff'>活动已结束!</template>
                        <template v-else-if='freeTimes>0'>今天还有<span class='number'>{{freeTimes}}</span>次免费机会</template>
                        <template v-else>每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分</template>
                    </div>
                </footer>
            </main>
            <div class='submit' @click='submitAnswer'>提交答案</div>
        </template>
        <!--<article class='describe'>
            <v-describe-title text='详细说明' color='yellow'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='yellow'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='yellow'></v-describe-title>
        </article>-->
        <footer>
            <v-award-box :awords='activityDetail.items' color='yellow'></v-award-box>
        </footer>

    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>