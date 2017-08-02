<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .wish-detail {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background: #f2f4f3;
    }

    .wish-detail-content {
        flex: 1;
    }

    .summary {
        position: relative;
        display: flex;
        align-items: center;
        height: pxTorem(244); // padding: pxTorem(27) 0;
        padding: 0 pxTorem(30);
        margin-top: pxTorem(17);
        margin-bottom: pxTorem(28);
        background: $white;
        border-bottom: 1px solid #d3d4d6;
    }

    .finish {
        position: absolute;
        right: pxTorem(20);
        top: pxTorem(20);
        width: pxTorem(136);
        height: pxTorem(110);
    }

    .avater {
        width: pxTorem(128);
        height: pxTorem(128);
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .message {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 pxTorem(20);
        justify-content: center;
        strong {
            font-size: pxTorem(32);
        }
        .date {
            font-size: pxTorem(24);
            font-weight: normal;
        }
        p {
            width: 100%;
            margin-top: pxTorem(10);
            height: pxTorem(72);
            overflow: hidden;
            font-size: pxTorem(24);
            color: #a9aaae;
        }
    }

    .operation {
        width: 100%;
        padding-top: pxTorem(60);
        padding-bottom: pxTorem(36);
        background: $white;
        h1 {
            text-align: center;
        }
        .number {
            margin-left: pxTorem(10);
            margin-right: pxTorem(20);
            font-size: pxTorem(62);
            color: #ff5f17;
        }
        .button-group {
            display: flex;
            justify-content: center;
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: pxTorem(254);
                height: pxTorem(74);
                border-radius: pxTorem(5);
                font-size: pxTorem(32);
                &:nth-child(1) {
                    margin-right: pxTorem(26);
                }
                &.support {
                    background: #ff5f17;
                    color: $white;
                }
                &.invite {
                    border: 1px solid #ff5f17;
                    color: #ff5f17;
                }
                &.disable {
                    background-color: #b5b5b5;
                    color: $white;
                }
            }
        }
    }

    .notice {
        border-top: 1px solid #fbfbfb;
        background: $white;
        border-bottom: 1px solid #d3d4d6;
        h4 {
            line-height: pxTorem(80);
            text-align: center;
        }
        .content {
            display: flex;
            align-items: center;
            height: pxTorem(113);
            padding: 0 pxTorem(30);
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
                width: pxTorem(155);
                height: pxTorem(50);
                text-align: center;
                line-height: pxTorem(50);
                font-size: pxTorem(24);
                border-radius: pxTorem(10);
                color: $white;
                background: #ff5f17;
            }
        }
    }

    .supporters {
        margin-top: pxTorem(15);
        background: $white;
        .title {
            position: relative;
            padding: pxTorem(40) 0;
            text-align: center;
        }
    }

    .support {
        display: flex;
        height: pxTorem(148);
        padding: 0 pxTorem(30);
        align-items: center;
        .avater {
            width: pxTorem(100);
            height: pxTorem(100);
            margin-right: pxTorem(30);
        }
        h6 {
            color: #a9aaae;
        }
        .success {
            width: pxTorem(50);
            height: pxTorem(50);
            margin-left: pxTorem(30);
        }
    }
</style>
<template>
    <div class='wish-detail'>
        <div v-if='wish_detail' class='wish-detail-content'>
            <div class='summary'>
                <div class='avater'>
                    <img :src='wish_detail.headimg'>
                </div>
                <div class='message'>
                    <strong>{{wish_detail.nickname}} <span class='date'>7月26日</span></strong>
                    <p>{{wish_detail.desc}}</p>
                </div>
                <img v-if='wish_detail.status===4' class='finish' src='../../images/finish.png'>
            </div>
            <div class='operation'>
                <h1>已经有<span class='number'>{{wish_detail.score}}</span>支持</h1>
                <div class='button-group'>
                    <div v-if='wish_detail.status===4' class='button  disable'>支持</div>
                    <div v-else-if='wish_detail.is_support===2' class='button support' @click='support'>支持</div>
                    <div v-else class='button  disable'>已支持</div>
                    <div class='button invite' @click='share_show=true'>邀请好友支持</div>
                </div>
            </div>
            <div v-if='wish_detail.status===4' class='notice'>
                <h4>{{wish_detail.reply_characters}}</h4>
                <div v-if='wish_detail.is_reply_product===1' class='content'>
                    <img :src='wish_detail.product_pic_thumb'>
                    <div class='message'>
                        <h5>{{wish_detail.product_name}}</h5>
                        <h6>{{wish_detail.product_name_show}}</h6>
                    </div>
                    <router-link :to='{name:"product_detail",query:{product_id:wish_detail.product_id}}' class='button' tag='div'>去兑换</router-link>
                </div>
            </div>
            <div v-if='wish_detail.support_friends.length>0' class='supporters'>
                <h4 class='title'>最近支持他的好友</h4>
                <ul>
                    <li v-for='support in wish_detail.support_friends' class='support'>
                        <img class='avater' :src='support.headimg'>
                        <div class='message'>
                            <h2>{{support.nickname}}</h2>
                            <h6>{{support.create_time}}</h6>
                        </div>
                        <img class='success' src='./images/success.png'>
                    </li>
                </ul>
            </div>
        </div>
        <v-support></v-support>
        <v-share-guide :show.sync='share_show'></v-share-guide>
    </div>
</template>
<script>
    import weChatShare from 'libs/weChatShare.js';
    import vWish from '../../components/vWish';
    import vShareGuide from 'components/vShareGuide';
    export default {
        name: 'wishDetail',
        components: {
            vWish,
            vShareGuide
        },
        data() {
            return {
                wish_id: '',
                wish_detail: '',
                share_show: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            this.wish_id = this.$route.query.wish_id;
            this.getWishDetail().then(() => {
                const link =
                    `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&page=wish_detail&wish_id=${this.wish_id}`;
                weChatShare({
                    router: this.$route,
                    title: this.wish_detail.name,
                    img: this.wish_detail.headimg,
                    desc: this.wish_detail.desc,
                    link
                });
            });
        },
        methods: {
            getWishDetail() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/wish_detail/${this.wish_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.wish_detail = data.data;
                            if (typeof resolve === 'function') {
                                resolve();
                            }
                        };
                    });
                });
            },
            support() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/wish_support/${this.wish_id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        window.location.reload();
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        });
                    };
                });
            }
        }
    };
</script>