<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .earn-integral {
        background-color: #4dd3d6;
    }
    
    .head {
        width: 100%;
        height: pxTorem(770);
        padding-top: pxTorem(70);
        position: relative;
        background-image: url('./images/yellowBg.png');
        background-repeat: no-repeat;
        background-size: 100%;
        .message {
            padding-top: pxTorem(25);
            text-align: center;
            h5 {
                text-shadow: 0 pxTorem(4) pxTorem(4) rgba(209, 172, 0, 0.68);
                font-weight: bold;
                color: $white;
                span {
                    color: $orange;
                    font-size: pxTorem(30);
                }
            }
            h6 {
                color: #9d7035;
            }
        }
    }
    
    .rotate {
        position: relative;
        width: 100%;
        height: pxTorem(234);
    }
    
    .circle-button {
        display: flex;
        align-items: center;
        justify-content: center;
        display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-justify-content: center;
        width: pxTorem(234);
        height: pxTorem(234);
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: pxTorem(-117);
        background-color: rgba(255, 255, 255, 0.62);
        border-radius: 50%;
        .circle {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            -webkit-flex-direction: column;
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
    
    .progress {
        position: absolute;
        width: 100%;
        height: pxTorem(160);
        bottom: pxTorem(10);
        .line {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: pxTorem(-321.5);
            margin-top: pxTorem(-6);
            width: pxTorem(643);
            height: pxTorem(12);
            box-shadow: 0 pxTorem(2) 1px rgba(43, 167, 169, 0.75);
            background-color: #14bcbf;
            z-index: 1;
        }
        .check-item {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: space-around;
            -webkit-justify-content: space-around;
            flex-direction: column;
            -webkit-flex-direction: column;
            position: absolute;
            height: pxTorem(160);
            left: pxTorem(44);
            color: $white;
            &.active {
                .circle {
                    background-color: $orange;
                }
            }
        }
        .check-item.active:nth-child(3):before {
            content: '';
            position: absolute;
            left: pxTorem(-85);
            top: 50%;
            margin-top: pxTorem(-6);
            width: pxTorem(100);
            height: pxTorem(12);
            background-color: $orange;
            z-index: 2;
        }
        .circle {
            position: absolute;
            top: 50%;
            width: pxTorem(25);
            height: pxTorem(25);
            margin-top: pxTorem(-12.5);
            box-shadow: 0 pxTorem(3) 1px rgba(43, 167, 169, 0.75);
            background-color: #2aa6a8;
            border-radius: 50%;
            z-index: 3;
        }
    }
    
    .edit-user {
        display: flex;
        align-items: center;
        display: -webkit-flex;
        -webkit-align-items: center;
        height: pxTorem(107);
        padding-left: pxTorem(35);
        background-color: #d0eff1;
        border-top: 1px solid #a78179;
        &:active {
            background-color: darken(#d0eff1, 10%);
        }
        img {
            width: pxTorem(71);
            height: pxTorem(53);
            margin-right: pxTorem(20);
        }
        h2 {
            color: $orange;
        }
        h6 {
            color: #a78179;
        }
    }
    
    .notice {
        display: flex;
        justify-content: center;
        flex-direction: column;
        display: -webkit-flex;
        -webkit-justify-content: center;
        -webkit-flex-direction: column;
        height: pxTorem(106);
        padding-left: pxTorem(35);
        font-size: pxTorem(28);
        span {
            color: $orange;
        }
    }
    
    
    .article-list {
        margin-top:pxTorem(20);
        color: #a78179;
        background-color: #d0eff1;
        border-top: 1px solid #a78179;
        ul,
        li {
            list-style: none;
        }
        li~:active {
            background-color: darken(#d0eff1, 10%);
        }
    }
</style>
<template>
    <div v-if='loaded' class='earn-integral'>
        <header class='head'>
            <div class='rotate'>
                <transition name='rotate'>
                    <div v-if='user.ischecked' class='circle-button'>
                        <div class='circle white'>
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
            <div class='message'>
                <h5>
                    <template v-if='!user.ischecked'>今日</template>
                    <template v-else>明日</template> 签到可领取
                    <span>{{integral}}</span> 积分
                </h5>
                <h6>连续签到有更多惊喜哦</h6>
            </div>
            <div class='progress'>
                <div class='line'></div>
                <div v-for='(item,$index) in check_in_params' :class='["check-item",{active:$index==0||(user.ischecked&&$index==1)}]' :style='getCircleStyle($index)'>
                    <h6>{{item.integral}}</h6>
                    <div class='circle'></div>
                    <h6>{{item.day}}</h6>
                </div>
            </div>
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
        <div class='space'></div>
        <ul class='article-list'>
            <li class='notice'>
                <p>
                    阅读一篇文稿<span>{{read_param.integral}}</span>积分 </p>
                <p>
                    每日最多可得<span>{{read_param.day_limit}}</span>积分,今日已获得<span>{{read_param.today}}</span>积分
                </p>
            </li>
            <li v-for='article in article_list'>
                <v-mission :article='article' :callback='readArticle'></v-mission>
            </li>
        </ul>
    </div>
</template>
<script>
    import vMission from './components/vMission.vue';
    export default {
        name: 'earnIntegral',
        components: {
            vMission
        },
        data() {
            return {
                check_in_params: [],
                loaded: false,
                checked: true,
                submit_param: {
                    integral: 0
                },
                //
                read_param: {
                    integral: 0,
                    day_limit: 0,
                    today: 0
                },
                article_list: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            integral() {
                if (this.check_in_params.length == 0) return 0;
                if (!this.user.ischecked) {
                    return this.check_in_params[1]['integral'].substring(1);
                }
                return this.check_in_params[2]['integral'].substring(1);
            }
        },
        watch: {
            check_in_params() {
                this.loaded = true;
            },
        },
        activated() {
            this.getArticleList();
            this.getReadParam();
        },
        created() {
            this.getCheckInParams();
            this.getSubmitParam();
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
                        let data = response.data;
                        this.$store.dispatch('toggleLoading');
                        if (data.status == APP.SUCCESS) {
                            this.$store.dispatch('getUserInfor');
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info
                            })
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    })
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
                    let data = response.data;
                    this.check_in_params = data.data;
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })
            },
            //获取提交资料积分参数
            getSubmitParam() {
                this.$http.post(`${APP.HOST}/get_submit_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.submit_param.integral = data.data.integral;
                })

            },
            //获取阅读文章积分参数
            getReadParam() {
                this.$http.post(`${APP.HOST}/get_read_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.read_param = data.data;
                })
            },
            //获取文章列表
            getArticleList() {
                this.$http.post(`${APP.HOST}/article_list/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.article_list = data.data;
                })
            },
            //阅读文章
            readArticle(article_id) {
                this.$http.post(`${APP.HOST}/read_article/${article_id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.$store.dispatch('getUserInfor')
                    }
                })

            },
            getCircleStyle($index) {
                let left = 30 + $index * 107;
                return {
                    left: utils.pxTorem(left)
                }
            }


        }
    }
</script>