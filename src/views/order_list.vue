<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order_list {
    padding-top: pxTorem(20);
    min-height: 100%;
}
</style>
<template>
    <div class='order_list bg-base'>
        <v-order v-for='order in order_list' v-link='{name:"order_detail",query:{id:order.id}}'>
            <div slot='head-content'>
                订单号：{{order.orderid}}
            </div>
            <div slot='body-content'>
                <v-order-item img='../assets/images/product-3.png' :name='order.product' :integral='order.integral'></v-order-item>
            </div>
            <div slot='footer-content'>
                已发放，点击查看详情记录
            </div>
        </v-order>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vOrder from 'components/v_order'
import vOrderItem from 'components/v_order_item'
export default {

    name: 'order_list',
    components: {
        vOrderItem,
        vOrder
    },
    data() {
        return {
            order_list: [],
            params: {
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0
            }
        }
    },
    route: {
        data() {
            this.getorderList();
            utils.getScrollData(this.order_list, this.params, this.getorderList);
        }
    },
    methods: {
        //获取兑换订单列表
        getorderList(params = this.params) {
            this.$http.post(`${APP.HOST}/order_list/${APP.USER_ID}`, params).then((response) => {
                let data = response.data;
                this.$set('order_list', data.data.list);
            }, (response) => {

            })
        }
    }
};
</script>
