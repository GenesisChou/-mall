<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.exchange-list {
    padding-top: pxTorem(20);
    height: 100%;
}
</style>
<template>
    <div class='exchange-list bg-base'>
        <v-exchange v-for='i in 3' v-link='{name:"exchange-detail"}'>
            <div slot='head-content'>
                订单号：10086
            </div>
            <div slot='body-content'>
                <v-exchange-item img='../src/assets/images/product-3.png'></v-exchange-item>
            </div>
            <div slot='footer-content'>
                已发放，点击查看详情记录
            </div>
        </v-exchange>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vExchange from 'components/v-exchange'
import vExchangeItem from 'components/v-exchange-item'
export default {

    name: 'exchange-list',
    components: {
        vExchangeItem,
        vExchange
    },
    data() {
        return {

        };
    },
    created() {
        utils.setTitle('兑换记录');
    },
    methods: {
        //获取兑换订单列表
        getExchangeList() {

        }
    }
};
</script>
