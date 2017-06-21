<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-marble {
        // min-height: pxTorem(1250);
        // padding-bottom: pxTorem(84);
        overflow: hidden;
        background-color: #ff5644;
    }

    .header {
        position: relative;
        margin-bottom: pxTorem(-30);
        z-index: 1;
    }

    .banner {
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .circles {
        position: absolute;
        left: 0;
        top: pxTorem(60);
        width: pxTorem(750);
        height: pxTorem(1080);
        background-color:#c2251d;
        overflow: hidden;
        .content {
            position: absolute;
            left: 50%;
            top: pxTorem(250);
            width: pxTorem(1000);
            height: pxTorem(1000); // margin-left:pxTorem(-500);
            margin-left: pxTorem(-500);
            border-radius: 50%;
            background-color: #ff6840;
            z-index: 0;
            &:before {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: pxTorem(710);
                height: pxTorem(710); // margin-left:pxTorem(-500);
                margin-left: pxTorem(-710/2);
                margin-top: pxTorem(-710/2);
                border-radius: 50%;
                background-color: #ff5644;
            }
            &:after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: pxTorem(472);
                height: pxTorem(472); // margin-left:pxTorem(-500);
                margin-left: pxTorem(-472/2);
                margin-top: pxTorem(-472/2);
                border-radius: 50%;
                background-color: #fb716d;
            }
        }
    }

    main {
        position: relative;
        z-index: 1;
    }

    .integral-message {
        @include flex-center;
        width: pxTorem(416);
        height: pxTorem(85);
        margin: 0 auto;
        background-color: #fdc713;
        border-radius: pxTorem(10);
        box-shadow: 0 pxTorem(5) pxTorem(5) #fbab07;
        font-size: pxTorem(38);
        color: $white;
        z-index: 1;
    }

    .notice {
        @include flex-center-v;
        position: absolute;
        left: 50%;
        top: pxTorem(90);
        height: pxTorem(54);
        font-weight: 500;
        color: $white;
        transform: translateX(-50%); // font-size:pxTorem(26);
        .number {
            padding: 0 pxTorem(5);
            font-size: pxTorem(36);
            color: #ffc913;
        }
    }

    .steps {
        width: pxTorem(750);
        height: pxTorem(400);
    }

    .pipe {
        position: absolute;
        right: 0;
        bottom: pxTorem(86);
        width: pxTorem(155);
        height: pxTorem(695);
        background: url('./images/marblePipe.png') no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }

    .spring {
        position: absolute;
        right: pxTorem(24);
        bottom: 0;
        width: pxTorem(75);
        height: pxTorem(116);
        &.active {
            animation: spring 1s linear infinite;
        }
    }

    @keyframes spring {
        0% {
            height: pxTorem(116);
        }
        50% {
            height: pxTorem(70);
        }
        100% {
            height: pxTorem(116);
        }
    }

    .ball {
        position: absolute;
        left: pxTorem(666);
        top: pxTorem(574);
        width: pxTorem(48);
        height: pxTorem(48);
        z-index: 2;
        &.one {
            animation: one ease-in 4s forwards;
        }
        &.two {
            animation: two ease-in 4s forwards;
        }
        &.three {
            animation: three ease-in 4s forwards;
        }
        &.four {
            animation: four ease-in 4s forwards;
        }
        &.five {
            animation: five ease-in 4s forwards;
        }
        &.ready {
            animation: ball 1s linear infinite;
        }
    }

    @keyframes ball {
        0% {
            top: pxTorem(574);
        }
        50% {
            top: pxTorem(618);
        }
        100% {
            top: pxTorem(574);
        }
    }

    @keyframes one {
        0% {
            top: pxTorem(574);
        }
        10% {
            top: pxTorem(100);
            left: pxTorem(666);
        }
        18% {
            top: pxTorem(120);
            left: pxTorem(50);
        }
        20% {
            top: pxTorem(140);
            left: pxTorem(120);
        }
        35% {
            top: pxTorem(140);
            left: pxTorem(245);
        }
        40% {
            top: pxTorem(212);
            left: pxTorem(245);
        }
        55% {
            top: pxTorem(212);
            left: pxTorem(120);
        }
        60% {
            top: pxTorem(288);
            left: pxTorem(120);
        }
        75% {
            top: pxTorem(288);
            left: pxTorem(5);
        }
        80% {
            top: pxTorem(358);
            left: pxTorem(5);
        }
        95% {
            top: pxTorem(358);
            left: pxTorem(46)
        }
        100% {
            top: pxTorem(560);
            left: pxTorem(46)
        }
    }


    @keyframes two {
        0% {
            top: pxTorem(574);
        }
        10% {
            top: pxTorem(100);
            left: pxTorem(666);
        }
        20% {
            top: pxTorem(100);
            left: pxTorem(350);
        }
        25% {
            top: pxTorem(140);
            left: pxTorem(350);
        }
        35% {
            top: pxTorem(140);
            left: pxTorem(245);
        }
        40% {
            top: pxTorem(212);
            left: pxTorem(245);
        }
        55% {
            top: pxTorem(212);
            left: pxTorem(120);
        }
        60% {
            top: pxTorem(288);
            left: pxTorem(120);
        }
        75% {
            top: pxTorem(288);
            left: pxTorem(220);
        }
        80% {
            top: pxTorem(358);
            left: pxTorem(220);
        }
        95% {
            top: pxTorem(358);
            left: pxTorem(170)
        }
        100% {
            top: pxTorem(560);
            left: pxTorem(170)
        }
    }

    @keyframes three {
        0% {
            top: pxTorem(574);
        }
        10% {
            top: pxTorem(100);
            left: pxTorem(666);
        }
        20% {
            top: pxTorem(100);
            left: pxTorem(350);
        }
        25% {
            top: pxTorem(140);
            left: pxTorem(350);
        }
        35% {
            top: pxTorem(140);
            left: pxTorem(245);
        }
        40% {
            top: pxTorem(212);
            left: pxTorem(245);
        }
        55% {
            top: pxTorem(212);
            left: pxTorem(340);
        }
        60% {
            top: pxTorem(288);
            left: pxTorem(340);
        }
        75% {
            top: pxTorem(288);
            left: pxTorem(220);
        }
        80% {
            top: pxTorem(358);
            left: pxTorem(220);
        }
        95% {
            top: pxTorem(358);
            left: pxTorem(300)
        }
        100% {
            top: pxTorem(560);
            left: pxTorem(300)
        }
    }


    @keyframes four {
        0% {
            top: pxTorem(574);
        }
        10% {
            top: pxTorem(100);
            left: pxTorem(666);
        }
        20% {
            top: pxTorem(100);
            left: pxTorem(350);
        }
        25% {
            top: pxTorem(140);
            left: pxTorem(350);
        }
        35% {
            top: pxTorem(140);
            left: pxTorem(450);
        }
        40% {
            top: pxTorem(212);
            left: pxTorem(450);
        }
        55% {
            top: pxTorem(212);
            left: pxTorem(340);
        }
        60% {
            top: pxTorem(288);
            left: pxTorem(340);
        }
        75% {
            top: pxTorem(288);
            left: pxTorem(444);
        }
        80% {
            top: pxTorem(358);
            left: pxTorem(444);
        }
        95% {

            top: pxTorem(358);
            left: pxTorem(430)
        }
        100% {
            top: pxTorem(560);
            left: pxTorem(430)
        }
    }

    @keyframes five {
        0% {
            top: pxTorem(574);
        }
        10% {
            top: pxTorem(100);
            left: pxTorem(666);
        }
        20% {
            top: pxTorem(100);
            left: pxTorem(350);
        }
        25% {
            top: pxTorem(140);
            left: pxTorem(350);
        }
        35% {
            top: pxTorem(140);
            left: pxTorem(450);
        }
        40% {
            top: pxTorem(212);
            left: pxTorem(450);
        }
        55% {
            top: pxTorem(212);
            left: pxTorem(580);
        }
        60% {
            top: pxTorem(288);
            left: pxTorem(580);
        }
        75% {
            top: pxTorem(288);
            left: pxTorem(444);
        }
        80% {
            top: pxTorem(358);
            left: pxTorem(444);
        }
        95% {
            top: pxTorem(358);
            left: pxTorem(556);
        }

        100% {
            top: pxTorem(560);
            left: pxTorem(556);
        }
    }

    .awards {
        @include list-inline;
        margin-top: pxTorem(50);
        li {
            position: relative;
            width: pxTorem(122);
            height: pxTorem(126);
            padding: pxTorem(35) 0 pxTorem(4) 0;
            margin-left: pxTorem(6);
            text-align: center;
            background: url('./images/marbleShortPipe.png') no-repeat;
            background-size: 100% 100%;
            z-index: 3;
        }
        img {
            width: pxTorem(56);
            height: pxTorem(56);
        }
        h6 {
            height: pxTorem(36);
            line-height: pxTorem(36);
            overflow: hidden;
            font-size: pxTorem(16);
            color: $white;
        }
    }

    .ground {
        @include flex-center;
        position: relative;
        width: pxTorem(750);
        height: pxTorem(12*13);
        background: url('./images/marbleGround.png');
        background-size: pxTorem(750) pxTorem(13);
        &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: pxTorem(-20);
            width: pxTorem(750);
            height: pxTorem(20);
            background: url('./images/marbleGrass.png') no-repeat;
            background-size: 100% 100%;
        }
        .start {
            @include flex-center;
            @include active(#278740,
            5%);
            position: relative;
            width: pxTorem(322);
            height: pxTorem(82);
            box-shadow: pxTorem(5) pxTorem(8) pxTorem(5) rgba(0, 0, 0, 0.4);
            border-radius: pxTorem(31);
            font-size: pxTorem(40);
            background-color: #278740;
            color: $white;
            &:after {
                content: '';
                position: absolute;
                right: pxTorem(10);
                top: pxTorem(15);
                width: pxTorem(26);
                height: pxTorem(12);
                border-radius: pxTorem(6);
                background-color: #69be3b;
                transform: rotate(30deg);
                box-shadow: 0 0 pxTorem(4) 1px rgba(183, 233, 56, .3); //  width: pxTorem(29);
            }
        }
    }

    .describe {
        position: relative;
        padding: pxTorem(50) pxTorem(40) 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: $white;
        }
    }
