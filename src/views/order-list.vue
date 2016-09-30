<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-list {
    padding-top: pxTorem(20);
    height: 100%;
}
</style>
<template>
    <div class='order-list bg-base'>
        <v-order v-for='i in 3' v-link='{name:"order-detail"}'>
            <div slot='head-content'>
                订单号：10086
            </div>
            <div slot='body-content'>
                <v-order-item img='../src/assets/images/product-3.png'></v-order-item>
            </div>
            <div slot='footer-content'>
                已发放，点击查看详情记录
            </div>
        </v-order>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vOrder from 'components/v-order'
import vOrderItem from 'components/v-order-item'
export default {

    name: 'order-list',
    components: {
        vOrderItem,
        vOrder
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
        getorderList() {

        }
    }
};
</script>
