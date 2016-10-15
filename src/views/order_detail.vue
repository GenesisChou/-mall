<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-detail {
    padding-top: pxTorem(20);
    height: 100%;
}
</style>
<template>
    <div class='order-detail bg-base'>
        <v-order>
            <div slot='head-content'>
                订单号：{{order_detail.orderid}}
            </div>
            <div slot='body-content'>
                <v-order-item :name='order_detail.product' :integral='order_detail.integral'></v-order-item>
            </div>
            <div slot='footer-content'>
                <p>商品信息： </p>
                <p>{{{product_detail.content}}} </p>
                <p>使用说明： </p>
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
            this.getorderDetail();
        }
    },
    methods: {
        getorderDetail() {
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
                this.$set('product_detail', data.data);
            }, (response) => {

            })
        }
    }
};
</script>
