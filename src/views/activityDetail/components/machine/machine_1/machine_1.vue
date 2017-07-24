<style lang='scss' scoped>
    @import '../style.scss';
</style>
<template>
    <div class='v-machine'>
        <img class='background' src='./images/machineBackground.png'>
        <header class='header'>
            <img class='img-responsive' :src='activityDetail.pic_banner_new'>
            <img class='banner-decoration' src='./images/machineDecoration.png'>
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
        <footer>
            <v-award-box :awords='activityDetail.items' color='blue'></v-award-box>
            <v-recommend :recommends='activityDetail.recommend_items' color='blue'></v-recommend>
        </footer>
    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>