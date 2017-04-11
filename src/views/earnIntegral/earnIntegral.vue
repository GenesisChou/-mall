<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .earn-integral {
        background-color: #f2f3f4;
        overflow: hidden;
    }

    .head {
        width: pxTorem(750);
        height: pxTorem(1158);
        padding-top: pxTorem(70);
        position: relative;
        background: url('./images/earnIntegralBackground.png') no-repeat;
        background-size: 100% 100%;
        .message {
            padding-top: pxTorem(15);
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
                font-size: pxTorem(44);
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

    .main {
        background-color: #4dd3d6;
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
            line-height: pxTorem(40);
            width: 70%;
            font-weight: 500;
            overflow: hidden;
        }
        div {
            @include flex-center;
            width: pxTorem(115);
            height: pxTorem(50);
            border-radius: pxTorem(10);
            font-size: pxTorem(24);
            background-color: $orange;
            color: $white;
            &.read {
                background-color: #4dd3d6;
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

    .frame {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        iframe {
            width: 100%;
            height: 100%;
            overflow: scroll;
        }
    }

    .close-frame {
        position: fixed;
        right: pxTorem(30);
        top: pxTorem(670);
        width: pxTorem(94);
        height: pxTorem(94);
        z-index: 3;
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
        }
    }

    .dialog {
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
            left: pxTorem(66);
            width: pxTorem(490);
            height: pxTorem(233);
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
</style>
<template>
    <div v-if='loaded' class='earn-integral'>
        <main v-if='!frame_show' class='main'>
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
                                <h4>连续{{user.checkin_days}}天</h4>
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
                    连续签到有更多惊喜哦
                    <img src='./images/foot.png'>
                </p>
                <v-progress :checkin-params='checkin_params'></v-progress>
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
            <ul class='article-list'>
                <li class='notice'>
                    <p> 完成单个任务可获得<span>{{read_param.integral}}</span>积分 </p>
                    <p> 每日最多可得<span>{{read_param.day_limit}}</span>积分,今日已获得<span>{{read_param.today}}</span>积分 </p>
                </li>
                <template v-if='article_list.length'>
                    <li v-for='article in article_list'>
                        <div class='article' @click='readArticle(article)'>
                            <h4 class='title'>{{article.title}}</h4>
                            <div :class='{read:article.is_read==1}'>{{article.is_read==1?'已完成':article.button}}</div>
                        </div>
                    </li>
                </template>
                <li v-else class='empty'>
                    现在没有积分任务啦～
                </li>
            </ul>
            <footer class='footer'>
                <v-support></v-support>
            </footer>
        </main>
        <template v-if='frame_show'>
            <div class='frame' style='overflow:auto;-webkit-overflow-scrolling:touch'>
                <iframe :src='frame_link'></iframe>
            </div>
            <img class='close-frame' src='./images/back.png' @click='toggleFrame'>
        </template>
        <v-modal v-model='raiders_show'>
            <div class='raiders'>
                <ul>
                    <li v-for='item in checkin_strategy'>
                        {{item}}
                    </li>
                </ul>
                <footer @click='toggleRaiders'>
                    我知道了
                </footer>
            </div>
        </v-modal>
        <v-modal v-model='dialog_show'>
            <div class='dialog'>
                <img @click='toggleDialog' class='close' src='./images/close.png'>
                <h4 class='message'>获得{{dialog.msg}}</h4>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='toOrderDetail'></div>
            </div>
        </v-modal>

    </div>
</template>
<script>
    import vModal from 'components/vModal';
    import vProgress from './components/vProgress';
    import vDialog from 'views/activityDetail/components/vDialog';
    export default {
        name: 'earnIntegral',
        components: {
            vModal,
            vProgress,
            vDialog
        },
        data() {
            return {
                check_in_params: [],
                loaded: false,
                checked: true,
                submit_param: {
                    integral: 0
                },
                read_param: {
                    integral: 0,
                    day_limit: 0,
                    today: 0
                },
                dialog: {},
                frame_link: '',
                article_list: [],
                back_show: false,
                frame_show: false,
                raiders_show: false,
                dialog_show: false,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            checkin_strategy() {
                return this.check_in_params.checkin_strategy || [];
            },
            checkin_params() {
                return this.check_in_params.checkin_params || [];
            }
        },
        activated() {
            this.back_show = this.$route.query.back_show || false;
        },
        created() {
            this.getReadParam();
            this.getArticleList();
            this.getCheckInParams();
            this.getSubmitParam();
        },
        deactivated() {
            this.back_show = false;
            this.frame_show = false;
            this.raiders_show = false;
            this.dialog_show = false;
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
                                this.toggleDialog({
                                    msg: check_result.name,
                                    img: check_result.pic_thumb,
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
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/get_checkin_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    this.check_in_params = data.data;
                    this.loaded = true;
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            //获取提交资料积分参数
            getSubmitParam() {
                this.$http.post(`${APP.HOST}/get_submit_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    this.submit_param.integral = data.data.integral;
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
                this.$http.post(`${APP.HOST}/article_list/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    this.article_list = data.data;
                });
            },
            //阅读文章
            readArticle(article) {
                this.frame_link = article.url;
                this.$http.post(`${APP.HOST}/read_article/${article.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    this.toggleFrame();
                    const data = response.data;
                    if (data.status === APP.SUCCESS && article.is_read === 2) {
                        this.$store.dispatch('getUserInfor');
                        this.getArticleList();
                        this.getReadParam();
                    }
                    // location.href = article.url;
                });
            },
            toggleFrame() {
                this.frame_show = !this.frame_show;
            },
            toggleRaiders() {
                this.raiders_show = !this.raiders_show;
            },
            toggleDialog(dialog = {}) {
                this.dialog = dialog;
                this.dialog_show = !this.dialog_show;
            },
            toOrderDetail() {
                const order_id = this.dialog.order_id;
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