<style lang='scss' scoped>
    @import '../style.scss';
    .v-scrap {
        background-color: #ffe656;
        background-image: linear-gradient(transparent 90%, #e6c12b 90%),
        linear-gradient(to right, transparent 90%, #e6c12b 90%);
        background-size: pxTorem(24) pxTorem(24);
    }

    .describe {
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: #510c13;
        }
    }
</style>
<template>
    <div class='v-scrap'>
        <header>
            <img class='banner' :src='activityDetail.pic_banner_new'>
        </header>
        <main>
            <div class='integral-message'>
                <v-integral-box :integral='user.integral>>0' color='yellow'></v-integral-box>
            </div>
            <div id='lotteryContainer'> </div>
            <div v-if='state=="ready"' class='start' @click='start'>开始刮奖</div>
            <h5 v-if='state=="ready" ' class='notice'>
                <template v-if='isOff'>
                    活动已结束！
                </template>
                <template v-else-if='freeTimes>0'>
                    今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                </template>
                <template v-else>
                    每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                </template>
            </h5>
        </main>
        <footer>
            <v-award-box :awords='activityDetail.items' color='orange'></v-award-box>
            <v-recommend :recommends='activityDetail.recommend_items' color='orange'></v-recommend>
        </footer>
    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>