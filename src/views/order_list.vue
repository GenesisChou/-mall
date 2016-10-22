<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-list {
    min-height: 100%;
    padding: pxTorem(20) 0;
    .order {
        border-bottom: 0;
    }
}

.order:last-child {
    margin-bottom: 0;
}
</style>
<template>
    <div class='order-list bg-base'>
        <v-order v-for='order in order_list' v-link='{name:"order_detail",query:{order_id:order.id}}'>
            <div slot='head-content'>
                订单号：{{order.orderid}}
            </div>
            <div slot='body-content'>
                <v-order-item :name='order.product' :integral='order.integral' :img='order.product_pic'></v-order-item>
            </div>
            <div slot='footer-content'>
                <!-- {{order.status_str}} -->
            </div>
        </v-order>
        <v-empty v-if='empty'></v-empty>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
import vSpinner from 'components/v_spinner'
import utils from 'libs/utils'
import vOrder from 'components/v_order'
import vOrderItem from 'components/v_order_item'
import vEmpty from 'components/v_empty'
import vBackTop from 'components/v_back_top'
export default {

    name: 'order_list',
    components: {
        vOrderItem,
        vOrder,
        vSpinner,
        vEmpty,
        vBackTop
    },
    data() {
        return {
            order_list: [],
            empty: false,
            params: {
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID
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
                if (this.params.p <= 1) {
                    this.$set('params.total', data.data.total);
                    this.$set('params.count', data.data.count);
                }
                this.$set('order_list', this.order_list.concat(data.data.list));
                if (!this.order_list.length > 0) {
                    this.$set('empty', true);
                }
            }, (response) => {

            })
        }
    }
};
</script>
