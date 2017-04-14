<style lang='scss' scoped>
@import '../../../../assets/scss/variable.scss';
.v-doll {
    min-height: pxTorem(1250);
    padding-bottom: pxTorem(84);
    background-image: url('./images/dollBackground.png');
    background-size: pxTorem(750);
}

.header {
    width: pxTorem(750);
    height: pxTorem(400);
    margin-bottom: pxTorem(-100);
}

.doll-panel {
    position: relative;
    width: pxTorem(750);
    height: pxTorem(914);
    background-image: url('./images/dollPanel.png');
    background-size: 95% 95%;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    .integral-message {
        @include flex-center;
        margin-top: pxTorem(102);
        font-size: pxTorem(38);
        color: #fdca46;
    }
    .notice {
        @include flex-center;
        position: absolute;
        width: 100%;
        top: pxTorem(222);
        font-weight: 500;
        color: $white;
        .number {
            padding: 0 pxTorem(8) pxTorem(5) pxTorem(8);
            font-size: pxTorem(38);
            font-weight: 600;
            color: #104a97;
        }
    }
    .container {
        display: flex;
        position: relative;
        width: pxTorem(600);
        height: pxTorem(420);
        margin: pxTorem(118) auto 0 auto;
        overflow: hidden;
        .claws {
            position: absolute;
            width: 100%;
            height: pxTorem(270);
            z-index: 2;
            img {
                position: absolute;
            }
            .claws-rod {
                left: 50%;
                top: pxTorem(-150);
                width: pxTorem(89);
                height: pxTorem(269);
                margin-left: pxTorem(-89/2);
                z-index: 3;
            }
            .claws-top-left {
                left: 50%;
                top: pxTorem(110);
                width: pxTorem(40);
                height: pxTorem(43);
                margin-left: pxTorem(-60);
                transition: all 0.2s linear;
                &.active {
                    transform: rotate(15deg);
                }
            }
            .claws-lower-left {
                left: 50%;
                top: pxTorem(145);
                width: pxTorem(50);
                height: pxTorem(55);
                margin-left: pxTorem(-61);
                transition: all 0.2s linear;
                &.active {
                    margin-left: pxTorem(-90);
                    transform: rotate(60deg);
                }
            }
            .claws-top-right {
                left: 50%;
                top: pxTorem(110);
                width: pxTorem(40);
                height: pxTorem(43);
                margin-left: pxTorem(20);
                transition: all 0.2s linear;
                &.active {
                    transform: rotate(-15deg);
                }
            }
            .claws-lower-right {
                left: 50%;
                top: pxTorem(145);
                width: pxTorem(50);
                height: pxTorem(55);
                margin-left: pxTorem(10);
                transition: all 0.2s linear;
                &.active {
                    margin-left: pxTorem(39);
                    transform: rotate(-60deg);
                }
            }
        }
        .group {
            position: absolute;
            &:nth-child(2) {
                top: pxTorem(230);
                height: pxTorem(80);
            }
            &:nth-child(3) {
                bottom: 0;
                height: pxTorem(152);
            }
        }
        .big-awards {
            position: relative;
            height: pxTorem(152);
            display: inline;
            white-space: nowrap;
            li {
                @include flex-center;
                position: absolute;
                width: pxTorem(130);
                height: pxTorem(152);
                list-style: none;
                text-align: center;
                background-size: 100% 100%;
                &:nth-child(odd) {
                    background-image: url('./images/dollBigAwardsKhaki.png');
                }
                &:nth-child(even) {
                    background-image: url('./images/dollBigAwardsBlue.png');
                }
                img {
                    width: pxTorem(98);
                    height: pxTorem(104);
                    border-radius: pxTorem(10);
                    margin-top: pxTorem(8);
                    margin-left: pxTorem(-4);
                }
            }
        }
        .small-awards {
            position: relative;
            height: pxTorem(80);
            white-space: nowrap;
            &:nth-child(1) {
                left: pxTorem(600);
                animation: moveToLeft 10s linear infinite;
                animation-delay: -5s;
            }
            &:nth-child(2) {
                position: absolute;
                left: pxTorem(600);
                top: pxTorem(0);
                animation: moveToLeft 10s linear infinite;
            }
            li {
                @include flex-center;
                list-style: none;
                display: inline-block;
                width: pxTorem(72);
                height: pxTorem(80);
                text-align: center;
                margin-right: pxTorem(128);
                background-size: 100% 100%;
                &:nth-child(odd) {
                    background-image: url('./images/dollSmallAwardsKhaki.png');
                }
                &:nth-child(even) {
                    background-image: url('./images/dollSmallAwardsBlue.png');
                }
                img {
                    width: pxTorem(55);
                    height: pxTorem(58);
                    border-radius: pxTorem(5);
                    margin-top: pxTorem(15);
                }
            }
        }
    }
}

@keyframes moveToLeft {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-200%);
    }
}

@keyframes caught {
    0% {
        margin-top: 0;
    }
    50% {
        margin-top: pxTorem(123);
    }
    100% {
        margin-top: 0;
    }
}

