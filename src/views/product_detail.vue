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
        height: pxTorem(102);
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
    padding-left: pxTorem(55);
    .btn {
        padding: 0;
        width: pxTorem(180);
        height: pxTorem(100);
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

.modal-content {
    width: pxTorem(600);
    border-radius: pxTorem(10);
    overflow: hidden;
    text-align: center;
}

.modal-1 {
    .msg {
        line-height: pxTorem(190);
        background-color: $white;
        font-size: pxTorem(32);
    }
    .btns {
        font-size: pxTorem(30);
        >div {
            height: pxTorem(84);
            line-height: pxTorem(84);
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
            &:nth-child(1) {
                border-top: 1px solid $gray;
            }
        }
    }
}

.modal-2 {
    padding: pxTorem(20);
    background-color: $white;
    border-radius: pxTorem(10);
    .msg {
        padding: pxTorem(40) 0;
        margin: auto;
        font-size: pxTorem(32);
        text-align: center;
        width: pxTorem(400);
    }
    .pic {
        width: pxTorem(270);
        height: pxTorem(235);
    }
    .btn {
        width: pxTorem(300);
        height: pxTorem(78);
        margin: 0 auto;
        margin-bottom: pxTorem(30);
        line-height: pxTorem(78);
        font-size: pxTorem(30);
    }
}
</style>
<template>
    <div class='product_detail'>
        <header class='header flex flex-center-h flex-center-v'>
            <img :src='product_detail.pic_banner' />
            <div class='cover text-white  flex flex-center-v'>
                <p class='text-huge'>{{product_detail.name}}</p>
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
            <footer class='footer flex flex-space-between flex-center-v'>
                <div class='text-large'>
                    单价：<span class='text-pink'>{{parseInt(product_detail.integral)||0}}</span>积分
                </div>
                <button v-if='integral_enough' class='btn btn-red ' @click='toggleModal'>兑换</button>
                <button v-else class='btn btn-disable '>余额不足</button>
            </footer>
        </v-sticky>
        <v-modal :cover-close=false :show='modal'>
            <section v-if='!order_state.start' class='modal-content modal-1'>
                <div class=' msg'>是否确认兑换?</div>
                <div class='flex btns'>
                    <div class=' flex-item  btn-cancel bg-white' @click='toggleModal'>取消</div>
                    <div class=' flex-item btn-sure bg-red text-white' @click='order'>确认</div>
                </div>
            </section>
            <section v-else class='modal-content modal-2'>
                <header>
                    <img class='pic' src='../assets/images/iphone.png'>
                </header>
                <div class='msg'>{{order_state.msg}}</div>
                <router-link v-if='order_state.success' tag='div' class='btn btn-red' :to='{name:"order_detail",query:{order_id:order_detail_id}}' replace>
                    查看详情
                </router-link>
                <div v-else class='btn btn-red' @click='toggleModal'>
                    关闭
                </div>
            </section>
        </v-modal>
    </div>
</template>
<script>
import vSticky from 'components/v_sticky.vue'
import vDivider from 'components/v_divider.vue'
import vModal from 'components/v_modal.vue'
import vSimditor from 'components/v_simditor.vue'
export default {

    name: 'product_detail',
    components: {
        vSticky,
        vModal,
        vSimditor,
        vDivider
    },
    data() {
        return {
            modal: false,
            integral_enough: true,
            order_state: {
                start: false,
                success: false,
                msg: ''
            },
            product_id: '',
            product_detail: '',
            order_detail_id: '', //兑换成功后用于跳转订单详情的订单id
        };
    },
    mounted() {
        this.product_id = this.$route.query.product_id;
        this.$store.dispatch('getUserInfor');
        this.getProductDetail();
    },
    computed: {
        integral_enough() {
            return parseInt(this.user.integral) >= parseInt(this.product_detail.integral) ? true : false;
        },
        user() {
            return this.$store.state.user;
        }
    },
    methods: {

        //获取商品详情
        getProductDetail() {
            this.$http.post(`${APP.HOST}/product_detail_l/${this.product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                // this.$set('product_detail', utils.resizeImg(data.data));
                this.product_detail = data.data;
            }, (response) => {})
        },
        //生成订单
        order() {
            this.$http.post(`${APP.HOST}/product_order/${this.product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.order_state.msg = data.info;
                this.order_state.start = true;
                if (response.data.status === APP.SUCCESS) {
                    this.order_state.success = true;
                    this.order_detail_id = data.data.id;
                    //更新用户数据
                    this.$store.dispatch('getUserInfor');
                }
            }, (response) => {

            })
        },
        toggleModal() {
            this.modal = !this.modal;
        },
    }
};
</script>
