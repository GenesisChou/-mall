<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-detail {
    padding: pxTorem(20) 0;
    min-height: 100%;
}

.order {
    margin-bottom: 0;   
}
.v-order-item{
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
                <v-order-item :name='order_detail.product' :integral='product_detail.integral' :img='product_detail.pic_thumb'></v-order-item>
            </div>
            <div slot='footer-content'>
                <p class='text-large'>优惠券码:</p>
                <p>{{order_detail.ticket_id}} </p>
                <p class='text-large'>使用说明:</p>
                <p>{{{product_detail.content_use}}} </p>
            </div>
        </v-order>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vOrder from 'components/v_order'
import vOrderItem from 'components/v_order_item'
export default {

    name: 'order_detail',
    components: {
        vOrderItem,
        vOrder
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
