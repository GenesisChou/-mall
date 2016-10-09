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
                订单号：10086
            </div>
            <div slot='body-content'>
                <v-order-item v-for='i in 2' img='../src/assets/images/product-3.png'></v-order-item>
            </div>
            <div slot='footer-content'>
                <p>商品信息： </p>
                <p>BBW20138012423 </p>
                <p>使用说明： </p>
                <p>请到以下网址按照说明使用：www.test.com </p>
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

        };
    },
    created() {
    },
    methods: {
        getorderDetail() {

        }
    }
};
</script>
