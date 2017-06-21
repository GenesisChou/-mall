<style lang='scss' scoped>
    @import '../style.scss';
    .v-scrap {
        background-color: #4dd3d6;
    }
    .header{
        position:relative;
        overflow: hidden;
    }
    .arc{
        position:absolute;
        bottom:pxTorem(-56);
        width:pxTorem(750);
        height:pxTorem(78);
    }
</style>
<template>
    <div class='v-scrap'>
        <header class='header'>
            <img class='banner' :src='activityDetail.pic_banner_new'>
            <img class='arc' src='./images/arc.png' >
        </header>
        <main>
            <div class='integral-message'>
                <v-integral-box :integral='user.integral>>0' color='orange'></v-integral-box>
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
        <!--<article class='describe'>
            <v-describe-title text='详细说明' color='aquamarine'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='aquamarine'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='aquamarine'></v-describe-title>
        </article>-->
        <footer>
            <v-award-box :awords='activityDetail.items' color='aquamarine'></v-award-box>
        </footer>
    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>