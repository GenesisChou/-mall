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
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: pxTorem(30);
        background: $white;
        overflow: hidden;
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row-reverse;
            width: 100%;
            height: pxTorem(86);
            padding: 0 pxTorem(23);
            font-size: pxTorem(28);
            color: #a9aaae;
            .icon-arrows-right {
                color: #a9aaae;
                font-size: pxTorem(30);
                font-weight: bold;
            }
        }
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: pxTorem(86);
            padding: 0 pxTorem(23);
            font-size: pxTorem(28);
            .icon-award {
                width: pxTorem(26);
                height: pxTorem(32);
                margin-right: pxTorem(18);
                transform: translateY(-5%);
            }
            .icon-success {
                width: pxTorem(32);
                height: pxTorem(32);
                margin-right: pxTorem(18);
                transform: translateY(-5%);
            }
            strong {
                flex: 1;
            }
            .right {
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
                @include active(#00a1e0,
                5%);
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

    .empty {
        flex: 1;
        padding-top: pxTorem(160);
        background: $white;
        text-align: center;
        img {
            width: pxTorem(750);
            height: pxTorem(600);
        }
        h2 {
            color: #707e89;
        }
    }
</style>
<template>
    <div class='wish-wall'>
        <template v-if='wish_wall'>
            <template v-if='avaliable'>
                <div class='wish-wall-content'>
                    <template v-for='component in wish_wall.banner_pk'>

                        <v-slide v-if='component.type===1' :items='component.items'></v-slide>
                        <!-- <v-pk v-else-if='component.type===2&&pk_detail' :pk='pk_detail'></v-pk> -->
                        <v-pk v-else-if='component.type===2&&component' :component='component' ></v-pk>
                        <router-link v-else-if='component.type===3' :to='{name:"publish_wish"}' tag='div' class='publish'>
                            发布我的心愿 <i class='iconfont icon-arrows-right'></i>
                        </router-link>
                    </template>
                    <div v-if='wish_wall.pass_rank&&wish_wall.pass_rank.length>0' class='rank'>
                        <header class='title'>
                            <img class='icon icon-award' src='./images/rank.png'>
                            <strong>热门心愿排行</strong>
                            <router-link :to='{name:"publish_wish"}' tag='div' class='right'>
                                发布我的心愿
                                <i class='iconfont icon-arrows-right'></i>
                            </router-link>
                        </header>
                        <v-wish v-for='(wish,$index) in wish_wall.pass_rank' :wish='wish' :callback='getWishWall'>
                            <div v-if='$index<3' class='award'>{{$index+1}}</div>
                        </v-wish>
                        <footer class='footer'>
                            <router-link :to='{name:"wish_list"}' tag='div' class='right'>
                                查看更多
                                <i class='iconfont icon-arrows-right'></i>
                            </router-link>
                        </footer>
                    </div>
                    <div v-if='wish_wall.finish_rank&&wish_wall.finish_rank.length>0' class='rank'>
                        <header class='title'>
                            <img class='icon icon-success' src='./images/success.png'>
                            <strong>已实现心愿</strong>
                            <router-link :to='{name:"publish_wish"}' tag='div' class='right'>
                                发布我的心愿
                                <i class='iconfont icon-arrows-right'></i>
                            </router-link>
                        </header>
                        <v-wish v-for='wish in wish_wall.finish_rank' :wish='wish' :callback='getWishWall' :type=2>
                            <img class='finish' src='../../images/finish.png'>
                            <div class='notice'>
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
                        <footer class='footer'>
                            <router-link :to='{name:"wish_list"}' tag='div' class='right'>
                                查看更多
                                <i class='iconfont icon-arrows-right'></i>
                            </router-link>
                        </footer>
                    </div>
                </div>
                <v-support></v-support>
            </template>
            <div v-else class='empty'>
                <img src='../../images/empty.png'>
                <h2>该功能暂未开通，敬请期待~</h2>
            </div>
        </template>
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
                pk_detail: '',
                avaliable: true
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            wish_wall() {
                return this.$store.state.wish.wish_wall;
            },
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
            if (!this.wish_wall) {
                this.$store.dispatch('toggleLoading');
                this.$store.dispatch('getWishWall').then(data => {
                    this.$store.dispatch('toggleLoading');
                    const wish_wall = data.data,
                        banner_pk = wish_wall.banner_pk;
                    if (wish_wall.is_show === 1) {
                        // if (utils.getTypeOf(banner_pk) === 'Array') {
                        //     banner_pk.forEach(data => {
                        //         if (data.type === 2) {
                        //             const pk_id = data.items[0].item_id;
                        //             this.getPkInfor(pk_id);
                        //         }
                        //     });
                        // }
                    } else {
                        this.avaliable = false;
                    }
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                });
            } else if (this.wish_wall.is_show === 2) {
                this.avaliable = false;
            }
        },
        methods: {
            getWishWall() {
                this.$store.dispatch('getWishWall');
            },
        }
    };
</script>