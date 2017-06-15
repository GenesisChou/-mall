<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .product-detail {
        min-height: 100%;
        padding-bottom: pxTorem(85);
        background-color: #f2f3f4;
    }

    .back {
        position: absolute;
        left: pxTorem(38);
        top: pxTorem(24);
        width: pxTorem(94);
        height: pxTorem(94);
    }

    .banner {
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .title {
        @include flex-center-h;
        flex-direction: column;
        height: pxTorem(140);
        padding-left: pxTorem(30);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        h1 {
            font-size: pxTorem(34);
        }
        h3 {
            display: inline-block;
            color: $orange;
        }
        .number {
            font-size: pxTorem(36);
        }
        s {
            padding-left: 0.4rem;
            color: #6e6f6f;
            transform: scale(0.6) translateY(10%);
            display: inline-block;
            transform-origin: left;
        }
    }

    .main {
        padding-bottom: pxTorem(100);
    }

    .sticky {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        padding: 0 pxTorem(30) pxTorem(30) pxTorem(30);
        text-align: center;
        background-color: $white;
        border-bottom: 1px solid $gray-light;
        box-shadow: 0 0 0 #000, 0 0 pxTorem(15) #ddd;
        >div {
            display: block;
            width: 100%;
            height: pxTorem(100);
            line-height: pxTorem(100);
            font-size: pxTorem(40);
            color: $white;
            border-radius: pxTorem(10);
        }
        h6 {
            @include flex-center;
            height: pxTorem(66);
            color: #646565;
            .iconfont {
                color: #ff9817;
                margin-right: pxTorem(5);
            }
        }
        .exchange {
            @include active(#ff5000, 5%);
            margin-top: pxTorem(30);
            background-color: #ff5000;
            &.right {
                width: pxTorem(465);
                font-size: pxTorem(36);
                float: right;
            }
        }
        .exchange.disable {
            @include active(#b5b5b5, 5%);
            background-color: #b5b5b5;
            &.left {
                width: pxTorem(211);
                font-size: pxTorem(36);
                float: left;
            }
        }
        .lack {
            @include active(#ff9817, 5%);
            background-color: #ff9817;
        }
        .icon-arrows-right,
        {
            font-weight: bold; // font-size: .24rem;
            font-size: pxTorem(36);
            &:last-child {
                margin-left: pxTorem(-30);
                margin-right: 0;
            }
        }
    }
</style>
<template>
    <div v-if='product_detail' class='product-detail'>
        <template v-if='!is_recharge'>
            <header class='header '>
                <img v-show='back' class='back' src='./images/back.png' @click='returnPrev' />
                <img class='banner' :src='product_detail.pic_banner_new' />
                <div class='title'>
                    <h1 class='text-ellipsis'>{{product_detail.name}}</h1>
                    <h3><span class='number'>{{integral}}</span>积分
                        <s>¥{{product_detail.price}}</s>
                    </h3>
                </div>
            </header>
            <main class='main'>
                <v-introduction v-if='product_detail.content' title='详细说明' :content='product_detail.content'></v-introduction>
                <v-introduction v-if='product_detail.content_use' title='使用说明' :content='product_detail.content_use'></v-introduction>
            </main>
            <footer class='sticky'>
                <div class='exchange' v-if='state===1' @click='exchange'>立即兑换</div>
                <template v-else-if='state===2'>
                    <h6>
                        <i class='iconfont icon-warn'></i> 您的积分不足
                    </h6>
                    <router-link :to='{name:"earn_integral",query:{back_show:true}}' tag='div' class='lack'>
                        去赚取更多的积分
                        <i class='iconfont icon-arrows-right'></i>
                        <i class='iconfont icon-arrows-right'></i>
                    </router-link>
                </template>
                <div class='exchange disable' v-else-if='state===3'>商品已兑换光</div>
                <div class='exchange ' v-else-if='state===4' @click='share_show=true'>完成分享 立即兑换</div>
                <template v-else-if='state===5'>
                    <div class='exchange disable left'>
                        直接兑换
                    </div>
                    <div class='exchange right' @click='share_show=true'>
                        马上分享 {{product_detail.share_integral}}积分兑换
                        <i class='iconfont icon-arrows-right'></i>
                        <i class='iconfont icon-arrows-right'></i>
                    </div>
                </template>
                <div class='exchange disable' v-else-if='state===6'>
                    该商品已兑换
                </div>
            </footer>
        </template>
        <recharge v-else :product-detail='product_detail'></recharge>
        <v-dialog :show='dialog_show' :dialog='dialog' :toggle-dialog='toggleDialog'></v-dialog>
        <v-share-guide :show.sync='share_show'></v-share-guide>
    </div>
</template>
<script>
    import weChatShare from 'libs/weChatShare.js';
    import vIntroduction from 'components/vIntroduction';
    import recharge from './components/recharge';
    import vDialog from './components/vDialog';
    import vShareGuide from 'components/vShareGuide';
    export default {
        name: 'productDetail',
        components: {
            vIntroduction,
            recharge,
            vDialog,
            vShareGuide
        },
        data() {
            return {
                product_id: '',
                product_detail: '',
                order_detail_id: '', //兑换成功后用于跳转订单详情的订单id
                is_recharge: false,
                dialog: {},
                dialog_show: false,
                share_show: false,
                from: '',
                back: '',
                state: '',
                has_shared: false,
                has_exchanged: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            integral() {
                if (this.product_detail) {
                    if (this.product_detail.is_share === 1 &&
                        this.has_shared === true &&
                        this.product_detail.share === 2) {
                        if (this.has_exchanged) {
                            return this.product_detail.integral >> 0;
                        }
                        return this.product_detail.share_integral >> 0;
                    }
                    return this.product_detail.integral >> 0;
                }
                return 0;
            }
        },
        beforeRouteLeave(to, from, next) {
            this.share_show = false;
            this.dialog_show = false;
            next();
        },
        created() {
            this.product_id = this.$route.query.product_id;
            this.from = this.$route.query.from;
            this.back = this.$route.query.back;
            this.getProductPromise(this.getProductDetail(), this.isShare()).then(data => {
                this.has_shared = data[1].is_share;
                this.has_exchanged = data[1].is_exchange;
                this.changeState(data);
                let link =
                    `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&page=product_detail&product_id=${this.product_id}&back=${this.from}`;
                if (this.from === 'subject_detail') {
                    link += `&subject_id=${this.$route.query.subject_id}`;
                }
                weChatShare({
                    router: this.$route,
                    title: this.product_detail.name,
                    img: this.product_detail.pic_thumb_new,
                    desc: this.product_detail.name_show,
                    link
                }).then(() => {
                    this.share_show = false;
                    return this.shareView();
                }).then(() => {
                    this.getProductPromise(this.getProductDetail(), this.isShare()).then(data => {
                        this.has_shared = data[1].is_share;
                        this.has_exchanged = data[1].is_exchange;
                        this.changeState(data);
                    });
                });
            });
        },
        methods: {
            getProductPromise(promiseX, promiseY) {
                return Promise.all([promiseX, promiseY])
                    .then(data => {
                        return data;
                    });
            },
            //获取商品详情
            getProductDetail() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/product_detail_l/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.product_detail = data.data;
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                        if (this.product_detail.type === 8) {
                            this.is_recharge = true;
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            //兑换
            exchange() {
                this.$store.dispatch('toggleConfirm', {
                    msg: '确认兑换该商品吗?',
                    callback: () => {
                        this.order().then(data => {
                            this.order_detail_id = data.data.id;
                            this.$store.dispatch('getUserInfor');
                            this.toggleDialog({
                                type: 'success',
                                msg: '获得' + this.product_detail.name,
                                img: this.product_detail.pic_thumb_new,
                                btn_text: '查看',
                                callback: this.toOrderDetail
                            });
                            this.getProductPromise(this.getProductDetail(), this.isShare()).then((
                                data) => {
                                this.has_shared = data[1].is_share;
                                this.has_exchanged = data[1].is_exchange;
                                this.changeState(data);
                            });
                        }).catch(data => {
                            this.toggleDialog({
                                type: 'faliure',
                                msg: data.info,
                                btn_text: '我知道了',
                            });
                        });
                    }
                });
            },
            //生成订单
            order() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/product_order/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data);
                            }
                        } else {
                            if (reject && typeof reject === 'function') {
                                reject(data);
                            }
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                        if (reject && typeof reject === 'function') {
                            reject(response.data);
                        }
                    });
                });
            },
            //路由跳转
            toOrderDetail() {
                this.$router.push({
                    name: 'order_detail',
                    query: {
                        order_id: this.order_detail_id
                    }
                });
            },
            toggleDialog(dialog) {
                this.dialog = dialog;
                this.dialog_show = !this.dialog_show;
            },
            returnPrev() {
                var link = {
                    name: this.back
                };
                if (this.back === 'subject_detail') {
                    link.query = {
                        subject_id: utils.getParameterByName('subject_id')
                    };
                }
                this.$router.push(link);
            },
            changeState(data = []) {
                const product = data[0],
                    stock_lack = (product.type !== 8 && product.type !== 5) && product
                    .stocks <= 0 || product.status === 1,
                    integral_lack = parseInt(this.user.integral) < parseInt(product.integral);
                if (product.is_share === 1) {
                    if (this.has_shared) {
                        if (product.share === 2) {
                            if (this.has_exchanged) {
                                if (product.is_beyond_limit) {
                                    this.state = 6;
                                } else if (integral_lack) {
                                    this.state = 2;
                                }
                            } else if (stock_lack) {
                                this.state = 3;
                            } else if (parseInt(this.user.integral) < parseInt(product.share_integral)) {
                                this.state = 2;
                            } else {
                                this.state = 1;
                            }
                        } else if (product.share === 1) {
                            if (this.has_exchanged && product.is_beyond_limit) {
                                this.state = 6;
                            } else if (stock_lack) {
                                this.state = 3;
                            } else if (integral_lack) {
                                this.state = 2;
                            } else {
                                this.state = 1;
                            }
                        }
                    } else if (product.share === 1) {
                        this.state = 4;
                    } else if (product.share === 2) {
                        this.state = 5;
                    }
                } else if (stock_lack) {
                    this.state = 3;
                } else if (integral_lack) {
                    this.state = 2;
                } else {
                    this.state = 1;
                }
            },
            shareView() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/share_view/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        type: 1
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    });
                });
            },
            isShare() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/is_share/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        type: 1
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                    });
                });
            },
        }
    };
</script>