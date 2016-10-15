<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
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

.body {
    padding: 0 pxTorem(55);
    margin: pxTorem(50) 0 pxTorem(150) 0;
}

.footer {
    height: pxTorem(119);
    padding: 0 pxTorem(55);
}

.modal-content {
    width: pxTorem(500);
    height: pxTorem(260);
    padding-top: pxTorem(31);
    .icon {
        width: pxTorem(50);
        height: pxTorem(50);
    }
    .msg {
        line-height: pxTorem(101);
    }
    .btn+ {
        margin-left: pxTorem(30);
    }
}
</style>
<template>
    <div class='product_detail'>
        <div class='head flex flex-center-h flex-center-v'>
            <img :src='product_detail.pic_banner' />
            <div class='cover text-white  flex flex-center-v'>
                <p class='text-huge'>{{product_detail.name}}</p>
            </div>
        </div>
        <div class='body '>
            <div class='introduction'>
                {{{product_detail.content}}}
            </div>
        </div>
        <v-sticky>
            <div class='footer flex flex-space-between flex-center-v'>
                <div class='text-large'>
                    单价：<span class='text-pink'>{{product_detail.integral|parseInt}}</span>积分
                </div>
                <button v-if='order_enble' class='btn btn-pink ' @click='toggleModal'>兑换</button>
                <button v-else class='btn btn-disable '>积分不足</button>
            </div>
        </v-sticky>
        <v-modal :show.sync='modal'>
            <div class='modal-content text-center'>
                <template v-if='!order_state.start'>
                    <img class='icon' src='../assets/images/question-hollow.png' />
                    <h2 class='text-large msg'>是否确认兑换</h2>
                    <button class='btn btn-pink-hollow text-large' @click='toggleModal'>取消</button>
                    <button class='btn btn-pink text-large' @click='order'>确认</button>
                </template>
                <template v-else>
                    <template v-if='order_state.success'>
                        <img class='icon' src='../assets/images/correct-hollow.png' />
                        <h2 class='text-large msg'>兑换成功</h2>
                        <button class='btn btn-pink' v-link='{name:"order_detail",query:{order_id:order_id}}'>查看</button>
                    </template>
                    <template v-else>
                        <img class='icon' src='../assets/images/error-hollow.png' />
                        <h2 class='text-large msg'>兑换失败</h2>
                        <button v-else class='btn btn-pink' @click='toggleModal'>关闭</button>
                    </template>
                </template>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSticky from 'components/v_sticky'
import vModal from 'components/v_modal'
import filters from 'libs/filters'
export default {

    name: 'product_detail',
    components: {
        vSticky,
        vModal
    },
    data() {
        return {
            modal: false,
            user: {},
            order_state: {
                start: false,
                success: false,
                msg: ''
            },
            product_id: '',
            product_detail: '',
            order_id: '' //兑换成功后用于跳转订单详情的订单id
        };
    },
    route: {
        data(transition) {
            this.$set('product_id', transition.to.query.product_id);
            this.getUserInfor();
            this.getProductDetail();
        }
    },
    computed: {
        order_enble: function() {
            return (parseInt(this.user.integral) - parseInt(this.product_detail.integral)) >= 0 ? true : false;
        }
    },
    methods: {
        //获取用户信息
        getUserInfor() {
            this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('user', data.data);
            }, (response) => {

            })
        },
        //获取商品详情
        getProductDetail() {
            this.$http.post(`${APP.HOST}/product_detail/${this.product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('product_detail', data.data);

            }, (response) => {})
        },
        toggleModal() {
            this.modal = !this.modal;
            setTimeout(() => {
                this.order_state.start = false;
            }, 500);
        },
        //生成订单
        order() {
            this.$http.post(`${APP.HOST}/product_order/${this.product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('order_state.start', true);
                this.$set('order_state.msg', data.info);
                if (response.data.status === APP.SUCCESS) {
                    this.$set('order_state.success', true);
                    this.$set('order_id', data.data.id);
                    this.getUserInfor();
                }
            }, (response) => {

            })
        }
    },
    filters
};
</script>
