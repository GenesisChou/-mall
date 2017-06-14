<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .earn-integral {
        background-color: #f2f3f4;
        overflow: hidden;
    }

    .main {
        position: relative;
        background-color: #4dd3d6;
        padding-bottom: pxTorem(103);
    }

    .head {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(860);
        overflow: hidden;
        background: url('./images/earnIntegralBackground.png') no-repeat;
        background-size: 100% 100%;
        .btn {
            @include flex-center;
            @include active(#f05f61,
            3%);
            width: pxTorem(120);
            margin: pxTorem(15) auto;
            color: $white;
            background-color: #f05f61;
            font-size: pxTorem(24);
        }
        .message {
            margin-top: pxTorem(26);
            text-shadow: 0 pxTorem(4) pxTorem(4) rgba(209, 172, 0, 0.68);
            font-weight: 500;
            color: $white;
            text-align: center;
            img {
                width: pxTorem(36);
                height: pxTorem(38);
            }
        }
    }

    .back {
        @include flex-center-h;
        position: absolute;
        top: 0;
        width: pxTorem(160);
        height: pxTorem(120); // padding-top: pxTorem(25);
        padding-top: pxTorem(40);
        font-size: pxTorem(24); // transform: scale(0.9);
        color: #a78453;
        background: url('./images/cloud.png') no-repeat;
        background-size: pxTorem(139) pxTorem(91);
        background-position: center center;
        z-index: 2;
        span {
            transform: scale(0.9);
        }
        &:nth-child(2) {
            left: pxTorem(580);
        }
    }


    .rotate {
        position: relative;
        width: 100%;
        height: pxTorem(234);
        margin-top: pxTorem(50);
        z-index: 1;
    }

    .circle-button {
        @include flex-center;
        width: pxTorem(234);
        height: pxTorem(234);
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: pxTorem(-117);
        background-color: rgba(255, 255, 255, 0.62);
        border-radius: 50%;
        .circle {
            @include flex-center;
            flex-direction: column;
            width: pxTorem(194);
            height: pxTorem(194);
            border-radius: 50%;
        }
        .circle.white {
            box-shadow: 0 pxTorem(3) pxTorem(5) rgba(193, 63, 7, 0.51);
            background-color: $white;
            color: $orange;
            h1 {
                font-size: pxTorem(48);
                padding-bottom: pxTorem(1);
                margin-bottom: pxTorem(5);
                border-bottom: 1px solid $orange;
            }
        }
        .circle.red {
            font-size: pxTorem(57);
            font-weight: 500;
            color: $white;
            box-shadow: 0 pxTorem(3) pxTorem(5) rgba(193, 63, 7, 0.75);
            background-color: $orange;
        }
    }

    .gift-notice {
        @include flex-center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: pxTorem(300);
        font-size: pxTorem(24);
        color: $white;
        font-weight: 500;
        text-shadow: 0 2px 1px #2ba7a9;
        line-height: pxTorem(60);
        .number {
            padding: 0 pxTorem(5);
            font-size: pxTorem(40);
            color: #f05f61;
        }
        .icon-foot {
            font-size: pxTorem(36);
            color: #f05f61;
        }
    }

    .gift-list {
        @include flex-center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: pxTorem(55);
        img {
            width: pxTorem(153);
            height: pxTorem(145);
            transition: .3s;
        }
        li {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: pxTorem(208);
            height: pxTorem(232);
            padding: pxTorem(4);
            margin: 0 pxTorem(8);
            border-radius: pxTorem(5);
            background-color: #b8edef;
            list-style: none;
        }
        h4 {
            @include flex-center;
            width: 100%;
            height: pxTorem(60);
            line-height: pxTorem(60);
            overflow: hidden;
            font-weight: 500;
            background-color: #4dd3d6;
            border-radius: pxTorem(5);
            color: #29a6a8;
        }
        li.active {
            position: relative;
            background-color: #b8edef;
            h4 {
                background-color: #f05f61;
                color: $white;
            }
        }
    }

    .progress {
        display: flex;
        position: absolute;
        width: 100%;
        padding: 0 pxTorem(15);
        bottom: pxTorem(30);
        .check-item {
            @include flex-center-v;
            flex: 1;
            justify-content: space-around;
            flex-direction: column;
            color: $white;
            &.active {
                .circle {
                    background-color: $orange;
                }
                h6 {
                    color: $orange;
                }
            }
            &:first-child {
                .circle {
                    color: #a9aaae;
                    background-color: rgba(255, 255, 255, 0.4);
                    background-size: 100%;
                    background-position: center center;
                    background-repeat: no-repeat;
                    box-shadow: 0 pxTorem(3) pxTorem(5) #42c0c3, 0 pxTorem(-3) pxTorem(3) rgba(255, 255, 255, .8);
                }
                h6 {
                    color: #a9aaae;
                }
            }
        }
        .circle {
            @include flex-center;
            width: pxTorem(90);
            height: pxTorem(90);
            margin-bottom: pxTorem(10);
            border-radius: 50%;
            background-color: rgb(20, 188, 191);
            font-size: pxTorem(30);
            box-shadow: pxTorem(0) pxTorem(3) pxTorem(3) #1e9da1;
            transition: .5s;
        }
        h6 {
            transition: .5s;
        }
    }

    .edit-user {
        @include flex-center-v;
        @include active(#d0eff1,
        10%);
        height: pxTorem(107);
        padding-left: pxTorem(35);
        background-color: #d0eff1;
        margin-bottom: pxTorem(20);
        img {
            width: pxTorem(71);
            height: pxTorem(53);
            margin-right: pxTorem(20);
        }
        h2 {
            color: $orange;
        }
        h6 {
            color: #a9aaae;
        }
    }

    .notice {
        @include flex-center-h;
        flex-direction: column;
        height: pxTorem(106); // padding-left: pxTorem(35);
        padding: 0 pxTorem(35); // font-size: pxTorem(26);
        span {
            color: $orange;
            padding: 0 pxTorem(5);
            font-size: pxTorem(32);
        }
    }

    .article-list {
        color: #a9aaae;
        background-color: #d0eff1;
        border-top: 1px solid #d4d4d6;
        ul,
        li {
            list-style: none;
        }
        li~:active {
            background-color: darken(#d0eff1, 10%);
        }
        .empty {
            background-color: #4dd3d6;
            height: pxTorem(430);
            padding-top: pxTorem(80);
            text-align: center;
            font-size: pxTorem(28);
            color: #a9aaae;
            &:active {
                background-color: #4dd3d6;
            }
        }
    }

    .article {
        @include flex-center-v;
        padding: pxTorem(20) 0;
        justify-content: space-between;
        position: relative; // height: pxTorem(110);
        margin: 0 pxTorem(30);
        border-top: 1px solid #d4d4d6;
        .title {
            @include flex-center-v; // height: pxTorem(80);
            width: 70%;
            line-height: pxTorem(40);
            font-weight: 500;
            overflow: hidden;
        }
        div {
            @include flex-center;
            position: relative;
            width: pxTorem(115);
            height: pxTorem(50);
            border-radius: pxTorem(10);
            font-size: pxTorem(24);
            background-color: #29a6a8;
            color: $white;
            &:after {
                content: '';
                position: absolute;
                right: pxTorem(-3);
                top: pxTorem(-2);
                width: pxTorem(10);
                height: pxTorem(10);
                background-color: #ff0000;
                border-radius: 50%;
            }
            &.read {
                background-color: #b4c7c8;
                &:after {
                    display: none;
                }
            }
        }
    }

    .rotate-leave-active {
        backface-visibility: hidden;
        transform: rotateY(180deg);
        transition: 1s cubic-bezier(0.5, 1, 0.5, 1.3);
    }

    .rotate-enter {
        transform: rotateY(180deg);
    }

    .rotate-enter-active {
        backface-visibility: hidden;
        transition: 1s cubic-bezier(0.5, 1, 0.5, 1.3);
    }

    .rotate-enter-to {
        transform: rotateY(360deg);
    }

    .footer {
        background-color: #f2f3f4;
    }

    .balloon {
        position: absolute;
        bottom: pxTorem(5);
        right: pxTorem(20);
        width: pxTorem(116);
        height: pxTorem(106);
    }

    .raiders {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $white;
        width: pxTorem(607); // height: pxTorem(408);
        text-align: justify;
        font-size: pxTorem(30);
        border-radius: pxTorem(10);
        ul {
            // flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: pxTorem(40) pxTorem(47);
            list-style: none;
        }
        li {
            list-style: none;
        }
        footer {
            @include flex-center;
            @include active;
            width: 100%;
            height: pxTorem(104);
            font-size: pxTorem(36);
            color: $orange;
            border-top: 1px solid #d3d4d6;
            border-bottom-left-radius: pxTorem(10);
            border-bottom-right-radius: pxTorem(10);
        }
    }

    .gift {
        position: relative;
        width: pxTorem(619);
        height: pxTorem(664);
        background-image: url('./images/checkinGift.png');
        background-size: 100% 100%;
        .close {
            position: absolute;
            right: pxTorem(-40);
            top: pxTorem(-200);
            width: pxTorem(68);
            height: pxTorem(68);
        }
        .message {
            position: absolute;
            top: pxTorem(148);
            left: 0;
            width: 100%;
            height: pxTorem(40);
            padding: 0 pxTorem(40);
            text-align: center;
            color: $white;
            overflow: hidden;
        }
        .product {
            position: absolute;
            top: pxTorem(222);
            left: 50%;
            width: pxTorem(233);
            height: pxTorem(233);
            transform: translateX(-50%);
        }
        .operation {
            position: absolute;
            left: 50%;
            bottom: pxTorem(60);
            width: pxTorem(380);
            height: pxTorem(110);
            margin-left: pxTorem(-190);
        }
    }

    .records {
        position: relative;
        width: pxTorem(640);
        padding: pxTorem(32);
        background-color: #cf423f;
        border-radius: pxTorem(10);
        box-shadow: 0 pxTorem(4) pxTorem(4) rgba(0, 0, 0, .5);
        .decoration {
            position: absolute;
            left: -8%;
            top: -11%;
            width: pxTorem(685);
            height: pxTorem(264);
            z-index: 2;
            background: url('./images/recordsDecoration.png');
            background-size: pxTorem(685) pxTorem(264);
        }

        .container {
            width: 100%;
            height: 100%;
            background-color: $white;
            border-top-left-radius: pxTorem(10);
            border-top-right-radius: pxTorem(10);
        }
        .title {
            position: relative;
            display: flex;
            align-items: center;
            height: pxTorem(64);
            font-size: pxTorem(30);
            color: $white;
            background-color: #9b3131;
            border-top-left-radius: pxTorem(10);
            border-top-right-radius: pxTorem(10);
            .left,
            .right {
                @include flex-center;
                flex: 1;
                height: 100%;
                span {
                    position: relative;
                    z-index: 1;
                }
            }
            .right {
                background-color: #b34444;
            }
            .number {
                color: #8ae1c4;
                padding: 0 pxTorem(5);
            }
            .triangle {
                position: absolute;
                left: 50%;
                top: 0;
                width: 0;
                height: 0;
                margin-left: pxTorem(-32);
                border-bottom: pxTorem(64) solid #b34444;
                border-left: pxTorem(64) solid #9b3131;
            }
        }
        .close {
            @include flex-center;
            position: absolute;
            right: pxTorem(-40);
            top: pxTorem(-40);
            width: pxTorem(80);
            height: pxTorem(80);
            background-color: $white;
            border-radius: 50%;
            z-index: 2;
        }
        .icon-close-circle {
            font-size: pxTorem(80);
            color: #cf423f;
            &:active {
                color: darken(#cf423f, 10%);
            }
        }
        .calendar {
            width: 100%;
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            li {
                list-style: none;
                width: pxTorem(80);
                text-align: center;
                color: #3d3d3d;
            }

            ul:first-child {
                background-color: #f1f1f1;
                li {
                    height: pxTorem(50);
                    line-height: pxTorem(50);
                    font-size: pxTorem(22);
                    &:first-child,
                    &:last-child {
                        color: #cf423f;
                    }
                }
            }
            ul:nth-child(2) {
                padding-bottom: pxTorem(8);
                border: pxTorem(8) solid #f1f1f1;
                border-top: none;
                background-color: #f1f1f1;
                li {
                    display: flex;
                    flex-direction: column;
                    height: pxTorem(109);
                    justify-content: space-between;
                    border-right: 1px solid #f1f1f1;
                    border-bottom: 1px solid #f1f1f1;
                    background-color: $white;
                    &.today {
                        position: relative;
                        color: #cf423f;
                        h6 {
                            color: $white;
                            background-color: #cf423f;
                        }
                        &:before {
                            content: '';
                            position: absolute;
                            left: 2px;
                            top: 2px;
                            right: 2px;
                            bottom: 2px;
                            outline: 2px solid #cf423f;
                        }
                    }

                    &.checked {
                        color: #cf423f;
                    }
                    &.disable {
                        color: rgba(0, 0, 0, .3);
                        img {
                            opacity: 0;
                        }
                    }
                }
                h1 {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: pxTorem(10) pxTorem(3) 0 pxTorem(10);
                    font-size: pxTorem(30);
                }
                h6 {
                    font-size: pxTorem(18);
                }
                h6.unchecked {
                    background-color: #656565;
                    color: $white;
                }
                img.checked {
                    width: pxTorem(24);
                    height: pxTorem(16);
                }
                img.unchecked {
                    width: pxTorem(17);
                    height: pxTorem(17);
                }
            }
        }
    }
</style>
<template>
    <div class='earn-integral'>
        <main class='main'>
            <header class='head'>
                <router-link v-show='back_show' :to='{name:"index"}' class='back' tag='div'>
                    <span>返回首页</span>
                </router-link>
                <div class='back' @click='toggleRaiders'>
                    <span>签到攻略</span>
                </div>
                <div class='rotate'>
                    <transition name='rotate'>
                        <div v-if='user.ischecked' class='circle-button'>
                            <div class='circle white' @click='checkIn'>
                                <h1>已签到</h1>
                                <h6>积分：{{user.integral>>0}}</h6>
                            </div>
                        </div>
                    </transition>
                    <transition name='rotate'>
                        <div v-if='!user.ischecked' class='circle-button'>
                            <div class='circle red' @click='checkIn'>
                                签到
                            </div>
                        </div>
                    </transition>
                </div>
                <p class='message'>
                    {{notice}}
                </p>
                <div class='gift-notice'>
                    距离领奖还有 <span class='number'>{{remain_days}}</span> 天，
                    <span @click='toggleRecords'>
                        查看签到记录
                     <i class='iconfont icon-foot'></i>
                     </span>
                </div>
                <transition-group tag='ul' class='gift-list' name='slide-fade'>
                    <li v-for='(gift,$index) in gift_list' :key='$index' :class='{active:gift.is_price}'>
                        <template v-if='gift.is_price'>
                            <img src='./images/earnIntegralMoneyActive.png'>
                            <h4>已领取</h4>
                        </template>
                        <template v-else>
                            <img src='./images/earnIntegralMoney.png'>
                            <h4>{{gift.checkin_days}}</h4>
                        </template>
                    </li>
                </transition-group>
            </header>
            <template v-if='user.is_submit!= 1'>
                <router-link :to='{name:"edit_user"}' tag='div' class='edit-user'>
                    <img src='./images/editUser.png'>
                    <div>
                        <h2>填写个人资料 </h2>
                        <h6>首次完善个人资料可获得积分</h6>
                    </div>
                </router-link>
            </template>
            <transition-group tag='ul' class='article-list' name='slide-fade'>
                <li class='notice' key='title'>
                    <p> 完成单个任务可获得<span>{{read_param.integral}}</span>积分 </p>
                    <p> 每日最多可得<span>{{read_param.day_limit}}</span>积分,今日已获得<span>{{read_param.today}}</span>积分 </p>
                </li>
                <template v-if='article_list.length'>
                    <li v-for='article in article_list' :key='article.id'>
                        <div class='article' @click='readArticle(article)'>
                            <h4 class='title'>{{article.title}}</h4>
                            <div :class='{read:article.is_read==1}'>{{article.is_read==1?'已完成':article.button}}</div>
                        </div>
                    </li>
                </template>
                <li v-else class='empty' key='empty'>
                    现在没有积分任务啦～
                </li>
            </transition-group>
            <img class='balloon' src='./images/earnIntegralBalloon.png'>
        </main>
        <footer class='footer'>
            <v-support></v-support>
        </footer>

        <v-modal v-model='raiders_show'>
            <transition name='enlarge'>
                <div v-show='raiders_show' class='raiders'>
                    <ul>
                        <li v-for='(item,$index) in raiders '>
                            {{$index+1}}、{{item}}
                        </li>
                    </ul>
                    <footer @click='toggleRaiders'>
                        我知道了
                    </footer>
                </div>
            </transition>
        </v-modal>
        <v-modal v-model='gift_show'>
            <transition name='enlarge'>
                <div v-show='gift_show' class='gift'>
                    <img @click='toggleGift' class='close' src='./images/close.png'>
                    <h4 class='message'>获得{{gift.msg}}</h4>
                    <img class='product' :src='gift.img'>
                    <div class='operation' @click='toOrderDetail'></div>
                </div>
            </transition>
        </v-modal>
        <v-modal v-model='records_show'>
            <transition name='enlarge'>
                <div v-show='records_show' class='records'>
                    <div class='container'>
                        <div class='decoration'></div>
                        <div class='close' @click='toggleRecords'>
                            <i class='iconfont icon-close-circle'></i>
                        </div>
                        <h1 class='title'>
                            <div class='triangle'></div>
                            <div class='left'><span>{{records.today}}</span></div>
                            <div class='right'>
                                <span>累计签到<span class='number'>{{records.accumulate_days||0}}</span>天</span>
                            </div>
                        </h1>
                        <div class='calendar'>
                            <ul>
                                <li v-for="i in ['日', '一', '二', '三', '四', '五', '六']">{{i}}</li>
                            </ul>
                            <ul>
                                <li v-for='record in records.detail' :class='[{checked:record.checkin},{disable:record.day>new Date().getDate()},{today:record.day==new Date().getDate()}]'>
                                    <h1 v-if='record.day'>
                                        {{record.day}}
                                        <img class='checked' v-if='record.checkin' src='./images/checked.png'>
                                        <img class='unchecked' v-else-if='record.day!=new Date().getDate()' src='./images/unchecked.png'>
                                    </h1>
                                    <template v-if='record.integral'>
                                        <h6 v-if='record.checkin||record.day>=new Date().getDate()'>{{record.integral}}</h6>
                                        <h6 v-else class='unchecked'>未签到</h6>
                                    </template>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </transition>
        </v-modal>
    </div>
</template>
<script>
    import vModal from 'components/vModal';
    // import vProgress from './components/vProgress ';
    export default {
        name: 'earnIntegral',
        components: {
            vModal,
            // vProgress,
        },
        data() {
            return {
                check_in_params: [],
                submit_param: {
                    integral: 0
                },
                read_param: {
                    integral: 0,
                    day_limit: 0,
                    today: 0
                },
                gift: {},
                article_list: [],
                back_show: false,
                raiders_show: false,
                gift_show: false,
                records_show: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            raiders() {
                return this.check_in_params.checkin_strategy || [];
            },
            gift_list() {
                return this.check_in_params.checkin_price ? this.check_in_params.checkin_price[0].slice(0, 3) : [];
            },
            notice() {
                return this.check_in_params.checkin_param ? this.check_in_params.checkin_param.tips : '';
            },
            remain_days() {
                return this.check_in_params.checkin_param ? this.check_in_params.checkin_param.remaining_days : 0;
            },
            records() {
                return this.check_in_params.checkin_record || {};
            },
        },
        beforeRouteEnter(to, from, next) {
            utils.scrollToTop();
            next();
        },
        activated() {
            this.back_show = this.$route.query.back_show || false;
        },
        created() {
            this.getReadParam();
            this.getArticleList();
            this.getCheckInParams();
            // this.getSubmitParam();
        },
        deactivated() {
            this.back_show = false;
            this.raiders_show = false;
            this.gift_show = false;
            this.records_show = false;
        },
        methods: {
            //签到
            checkIn() {
                if (!this.user.ischecked) {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        const data = response.data;
                        this.$store.dispatch('toggleLoading');
                        if (data.status === APP.SUCCESS) {
                            const check_result = data.data;
                            if (check_result.is_win) {
                                this.toggleGift({
                                    msg: check_result.name,
                                    img: check_result.pic_thumb_new,
                                    order_id: check_result.id
                                });
                            }
                            this.$store.dispatch('getUserInfor');
                            this.getCheckInParams();
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info
                            });
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                }
            },
            //获取签到记录
            getCheckInParams() {
                this.$http.post(`${APP.HOST}/get_checkin_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.check_in_params = data.data;
                    }
                });
            },
            //获取阅读文章积分参数
            getReadParam() {
                this.$http.post(`${APP.HOST}/get_read_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    this.read_param = data.data;
                });
            },
            //获取文章列表
            getArticleList() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/article_list/${APP.USER_ID}`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.article_list = data.data;
                            if (resolve && typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    });
                });
            },
            //阅读文章
            readArticle(article) {
                this.$http.post(`${APP.HOST}/read_article/${article.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS && article.is_read === 2) {
                        this.$store.dispatch('getUserInfor');
                        this.getArticleList().then(() => {
                            location.href = article.url;
                        });
                        this.getReadParam();
                    } else {
                        location.href = article.url;
                    }
                });
            },
            toggleRaiders() {
                this.raiders_show = !this.raiders_show;
            },
            toggleGift(gift = {}) {
                this.gift = gift;
                this.gift_show = !this.gift_show;
            },
            toggleRecords() {
                this.records_show = !this.records_show;
            },
            toOrderDetail() {
                const order_id = this.gift.order_id;
                this.$router.push({
                    name: 'order_detail',
                    query: {
                        order_id
                    }
                });
            }
        }
    };
</script>