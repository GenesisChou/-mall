<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .header {
        height: pxTorem(400);
        position: relative;
        .cover {
            display: flex;
            align-items: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: pxTorem(100);
            padding-left: pxTorem(55);
            background: rgba(0, 0, 0, .5);
            color: $white;
        }
    }
    
    .main {
        min-height: pxTorem(825);
        padding: pxTorem(50);
        background-color: $white;
    }
    
    .sticky {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid $gray-light;
        background-color: $white;
        height: pxTorem(110);
        display: flex;
        align-items: center;
        justify-content: space-between;
        display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-justify-content: space-between;
        padding-left: pxTorem(55);
        z-index: 1;
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            width: pxTorem(180);
            height: pxTorem(110);
            font-size: pxTorem(30);
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
        .integral {
            color: $red
        }
        .btn-disable {
            color: $white;
            background-color: #838385;
            letter-spacing: 0;
            text-indent: 0;
        }
    }
</style>
<template>
    <div class='product-detail'>
        <header v-show='content_show' class='header '>
            <img class='img-responsive' :src='product_detail.pic_banner' />
            <h1 class='cover text-ellipsis'>
                {{product_name}}
            </h1>
        </header>
        <article v-show='content_show' class='main '>
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
        </article>
        <footer class='sticky'>
            <h4 class='pull-left'>
                单价：<span class='integral'>{{integral}}</span>积分
            </h4>
            <a v-if='integral_enough' class='btn-red pull-right' @click='exchange'>兑换</a>
            <a v-else class='btn-disable pull-right'>积分不足</a>
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