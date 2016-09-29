<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.exchange-detail {
    padding-top: pxTorem(20);
    height: 100%;
}
</style>
<template>
    <div class='exchange-detail bg-base'>
        <v-exchange>
            <div slot='head-content'>
                订单号：10086
            </div>
            <div slot='body-content'>
                <v-exchange-item v-for='i in 2' img='../src/assets/images/product-3.png'></v-exchange-item>
            </div>
            <div slot='footer-content'>
                <p>商品信息： </p>
                <p>BBW20138012423 </p>
                <p>使用说明： </p>
                <p>请到以下网址按照说明使用：www.test.com </p>
            </div>
        </v-exchange>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vExchange from 'components/v-exchange'
import vExchangeItem from 'components/v-exchange-item'
export default {

    name: 'exchange-detail',
    components: {
        vExchangeItem,
        vExchange
    },
    data() {
        return {

        };
    },
    created() {
        utils.setTitle('订单详情');
    },
    methods: {
        getExchangeDetail() {

        }
    }
};
</script>
