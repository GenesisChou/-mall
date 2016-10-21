<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-detail {
    padding: pxTorem(20) 0;
    min-height: 100%;
}

.order {
    margin-bottom: 0;
}

.v-order-item {
    border-bottom: pxTorem(1) solid #c8c8c8;
}
</style>
<template>
    <div class='order-detail bg-base'>
        <v-order>
            <div slot='head-content'>
                订单号：{{order_detail.orderid}}
            </div>
            <div slot='body-content'>
                <v-order-item :name='order_detail.product' :integral='order_detail.integral' :img='product_detail.pic_thumb'></v-order-item>
            </div>
            <div slot='footer-content'>
                <template v-if='order_detail.ticket_id'>
                    <p class='text-huge'>优惠券码:</p>
                    <p class='text-pink'>{{order_detail.ticket_id}} </p>
                </template>
                <template v-if='product_detail.content_use'>
                    <v-divider text='使用说明' type='dashed'></v-divider>
                    <v-simditor>
                        {{{product_detail.content_use}}}
                    </v-simditor>
                </template>
            </div>
        </v-order>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vOrder from 'components/v_order'
import vOrderItem from 'components/v_order_item'
import vSimditor from 'components/v_simditor'
import vDivider from 'components/v_divider'
export default {

    name: 'order_detail',
    components: {
        vOrderItem,
        vOrder,
        vSimditor,
        vDivider
    },
    data() {
        return {
            order_id: '',
            order_detail: {},
            product_detail: {},
        };
    },
    route: {
        data(transition) {
            this.order_id = transition.to.query.order_id;
            this.getOrderDetail();
        }
    },
    methods: {
        getOrderDetail() {
            this.$http.post(`${APP.HOST}/order_detail/${this.order_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('order_detail', data.data);
                this.getProductDetail(data.data.product_id);
            }, (response) => {

            })
        },
        getProductDetail(product_id) {
            this.$http.post(`${APP.HOST}/product_detail/${product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('product_detail', utils.resizeImg(data.data));
            }, (response) => {

            })
        }
    }
};
</script>