</style>
<template>
    <div class='v-marble '>
        <header class='header'>
            <img class='banner' :src='activityDetail.pic_banner_new'>
        </header>
        <div class='circles'>
            <div class='content'></div>
        </div>
        <main>
            <div class='integral-message'>
                现有积分:
                <v-integral-box :integral='user.integral>>0' color='pink'></v-integral-box>
            </div>
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
            <img class='steps' src='./images/marbleSteps.png'>
            <img :class='["ball",{ready:this.state==="ready"||this.state==="block"},this.shoot_path]'  src='./images/marbleBall.png'>
            <div class='pipe'>
                <img :class='["spring",{active:this.state==="ready"||this.state==="block"}]' src='./images/marbleSpring.png'>
            </div>
            <ul class='awards'>
                <li v-for='(award,$index) in awards'>
                    <img :src='award.pic'>
                    <h6>{{award.name|filter}}</h6>
                </li>
            </ul>
            <div class='ground'>
                <div class='start' @click='start'>点击弹射</div>
            </div>
        </main>
        <!--<article class='describe'>
            <v-describe-title text='详细说明' color='army'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='army'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='army'></v-describe-title>
        </article>-->
        <footer>
            <v-award-box :awords='activityDetail.items' color='army'></v-award-box>
        </footer>

    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwardBox from '../vAwardBox';
    export default {
        name: 'marble',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwardBox
        },
        props: {
            activityDetail: Object,
            freshFreeTimes: Function,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            freeTimes: Number,
            toggleDialog: Function,
            isOff: Boolean
        },
        data() {
            return {
                state: '',
                is_right: '', //判断回答是否正确
                is_win: '', //判断是否中奖
                activity_result: {},
                select_num: ''
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            awards() {
                return this.activityDetail.items.slice(0, 5);
            },
            shoot_path() {
                const number = ['one', 'two', 'three', 'four', 'five'];
                if (this.select_num >= 0 && this.select_num < number.length) {
                    return number[this.select_num];
                }
                return '';
            }
        },
        watch: {
            is_win(value) {
                if (this.state === 'ready') return;
                const result = this.activity_result;
                this.freshFreeTimes();
                if (value) {
                    this.dialog = {
                        type: 'success',
                        img: result.pic_thumb_new,
                        msg: '获得' + result.name,
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
                    this.toggleDialog(this.dialog);
                }, 4500);
            }
        },
        filters: {
            filter(str) {
                return str.length < 5 ? str : str.substr(0, 5) + '...';
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.state = 'ready';
                this.current_number = 0; //当前题目号 0开始
                this.is_right = ''; //判断回答是否正确
                this.is_win = ''; //判断是否中奖
                this.activity_result = {};
            },
            start() {
                if (this.state !== 'ready') return;
                this.state = 'block';
                this.$http.post(`${APP.HOST}/hoodle_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        if (data.data.error_code === APP.INTEGRAL_LACK) {
                            this.toggleDialog({
                                faliure: 'lack',
                                callback: () => {
                                    this.init();
                                }
                            });
                            return;
                        }
                        this.activity_result = data.data;
                        this.state = 'start';
                        const name = this.activity_result.name;
                        this.select_num = this.awards.findIndex(award => {
                            return award.name === name;
                        });
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        });
                    }
                }, (response) => {});
            },
        }
    };
</script>