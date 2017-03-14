<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .banner {
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .title {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        flex-direction: column;
        -webkit-flex-direction: column;
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
            -webkit-transform: scale(0.6) translateY(10%);
            display: inline-block;
            transform-origin: left;
            -webkit-transform-origin: left;
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
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            height: pxTorem(66);
            color: #646565;
            .iconfont {
                color: #ff9817;
                margin-right: pxTorem(5);
            }
        }
        .exchange {
            margin-top: pxTorem(30);
            background-color: #ff5000;
            &:active {
                background-color: darken(#ff5000, 5%);
            }
        }
        .lack {
            background-color: #ff9817;
            &:active {
                background-color: darken(#ff9817, 5%);
            }
        }
    }
</style>
<template>
    <div class='product-detail'>
        <header v-show='content_show' class='header '>
            <img class='banner' :src='product_detail.pic_banner' />
            <div class='title'>
                <h1 class='text-ellipsis'>{{product_name}}</h1>
                <h3><span class='number'>{{integral}}</span>积分
                    <s>¥{{product_detail.price}}</s>
                </h3>
            </div>
        </header>
        <main v-show='content_show' class='main'>
            <v-introduction v-if='product_detail.content' title='详细说明' :content='product_detail.content'></v-introduction>
            <v-introduction v-if='product_detail.content_use' title='使用说明' :content='product_detail.content_use'></v-introduction>
        </main>
        <footer v-show='content_show' class='sticky'>
            <div class='exchange' v-if='integral_enough' @click='exchange'>立即兑换</div>
            <template v-else>
                <h6>
                    <i class='iconfont icon-warn'></i> 您的积分不足
                </h6>
                <router-link :to='{name:"earn_integral",query:{back_show:true}}' tag='div' class='lack'>
                    去赚取更多的积分>>
                </router-link>
            </template>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'productDetail',
        data() {
            return {
                product_id: '',
                product_detail: '',
                order_detail_id: '', //兑换成功后用于跳转订单详情的订单id
                content_show: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            integral_enough() {
                return (this.user.integral) >> 0 >= this.integral;
            },
            integral() {
                return this.$route.query.integral || (this.product_detail.integral >> 0) || 0;
            },
            product_name() {
                return this.$route.query.name || this.product_detail.name;
            }
        },
        watch: {
            product_id() {
                this.content_show = false;
                this.getProductDetail().then(() => {
                    this.content_show = true;
                });
            },
            order_detail_id() {
                this.$store.dispatch('getUserInfor');
                this.$store.dispatch('toggleAlert', {
                    close_btn: true,
                    msg: '获得' + this.product_name,
                    type: 'img',
                    img: this.product_detail.pic_thumb,
                    btn_text: '查看',
                    callback: this.toOrderDetail
                })
            }
        },
        activated() {
            this.product_id = this.$route.query.product_id;
        },
        methods: {
            //获取商品详情
            getProductDetail() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/product_detail_l/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        let data = response.data;
                        this.product_detail = data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    })

                })
            },
            //兑换
            exchange() {
                this.$store.dispatch('toggleConfirm', {
                    msg: '确认兑换该商品吗?',
                    callback: () => {
                        this.order().then(data => {
                            this.order_detail_id = data.data.id;
                        }).catch(data => {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info,
                            })
                        })
                    }
                });
            },
            //生成订单
            order() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/product_order/${this.product_id}`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        let data = response.data;
                        if (data.status == APP.SUCCESS) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                        reject(response.data);
                    })
                })
            },
            //路由跳转
            toOrderDetail() {
                this.$router.push({
                    name: 'order_detail',
                    query: {
                        order_id: this.order_detail_id
                    }
                })
            }
        }
    };
</script>