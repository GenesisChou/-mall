<style lang='scss' scoped>
    @import '../style.scss';
    .v-machine {
        background-color: #0469b9;
    }

    .background {
        height: pxTorem(1717);
        top:0;
    }
</style>
<template>
    <div class='v-machine'>
        <img class='background' src='./images/machineBackground.png'>
        <header class='header'>
            <img class='img-responsive' :src='activityDetail.pic_banner_new'>
        </header>
        <main>
            <div class='machine'>
                <header class='integral-message'>
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='pink'></v-integral-box>
                </header>
                <ul class='container' ref='container'>
                    <img class='shadow' src='./images/machineShadow.png'></img>
                    <li class='group'>
                        <ul class='awards'>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>
                        </ul>
                    </li>
                    <li class='group'>
                        <ul class='awards'>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>

                        </ul>
                    </li>
                    <li class='group'>
                        <ul class='awards'>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>
                            <li v-for='award in activityDetail.items'>
                                <img :src='award.pic'>
                            </li>
                        </ul>
                    </li>
                </ul>
                <footer class='notice'>
                    <template v-if='isOff'>
                        活动已结束！
                    </template>
                    <template v-else-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </footer>
            </div>
            <div class='operation'>
                <div class='line'></div>
                <img @click='start' src='./images/machineButton.png'>
            </div>
        </main>
        <article class='describe'>
            <v-describe-title text='详细说明' color='palaceblue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='palaceblue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='palaceblue'></v-describe-title>
        </article>
        <footer>
            <v-award-box :awards='activityDetail.items' color='yellow'></v-award-box>
        </footer>
    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>