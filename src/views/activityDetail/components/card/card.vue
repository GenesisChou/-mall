<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-card {
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-image: url('./images/cardBackground.png');
        background-size: pxTorem(750) pxTorem(15);
    }

    .background-top {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        width: pxTorem(750);
        height: pxTorem(1250);
        background-image: url('./images/cardBackgroundTop.png');
        background-size: pxTorem(750) pxTorem(15);
    }

    .decoration {
        position: absolute;
    }

    .header {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(400);
    }

    .main {
        position: relative;
        padding: 0 pxTorem(40);
        height: pxTorem(787);
        margin-top: pxTorem(20);
    }

    .hands {
        position: absolute;
        left: 0;
        top: pxTorem(250);
        width: pxTorem(750);
        height: pxTorem(533);
    }

    .integral-message {
        @include flex-center;
        position: relative;
        width: pxTorem(412);
        height: pxTorem(83);
        margin: 0 auto;
        background-color: #e63805;
        box-shadow: 0 pxTorem(5) pxTorem(5) rgba(0, 0, 0, .2);
        border-radius: pxTorem(10);
        color: $white;
        font-size: pxTorem(38);
    }

    .cards {
        position: relative;
        height: pxTorem(535);
        margin-top: pxTorem(30);
        list-style: none;
    }

    .card {
        position: absolute;
        width: pxTorem(204);
        height: pxTorem(245);
        background-image: url('./images/card.png');
        background-repeat: no-repeat;
        background-size: 100%;
        list-style: none;
        &:nth-child(1) {
            top: 0;
            left: pxTorem(116);
        }
        &:nth-child(2) {
            top: 0;
            left: pxTorem(348);
        }
        &:nth-child(3) {
            top: pxTorem(286);
            left: 0;
        }
        &:nth-child(4) {
            top: pxTorem(286);
            left: pxTorem(232);
        }
        &:nth-child(5) {
            top: pxTorem(286);
            left: pxTorem(465);
        }
    }


    .notice {
        position: absolute;
        left: 50%;
        bottom: pxTorem(55);
        min-width: pxTorem(249);
        margin: 0 auto;
        padding: 0 pxTorem(20);
        height: pxTorem(56);
        font-weight: 500;
        background-color: #ff9c01;
        box-shadow: 0 pxTorem(5) pxTorem(5) rgba(0, 0, 0, .2);
        border-radius: pxTorem(10);
        color: $white;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        >div {
            @include flex-center;
        }
        .number {
            padding: 0 pxTorem(10);
            color: #e63805;
            font-size: pxTorem(44);
        }
    }

    .describe {
        position: relative;
        padding: 0 pxTorem(40);
        background-image: url('./images/cardDecoration.png');
        background-repeat: no-repeat;
        background-size: pxTorem(750) pxTorem(84);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: $white;
        }
    }
</style>

<template>
    <div class='v-card'>
        <div class='background-top'></div>
        <header class='header'>
            <img class='img-responsive' src='./images/cardDefaultBanner.png'>
            <img class='hands' src='./images/cardHands.png'>
        </header>
        <main class='main'>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='linen'></v-integral-box>
            </div>
            <ul class='cards'>
                <li class='card' v-for='i in 5'></li>
            </ul>
            <div class='notice'>
                <div>
                    <template v-if='freeTimes>0'>
                        今天还有<strong class='number'>{{freeTimes}}</strong>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<strong class='number'>{{activityDetail.integral>>0}}</strong>积分
                    </template>
                </div>
            </div>
        </main>
        <article class='describe'>
            <v-describe-title text='详细说明' color='brown'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='brown'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='brown'></v-describe-title>
        </article>
        <footer>
            <v-aword-box :awords='activityDetail.items' color='brown'></v-aword-box>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox';
    export default {
        name: 'card',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwordBox
        },
        props: {
            freshFreeTimes: Function,
            freeTimes: Number,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            toggleDialog: Function
        },
        data() {
            return {
                state: '',
                activity_result: {},
                light_num: '',
                select_num: '',
                cards: '',
                is_win: '',
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {

        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.activity_result = {};
                this.light_num = '';
                this.select_num = '';
                this.is_win = '';
            },
        }
    }
</script>