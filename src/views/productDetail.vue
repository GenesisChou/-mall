<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    .header {
        height: pxTorem(400);
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .cover {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: pxTorem(100);
            line-height: pxTorem(100);
            padding-left: pxTorem(55);
            background: rgba(0, 0, 0, .5);
        }
    }
    
    .fill {
        height: pxTorem(150);
    }
    
    .main {
        padding: 0 pxTorem(50);
        .introduction {
            margin-top: pxTorem(50);
            .title {
                padding: pxTorem(30) 0;
            }
        }
    }
    
    .footer {
        height: pxTorem(100);
        line-height: pxTorem(100);
        padding-left: pxTorem(55);
        button {
            padding: 0;
            width: pxTorem(180);
            height: pxTorem(101);
            line-height: pxTorem(101);
            margin-top: pxTorem(-1);
            font-size: pxTorem(30);
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
            border: 0;
            border-radius: 0;
        }
        .btn-disable {
            color: $white;
            background-color: #838385;
            letter-spacing: 0;
            text-indent: pxTorem(0);
        }
    }
</style>
<template>
    <div class='product-detail'>
        <header class='header '>
            <img :src='product_detail.pic_banner' />
            <div class='cover text-white '>
                <p class='text-huge text-ellipsis'>{{product_name}}</p>
            </div>
        </header>
        <article class='main '>
            <div class='introduction'>
                <v-simditor>
                    <template v-if='product_detail.content'>
                        <v-divider text='详细说明'></v-divider>
                        <div v-html='product_detail.content'></div>
                    </template>
                    <template v-if='product_detail.content_use'>
                        <v-divider text='使用说明'></v-divider>
                        <div v-html='product_detail.content_use'></div>
                    </template>
                </v-simditor>
            </div>
            <div class='fill'></div>
        </article>
        <v-sticky>
            <footer class='footer '>
                <h4 class='pull-left'>
                    单价：<span class='text-red'>{{integral||(product_detail.integral)>>0}}</span>积分
                </h4>
                <button v-if='integral_enough' class='btn-red pull-right' @click='exchange'>兑换</button>
                <button v-else class='btn-disable pull-right'>积分不足</button>
            </footer>
        </v-sticky>
    </div>
</template>
<script>
    export default {
        name: 'product_detail',
        data() {
            return {
                product_detail: '',
                order_detail_id: '', //兑换成功后用于跳转订单详情的订单id
            };
        },
        computed: {
            product_id() {
                return this.$route.query.product_id;
            },
            integral_enough() {
                return this.user.integral >= this.integral;
            },
            user() {
                return this.$store.state.user;
            },
            integral() {
                return this.$route.query.integral || this.product_detail.integral || 0;
            },
            product_name() {
                return this.product_detail.name || this.$route.query.product_name;
            }
        },
        watch: {
            order_detail_id() {
                //更新用户数据
                this.$store.dispatch('getUserInfor');
                this.$store.dispatch('toggleAlert', {
                    close_btn:true,
                    msg: '获得' + this.product_name,
                    type: 'img',
                    img: this.product_detail.pic_thumb,
                    btn_text: '查看',
                    callback: this.toOrderDetail
                })
            }
        },
        created() {
            this.getProductDetail();
        },
        methods: {
            //获取商品详情
            getProductDetail() {
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
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
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