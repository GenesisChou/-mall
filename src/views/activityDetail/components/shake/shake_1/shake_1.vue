<style lang='scss' scoped>
    @import '../style.scss';
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
        <footer>
            <v-award-box :awords='activityDetail.items' color='red'></v-award-box>
            <v-recommend :recommends='activityDetail.recommend_items' color='red' text-color='red'></v-recommend>
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