<style lang='scss' scoped>
    @import '../style.scss';
    .v-shake {
        background-color: #FCE284;
    }
    .integral-message{
        background-color: #e34a38;
    }

    .describe {
        position: relative;
        z-index: 1;
    }

    .pit {
        position: absolute;
        left: pxTorem(500);
        top: pxTorem(1320);
        width: pxTorem(127);
        height: pxTorem(63);
        z-index: 0;
        &.large {
            left: pxTorem(185);
            top: pxTorem(1500);
            width: pxTorem(127*1.5);
            height: pxTorem(63*1.5);
        }
    }
</style>
<template>
    <div class='v-shake '>
        <header class='header'>
            <img class='banner' :src='activityDetail.pic_banner_new'>
        </header>
        <main class='shake-panel'>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='red'></v-integral-box>
            </div>
            <img :class='["hand",state=="shaking"?"active":""]' src="./images/shakeHand.png">
            <div class='panel-footer'>
                <div class='notice'>
                    <template v-if='isOff'>
                        活动已结束！
                    </template>
                    <template v-else-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </div>
            </div>
        </main>
        <img class='pit' src='./images/pit.png'>
        <img class='pit large' src='./images/pit.png'>
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
            <v-award-box :awords='activityDetail.items' color='red'></v-award-box>
        </footer>
        <audio ref='audio'>
            <source src="http://xunlei.sc.chinaz.com/files/download/sound1/201410/5018.wav" type="audio/mpeg" />
        </audio>
    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin]
    };
</script>