.describe {
    position: relative;
    padding: 0 pxTorem(40);
    .editor-style {
        padding-top: pxTorem(20);
        padding-bottom: pxTorem(40);
        color: #1d70c3;
    }
}

.operation {
    position: absolute;
    width: pxTorem(750);
    bottom: pxTorem(60);
    .doll-claws-left {
        position: absolute;
        bottom: 0;
        width: pxTorem(150);
        height: pxTorem(172);
    }
    .doll-claws-right {
        position: absolute;
        bottom: 0;
        right: 0;
        width: pxTorem(150);
        height: pxTorem(172);
    }
    .doll-button {
        position: absolute;
        left: 50%;
        bottom: pxTorem(20);
        margin-left: pxTorem(-500.74/2);
        width: pxTorem(500.74);
        height: pxTorem(86.78);
        background-image: url('./images/dollButton.png');
        background-size: 100% 100%;
    }
    .active {
        background-image: url('./images/dollButtonActive.png');
        background-size: 100% 100%;
    }
}
</style>
<template>
    <div class="v-doll">
        <header class="header">
            <img v-if="activityDetail.pic_icon" :src="activityDetail.pic_icon" class="img-responsive">
            <img v-else class="img-responsive" src="./images/dollDefaultBanner.png">
        </header>
        <main>
            <div class="doll-panel">
                <header class="integral-message">
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='yellow'>
                    </v-integral-box>
                </header>
                <div class='notice'>
                    <template v-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </div>
                <section class="container" ref="container">
                    <header class="claws">
                        <img class="claws-rod" src="./images/dollClawsRod.png">
                        <img :class="[{active:claws.active},'claws-top-left']" src="./images/dollTopLeft.png">
                        <img :class="[{active:claws.active},'claws-lower-left']" src="./images/dollLowerLeft.png">
                        <img :class="[{active:claws.active},'claws-top-right']" src="./images/dollTopRight.png">
                        <img :class="[{active:claws.active},'claws-lower-right']" src="./images/dollLowerRight.png">
                    </header>
                    <div class="group">
                        <ul class="small-awards" v-for="i in 2">
                            <li v-for="award in items">
                                <img :src="award.pic">
                            </li>
                        </ul>
                    </div>
                    <div class="group">
                        <ul class="big-awards" v-for="i in 2">
                            <li class="award" v-for="award in activityDetail.items">
                                <img :src="award.pic">
                            </li>
                        </ul>
                    </div>
                </section>
                <div class="operation">
                    <img :class="['doll-button', state == 'ready'?'':'active']" @click='start'>
                    <img class="doll-claws-left" src="./images/dollClawsLeft.png">
                    <img class="doll-claws-right" src="./images/dollClawsRight.png">
                </div>
            </div>
        </main>
        <article class="describe">
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
            <v-aword-box :awords='activityDetail.items' color='palaceblue'></v-aword-box>
        </footer>
    </div>
