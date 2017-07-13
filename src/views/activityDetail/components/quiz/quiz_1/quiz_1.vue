<style lang='scss' scoped>
    @import '../style.scss';
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
                    <div class='notice'>
                        <template v-if='isOff'>活动已结束!</template>
                        <template v-else-if='freeTimes>0'>今天还有<span class='number'>{{freeTimes}}</span>次免费机会</template>
                        <template v-else>每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分</template>
                    </div>
                </footer>
            </main>
            <div class='submit' @click='submitAnswer'>提交答案</div>
        </template>
        <footer>
            <v-award-box :awords='activityDetail.items' color='green'></v-award-box>
            <v-recommand :recommands='activityDetail.recommend_items' color='green'></v-recommand>
        </footer>

    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>