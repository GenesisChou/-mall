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
        img {
            position:absolute;
            bottom:0;
            width: pxTorem(750);
            height: pxTorem(84);
        }
    }



    .banner {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .main {
        position: relative;
        padding: 0 pxTorem(40);
        height: pxTorem(787);
    }

    .integral-message {
        @include flex-center;
        position: relative;
        width: pxTorem(412);
        height: pxTorem(83);
        margin: pxTorem(42) auto 0 auto;
        background-color: #e63805;
        box-shadow: 0 pxTorem(5) pxTorem(5) rgba(0, 0, 0, .2);
        border-radius: pxTorem(10);
        color: $white;
        font-size: pxTorem(38);
        z-index: 2;
    }

    .cards {
        position: relative;
        height: pxTorem(535);
        margin-top: pxTorem(30);
        list-style: none;
    }

    .card {
        position: absolute;
        top: pxTorem(286);
        left: pxTorem(465);
        width: pxTorem(204);
        height: pxTorem(245);
        background-image: url('./images/card.png');
        background-repeat: no-repeat;
        background-size: 100%;
        list-style: none;
        transition: .2s;
        &.light {
            background-image: url('./images/cardLight.png');
            transform: translate(pxTorem(1), pxTorem(1));
        }
    }

    .card.move {
        &:nth-child(1) {
            animation: move-one .3s linear forwards;
        }
        &:nth-child(2) {
            animation: move-two .3s linear .4s forwards;
        }
        &:nth-child(3) {
            animation: move-three .3s linear .8s forwards;
        }
        &:nth-child(4) {
            animation: move-four .3s linear 1.2s forwards;
        }
        &:nth-child(5) {
            animation: move-five .3s forwards;
        }
    }

    .card.select {
        z-index: 3;
        &:nth-child(1) {
            animation: select-one .2s linear forwards;
        }
        &:nth-child(2) {
            animation: select-two .2s linear forwards;
        }
        &:nth-child(3) {
            animation: select-three .2s linear forwards;
        }
        &:nth-child(4) {
            animation: select-four .2s linear forwards;
        }
        &:nth-child(5) {
            animation: select-five .2s linear forwards;
        }
    }

    @keyframes move-one {
        to {
            top: 0;
            left: pxTorem(116);
        }
    }




    @keyframes move-two {
        to {
            top: 0;
            left: pxTorem(348);
        }
    }



    @keyframes move-three {
        to {
            top: pxTorem(286);
            left: 0;
        }
    }



    @keyframes move-four {
        to {
            top: pxTorem(286);
            left: pxTorem(232);
        }
    }

    @keyframes move-five {
        to {
            top: pxTorem(286);
            left: pxTorem(465);
        }
    }


    @keyframes select-one {
        from {
            top: 0;
            left: pxTorem(116);
        }
        to {
            top: 50%;
            left: 50%;
            margin-left: pxTorem(-204/2);
            margin-top: pxTorem(-245/2);
            opacity: 0;
        }
    }

    @keyframes select-two {
        from {
            top: 0;
            left: pxTorem(348);
        }
        to {
            top: 50%;
            left: 50%;
            margin-left: pxTorem(-204/2);
            margin-top: pxTorem(-245/2);
            opacity: 0;
        }
    }

    @keyframes select-three {
        from {
            top: pxTorem(286);
            left: 0;
        }
        to {
            top: 50%;
            left: 50%;
            margin-left: pxTorem(-204/2);
            margin-top: pxTorem(-245/2);
            opacity: 0;
        }
    }

    @keyframes select-four {
        from {
            top: pxTorem(286);
            left: pxTorem(232);
        }
        to {
            top: 50%;
            left: 50%;
            margin-left: pxTorem(-204/2);
            margin-top: pxTorem(-245/2);
            opacity: 0;
        }
    }

    @keyframes select-five {
        from {
            top: pxTorem(286);
            left: pxTorem(465);
        }
        to {
            top: 50%;
            left: 50%;
            margin-left: pxTorem(-204/2);
            margin-top: pxTorem(-245/2);
            opacity: 0;
        }
    }

    .card.big {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 4;
        width: pxTorem(329);
        height: pxTorem(396);
        margin-left: pxTorem(-329/2);
        margin-top: pxTorem(-396/2);
        transition: 1s cubic-bezier(0.5, 1, 0.5, 1.3);
        backface-visibility: hidden; // transform: rotateY(-180deg);
        &.shake {
            animation: shake .8s linear;
            animation-iteration-count: infinite;
        }
        &.rotate {
            transform: rotateY(-180deg);
        }
    }

    .card.big.reverse {
        background: url('./images/pocker.png') no-repeat;
        background-size: 100% 100%; // transform: rotateY(-180deg);
        transform: rotateY(180deg);
        animation: none;
        overflow: hidden;
        &.rotate {
            transform: rotateY(0deg);
        }
        .message {
            width: pxTorem(280);
            height: pxTorem(30);
            margin: pxTorem(100) auto 0 auto;
            text-align: center;
            transform: scale(22/24);
            overflow: hidden;
            color: #bc0225;
        }
        .decoration {
            position: absolute;
            left: 0;
            bottom: 0;
            width: pxTorem(147);
            height: pxTorem(141);
            z-index: 2;
        }
        .product {
            position: absolute;
            top: pxTorem(160);
            left: 50%;
            width: pxTorem(256);
            height: pxTorem(118);
            margin-left: pxTorem(-256/2);
            z-index: 1;
        }
    }

    @keyframes shake {
        50% {
            transform: rotate(0deg);
        }
        56.25% {
            transform: rotate(-10deg);
        }
        62.5% {
            transform: rotate(0deg);
        }
        68.75% {
            transform: rotate(10deg);
        }
        75% {
            transform: rotate(0deg);
        }
        81.25% {
            transform: rotate(-10deg);
        }
        87.5% {
            transform: rotate(0deg);
        }
        93.75% {
            transform: rotate(10deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }


    .cover {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        z-index: 2;
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
            height: pxTorem(56);
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
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: $white;
        }
    }
</style>

<template>
    <div class='v-card'>
        <div class='background-top'>
            <img src='./images/cardDecoration.png'>
        </div>
        <header class='header'>
            <img class='banner' :src='activityDetail.pic_banner'>
        </header>
        <main class='main'>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='linen'></v-integral-box>
            </div>
            <ul class='cards'>
                <li v-for='i in 5' :class='["card",{move:move},{light:light_num==i},{select:select_num==i}]' @click='start(i)'></li>
                <!--<li v-show='big_show' transition='display' :class='["card","big",big_card_state]'></li>-->
                <li v-show='big_show' :class='["card","big",big_card_state]'></li>
                <li v-show='big_show' :class='["card","big","reverse",big_card_state]'>
                    <h6 class='message'>获得{{activity_result.name}}</h6>
                    <img class='product' :src='activity_result.pic_thumb'>
                    <img class='decoration' src='./images/pockerDecoration.png'>
                </li>
            </ul>
            <div class='notice'>
                <div>
                    <template v-if='isOff'>
                        活动已结束！
                    </template>
                    <template v-else-if='freeTimes>0'>
                        今天还有<strong class='number'>{{freeTimes}}</strong>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<strong class='number'>{{activityDetail.integral>>0}}</strong>积分
                    </template>
                </div>
            </div>
        </main>
        <div v-show='cover_show' class='cover'></div>
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
            <v-award-box :awords='activityDetail.items' color='brown'></v-award-box>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    export default {
        name: 'card',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwardBox
        },
        props: {
            freshFreeTimes: Function,
            freeTimes: Number,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            toggleDialog: Function,
            isOff: Boolean
        },
        data() {
            return {
                state: '',
                activity_result: {},
                card_num: 5,
                light_num: '',
                select_num: '',
                cards: '',
                cover_show: false,
                big_show: false,
                big_card_state: '',
                is_win: '',
                dialog: {},
                move: false,
                timer: null,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            state(value) {
                if (value === 'ready') {
                    setTimeout(() => {
                        this.move = true;
                        setTimeout(() => {
                            this.timer = setInterval(() => {
                                this.light_num = ++this.light_num % (this.card_num + 1) || 1;
                            }, 600);
                        }, 1500);
                    }, 500);
                } else if (value === 'start') {
                    this.cover_show = true;
                    setTimeout(() => {
                        this.big_show = true;
                    }, 25);
                }
            },
            is_win(value) {
                if (this.state === 'ready') return;
                const result = this.activity_result;
                this.freshFreeTimes();
                if (value) {
                    this.dialog = {
                        type: 'success',
                        style: 'dice',
                        img: result.pic_thumb,
                        msg: result.name,
                        btn_text: '查看',
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init();
                        },
                    };
                } else {
                    this.dialog = {
                        msg: '很遗憾,未中奖',
                        btn_text: '再来一次',
                        callback: () => {
                            this.init();
                        }
                    };
                }
                setTimeout(() => {
                    this.big_card_state = '';
                    setTimeout(() => {
                        this.big_card_state = 'rotate';
                        setTimeout(() => {
                            this.big_show = false;
                            this.toggleDialog(this.dialog);
                        }, 1000);
                    }, 50);
                }, 1600);
            },
        },
        created() {
            this.init();
            // this.big_show = true;
        },
        methods: {
            init() {
                this.state = 'ready';
                this.activity_result = {};
                this.move = false;
                this.light_num = '';
                this.select_num = '';
                this.is_win = '';
                this.cover_show = false;
                this.big_show = false;
                this.big_card_state = 'shake';
            },
            start(num) {
                // this.light_num = '';
                // this.select_num = num;
                // this.state = 'start';
                // this.is_win = true;
                if (this.state !== 'ready') return;
                this.state = 'block';
                clearInterval(this.timer);
                this.light_num = '';
                this.$http.post(`${APP.HOST}/card_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.state = 'start';
                        this.select_num = num;
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        });
                    }
                });
            }
        }
    }
</script>