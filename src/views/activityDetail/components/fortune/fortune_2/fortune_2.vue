<style lang='scss' scoped>
    @import '../style.scss';
    .fortune {
        background-color: #f92b20;
        background-image: url('./images/fortuneBackground.png');
    }


    .panel {
        background-image: url('./images/fortunePanel.png');
    }


    td {
        background-image: url('./images/fortunePanelItem.png');
        &.center {
            background-image: url('./images/fortuneStartButton.png');
        }
        &.active {
            background-image: url('./images/fortunePanelItemActive.png');
        }
        &.center.active {
            background-image: url('./images/fortuneStartButtonActive.png');
        }
    }

    .notice {
        color: $white;
    }

    .describe {
        .editor-style {
            color: $white;
        }
    }
</style>
<template>
    <div class='fortune'>
        <header>
            <img class='banner' :src='activityDetail.pic_banner_new'>
        </header>
        <main>
            <div class='panel'>
                <div class='integral-message'>
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='shit'></v-integral-box>
                </div>
                <table>
                    <tr>
                        <td :class='{active:current_index==0}'>
                            <img :src='awards[0].pic'>
                        </td>
                        <td :class='{active:current_index==1}'>
                            <img :src='awards[1].pic'>
                        </td>
                        <td :class='{active:current_index==2}'>
                            <img :src='awards[2].pic'>
                        </td>
                    </tr>
                    <tr>
                        <td :class='{active:current_index==7}'>
                            <img :src='awards[7].pic'>
                        </td>
                        <td :class='["center",state==="start"?"active":""]' @click='start'>

                        </td>
                        <td :class='{active:current_index==3}'>
                            <img :src='awards[3].pic'>
                        </td>
                    </tr>
                    <tr>
                        <td :class='{active:current_index==6}'>
                            <img :src='awards[6].pic'>
                        </td>
                        <td :class='{active:current_index==5}'>
                            <img :src='awards[5].pic'>
                        </td>
                        <td :class='{active:current_index==4}'>
                            <img :src='awards[4].pic'>
                        </td>
                    </tr>
                </table>
                <h5 class='notice'>
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
            </div>
        </main>
        <!--<article class='describe'>
            <v-describe-title text='详细说明' color='purple'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='purple'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='purple'></v-describe-title>
        </article>-->
        <footer>
            <v-award-box :awords='activityDetail.items' color='purple'></v-award-box>
        </footer>
    </div>
</template>
<script>
    import mixin from '../mixin.js';
    export default {
        mixins: [mixin],
    };
</script>