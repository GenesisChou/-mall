<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .wish-wall {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
        background: #f2f3f4;
        padding-bottom: pxTorem(100);
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
        margin: pxTorem(17) auto pxTorem(30) auto;
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
        padding: 0 pxTorem(23);
        background: $white;
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

    .notice {
        border-top: 1px solid #fbfbfb;
        h4 {
            line-height: pxTorem(80);
            text-align: center;
        }
        .content {
            display: flex;
            align-items: center;
            height: pxTorem(113);
            padding: 0 pxTorem(12);
            img {
                width: pxTorem(102);
                height: pxTorem(102);
            }
            .message {
                flex: 1;
                h6 {
                    color: #a9aaae;
                }
            }
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: pxTorem(155);
                height: pxTorem(50);
                font-size: pxTorem(24);
                border-radius: pxTorem(10);
                color: $white;
                background: #ff5f17;
                border: 1px solid #ff5f17;
            }
        }
    }
</style>
<template>
    <div class='wish-wall'>
        <template v-if='wish_wall'>
            <v-slide :items='wish_wall.banner_pk[0].items'></v-slide>
            <router-link :to='{path:"/wish_wall/publish"}' tag='div' class='publish'>
                发布我的心愿 <i class='iconfont icon-arrows-right'></i>
            </router-link>
            <v-pk v-if='pk_detail' :pk='pk_detail'></v-pk>
            <main class='rank'>
                <h4 class='title'>
                    <img class='award' src='./images/rank.png'>
                    <strong>热门心愿排行</strong>
                    <router-link :to='{path:"/wish_wall/publish"}' tag='div' class='right'>
                        发布我的心愿
                        <i class='iconfont icon-arrows-right'></i>
                    </router-link>
                </h4>
                <v-wish v-for='wish in wish_wall.finish_rank' :wish='wish'></v-wish>
                <h4 class='title'>
                    <img class='success' src='./images/success.png'>
                    <strong>热门心愿排行</strong>
                    <router-link :to='{path:"/wish_wall/all"}' tag='div' class='right'>
                        查看更多
                        <i class='iconfont icon-arrows-right'></i>
                    </router-link>
                </h4>
                <v-wish v-for='wish in wish_wall.pass_rank' :wish='wish'>
                    <div class='notice'>
                        <h4>{{wish.reply_characters}}</h4>
                        <div v-if='wish.is_reply_product===1' class='content'>
                            <img :src='wish.product_pic_thumb'>
                            <div class='message'>
                                <h5>{{wish.product_name}}</h5>
                                <h6>{{wish.product_name_show}}</h6>
                            </div>
                            <div class='button'>去兑换</div>
                        </div>
                    </div>
                </v-wish>
            </main>
        </template>
        <v-menu></v-menu>
    </div>
</template>
<script>
    import vMenu from 'components/vMenu';
    import vPk from './components/vPk';
    import vWish from '../../components/vWish';
    import vSlide from './components/vSlide.vue';
    export default {
        name: 'wishWall',
        components: {
            vMenu,
            vPk,
            vWish,
            vSlide
        },
        data() {
            return {
                wish_wall: '',
                pk_detail: ''
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            this.getWishWall().then(() => {
                const pk_id = this.wish_wall.banner_pk[1].id;
                this.getPkInfor(pk_id);
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
            }
        }
    };
</script>