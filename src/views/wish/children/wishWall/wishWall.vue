<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .wish-wall {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
        background: #f2f3f4;
    }

    .wish-wall-content {
        flex: 1; // display: flex;
        // flex-direction: column;
    }

    .slide {
        width: 100%;
        height: pxTorem(200);
    }

    .publish {
        display: flex;
        justify-content: center;
        align-items: center;
        width: pxTorem(690);
        height: pxTorem(72);
        margin: pxTorem(17) auto 0 auto;
        background: url('./images/publish.png');
        background-size: 100% 100%;
        font-size: pxTorem(28);
        color: #ff894b;
        box-shadow: 0 0 pxTorem(8) rgba(0, 0, 0, .1);
        border-radius: pxTorem(36);
        .icon-arrows-right {
            margin-left: pxTorem(15);
            font-size: pxTorem(30);
            font-weight: bold;
            color: #ff894b;
        }
    }

    .rank {
        flex: 1;
        margin-top: pxTorem(30);
        padding: 0 pxTorem(23);
        background: $white;
        overflow: hidden;
        .title {
            height: pxTorem(86);
            line-height: pxTorem(86);
            .award {
                width: pxTorem(26);
                height: pxTorem(32);
                margin-right: pxTorem(18);
                transform: translateY(-5%);
            }
            .success {
                width: pxTorem(32);
                height: pxTorem(32);
                margin-right: pxTorem(18);
                transform: translateY(-5%);
            }
            strong {
                flex: 1;
            }
            .right {
                float: right;
                display: flex;
                align-items: center;
                height: 100%;
                color: #a9aaae;
                .icon-arrows-right {
                    color: #a9aaae;
                    font-size: pxTorem(30);
                    font-weight: bold;
                }
            }
        }
    }

    .finish {
        position: absolute;
        right: pxTorem(-20);
        top: pxTorem(-20);
        width: pxTorem(136);
        height: pxTorem(110);
    }

    .award {
        position: absolute;
        right: pxTorem(20);
        top: 0;
        width: pxTorem(70);
        height: pxTorem(81);
        font-size: pxTorem(27);
        color: #ffed77;
        line-height: pxTorem(90);
        text-align: center;
        background: url('./images/award.png') no-repeat;
        background-size: 100% 100%;
    }

    .notice {
        position: relative;
        border-top: 2px dotted #e0e0e0;
        h4 {
            line-height: pxTorem(80);
            text-align: center;
        }
        .content {
            display: flex;
            align-items: center;
            height: pxTorem(140);
            padding: 0 pxTorem(12);
            img {
                width: pxTorem(102);
                height: pxTorem(102);
            }
            .summary {
                flex: 1;
                padding-left: pxTorem(20);
                h6 {
                    color: #a9aaae;
                }
            }
            .button {
                @include active(#00a1e0,5%);
                display: flex;
                justify-content: center;
                align-items: center;
                width: pxTorem(155);
                height: pxTorem(50);
                font-size: pxTorem(24);
                border-radius: pxTorem(10);
                color: $white;
                background: #00a1e0;
            }
        }
        .circle {
            position: absolute;
            z-index: 1;
            top: pxTorem(-30);
            width: pxTorem(60);
            height: pxTorem(60);
            border-radius: 50%;
            background: $white;
            box-shadow: 0 0 pxTorem(20) rgba(0, 0, 0, .1);
            &.circle-left {
                left: pxTorem(-30);
            }
            &.circle-right {
                right: pxTorem(-30);
            }
        }
    }
</style>
<template>
    <div class='wish-wall'>
        <div class='wish-wall-content'>
            <template v-if='wish_wall'>
                <v-slide :items='slides'></v-slide>
                <router-link :to='{name:"publish_wish"}' tag='div' class='publish'>
                    发布我的心愿 <i class='iconfont icon-arrows-right'></i>
                </router-link>
                <v-pk v-if='pk_detail' :pk='pk_detail'></v-pk>
                <main class='rank'>
                    <h4 v-if='wish_wall.pass_rank.length>0' class='title'>
                        <img class='award' src='./images/rank.png'>
                        <strong>热门心愿排行</strong>
                        <router-link :to='{name:"publish_wish"}' tag='div' class='right'>
                            发布我的心愿
                            <i class='iconfont icon-arrows-right'></i>
                        </router-link>
                    </h4>
                    <v-wish v-for='(wish,$index) in wish_wall.pass_rank' :wish='wish' :callback='getWishWall'>
                        <div v-if='$index<3' class='award'>{{$index+1}}</div>
                    </v-wish>
                    <h4 v-if='wish_wall.finish_rank.length>0' class='title'>
                        <img class='success' src='./images/success.png'>
                        <strong>已实现心愿</strong>
                        <router-link :to='{name:"wish_list"}' tag='div' class='right'>
                            查看更多
                            <i class='iconfont icon-arrows-right'></i>
                        </router-link>
                    </h4>
                    <v-wish v-for='wish in wish_wall.finish_rank' :wish='wish' :callback='getWishWall' :type=2>
                        <img class='finish' src='../../images/finish.png'>
                        <div class='notice'>
                            <!-- <div class='circle circle-left'></div> -->
                            <!-- <div class='circle circle-right'></div> -->
                            <h4><strong>{{wish.reply_characters}}</strong></h4>
                            <div v-if='wish.is_reply_product===1' class='content'>
                                <img :src='wish.product_pic_thumb'>
                                <div class='summary'>
                                    <h5><strong>{{wish.product_name}}</strong></h5>
                                    <h6>{{wish.product_name_show}}</h6>
                                </div>
                                <router-link :to='{name:"product_detail",query:{product_id:wish.product_id}}' class='button' tag='div'>去兑换</router-link>
                            </div>
                        </div>
                    </v-wish>
                </main>
            </template>
        </div>
        <v-support></v-support>
    </div>
</template>
<script>
    import vPk from './components/vPk';
    import vWish from '../../components/vWish';
    import vSlide from '../../components/vSlide.vue';
    export default {
        name: 'wishWall',
        components: {
            vPk,
            vWish,
            vSlide
        },
        data() {
            return {
                wish_wall: '',
                pk_detail: '',
                slides: [],
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        beforeRouteLeave(to, from, next) {
            this.router_state = 'leave';
            this.$store.dispatch('savePosition', position => {
                position[from.name] = utils.getScrollTop();
            });
            this.$store.dispatch('updatePageView');
            next();
        },
        activated() {
            this.router_state = 'enter';
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
            }
        },
        created() {
            this.getWishWall().then(() => {
                this.wish_wall.banner_pk.forEach(data => {
                    if (data.type === 1) {
                        this.slides = data.items;
                    } else if (data.type === 2) {
                        const pk_id = data.items[0].item_id;
                        this.getPkInfor(pk_id);
                    }
                });
            });
        },
        methods: {
            getWishWall() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/wishes_wall`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.wish_wall = data.data;
                            if (typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    });
                });
            },
            getPkInfor(pk_id) {
                this.$http.post(`${APP.HOST}/pk_detail/${pk_id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.pk_detail = data.data;
                    }
                });
            },
        }
    };
</script>