</template>
<script>
import vDescribeTitle from '../vDescribeTitle';
import vIntegralBox from '../vIntegralBox';
import vAwordBox from '../vAwordBox';
export default {
    name: 'doll',
    components: {
        vDescribeTitle,
        vIntegralBox,
        vAwordBox
    },
    props: {
        freshFreeTimes: Function,
        activityDetail: Object,
        id: Number,
        toOrderDetail: Function,
        freeTimes: Number,
        toggleDialog: Function
    },
    data() {
        return {
            group: '',
            is_win: '', // 判断是否中奖
            claws: {},
            alert: {},
            activity_result: {},
            items: [],
            awards: [],
            state: 'ready', // 游戏状态
            caught_number: 0
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    watch: {
        state(value) {
            if (value === 'stop') {
                this.$store.dispatch('toggleLoading');
                setTimeout(() => {
                    this.$store.dispatch('toggleLoading');
                    this.toggleDialog(this.alert);
                }, 1000);
            } else if (value === 'caught') {
                if (this.is_win) {
                    const caught_number = this.getPosition(this.awards),
                        random_type = Math.ceil(Math.random() * 3);
                    this.caught_number = caught_number;
                    this.group[caught_number].childNodes[0].src = this.activity_result.pic_thumb;
                    this.beingCaught(caught_number, random_type, () => {
                        setTimeout(() => {
                            this.toggleDialog(this.alert);
                        }, 500);
                    });
                } else {
                    this.alert = {
                        msg: '很遗憾,未抽中',
                        btn_text: '再来一次',
                        callback: () => {
                            this.init();
                        }
                    };
                }
            }
        },
        is_win(value) {
            if (this.state === 'ready') return;
            const result = this.activity_result;
            this.freshFreeTimes();
            if (value) {
                this.alert = {
                    type: 'success',
                    img: result.pic_thumb,
                    msg: '获得' + result.name,
                    btn_text: '查看',
                    callback: this.toOrderDetail(result.id),
                    callback_close: () => {
                        this.init();
                    },
                };
            } else {
                this.alert = {
                    msg: '很遗憾,未抽中',
                    btn_text: '再来一次',
                    callback: () => {
                        this.init();
                    }
                };
            }
        }
    },
    deactiveted() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    created() {
        this.items = this.createRandomArray();
    },
    mounted() {
        this.awardsTranslation();
        this.clawsTranslation();
    },
    methods: {
        init() {
            this.state = 'ready';
            this.alert = {};
            this.is_win = '';
            this.activity_result = {};
            this.claws.active = false;
            this.awards[this.caught_number].caught = false;
            this.awards[this.caught_number].left = this.awards[this.caught_number].init_left;
            this.group[this.caught_number].style.top = 0;
            this.group[this.caught_number].childNodes[0].src = this.awards[this.caught_number].pic;
        },
        start() {
            if (this.state !== 'ready') return;
            this.state = 'start';
            this.$http.post(`${APP.HOST}/doll_activity/${this.id}`, {
                token: APP.TOKEN,
                user_id: APP.USER_ID
            }).then((response) => {
                const data = response.data;
                if (data.status === APP.SUCCESS) {
                    this.activity_result = data.data;
                    this.is_win = this.activity_result.is_win;
                    this.state = 'caught';
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
        awardsTranslation() {
            this.group = this.$refs.container.querySelectorAll('.award');
            for (let i = 0; i < this.group.length; i++) {
                let award = {
                    init_left: -(i - 2) * 300 - 130,
                    left: -(i - 2) * 300 - 130,
                    caught: false,
                    pic: this.activityDetail.items[i % this.activityDetail.items.length].pic
                };
                this.awards.push(award);
                if (this.awards.length == this.group.length) {
                    this.loop();
                }
            }
        },
        clawsTranslation() {
            this.claws = {
                left: 0,
                active: false,
                direction: 'right'
            };
            let containerHeader = this.$refs.container.querySelector('header');
            const timer = setInterval(() => {
                let current_left = this.claws.left;
                containerHeader.style.left = `${current_left}%`;
                if (this.claws.active === false) {
                    if (this.claws.direction === 'right') {
                        current_left += 0.12;
                        if (current_left >= 25) {
                            this.claws.direction = 'left';
                        }
                    } else if (this.claws.direction === 'left') {
                        current_left -= 0.12;
                        if (current_left <= -25) {
                            this.claws.direction = 'right';
                        }
                    }
                }
                this.claws.left = current_left;
            }, 10);
        },
        loop() {
            const len = this.group.length,
                timer = setInterval(() => {
                    for (var i = 0; i < len; i++) {
                        let current_left = this.awards[i].left,
                            init_left = this.awards[i].init_left;
                        this.group[i].style.left = `${current_left/75}rem`;
                        if (this.awards[i].caught === false) {
                            current_left += 1.5;
                        }
                        init_left += 1.5;
                        if (current_left > 600) {
                            current_left -= 300 * len;
                        }
                        this.awards[i].left = current_left;
                        this.awards[i].init_left = init_left;
                    }
                }, 10);
        },
        createRandomArray() {
            const result = [],
                limit = this.activityDetail.items.length,
                number = 3;
            let state = true,
                n = parseInt(number / limit);
            for (let i = 0; i < n + 1; i++) {
                for (let j = 0; j < limit; j++) {
                    result.push(this.activityDetail.items[j]);
                    if (result.length === number) {
                        return result;
                    }
                }
            }
        },
        getPosition(awards) {
            let caught_number = 0;
            awards.forEach((award, index) => {
                if (award.left > -430 && award.left < -130) {
                    caught_number = index;
                    return true;
                }
            })
            return caught_number;
        },
        beingCaught(caught_number, random_type, callback) {
            let current_top = 0,
                current_margin_top = 0,
                direction = 'down',
                containerHeader = this.$refs.container.querySelector('header');
            const limit_top = -123,
                limit_margin_top = 123,
                active_left = (600 - 130) / 2 + (random_type - 2) * 75;
            const timer = setInterval(() => {
                if (this.awards[caught_number].left >= (active_left - 123)) {
                    this.claws.left = (random_type - 2) * 12.5;
                    containerHeader.style.marginTop = `${current_margin_top/75}rem`;
                    this.claws.active = true;
                    if (direction === 'down') {
                        current_margin_top += 1.5;
                        if (current_margin_top > limit_margin_top) {
                            direction = 'up';
                        }
                    } else if (direction === 'up') {
                        current_margin_top -= 1.5;
                        if (current_margin_top < 0) {
                            clearInterval(timer);
                        }
                    }
                }
                if (this.awards[caught_number].left >= active_left) {
                    this.awards[caught_number].caught = true;
                    this.group[caught_number].style['z-index'] = 2;
                    this.group[caught_number].style.top = `${current_top/75}rem`;
                    current_top -= 1.5;
                    if (current_top < limit_top) {
                        clearInterval(timer);
                        if (callback) {
                            callback();
                        }
                    }
                }
            }, 10);
        }
    }
}
</script>
