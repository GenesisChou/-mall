<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-list {
    min-height: 100%;
    padding-bottom: pxTorem(22);
}
</style>
<template>
    <div class='order-list bg-base'>
        <router-link v-for='order in order_list' :to='{name:"order_detail",query:{order_id:parseInt(order.id)}}'>
            <v-order :order='order'> </v-order>
        </router-link>
        <v-empty v-if='empty'></v-empty>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
import utils from 'libs/utils.js'
import vOrder from 'components/v_order.vue'
import vEmpty from 'components/v_empty.vue'
import vBackTop from 'components/v_back_top.vue'
export default {
    name: 'order_list',
    components: {
        vOrder,
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
    mounted() {
        this.getOrderList();
        utils.getScrollData(this.order_list, this.params, this.getOrderList);
    },
    methods: {
        //获取兑换订单列表
        getOrderList(params = this.params) {
            this.$store.dispatch('toggleLoading',{show:true});
            this.$http.post(`${APP.HOST}/order_list/${APP.USER_ID}`, params).then((response) => {
                let data = response.data;
                if (this.params.p <= 1) {
                    this.params.total = data.data.total;
                    this.params.count = data.data.count;
                }
                this.order_list = this.order_list.concat(data.data.list);
                if (!this.order_list.length > 0) {
                    this.empty = true;
                }
                this.$store.dispatch('toggleLoading',{show:false});
            }, (response) => {
                this.$store.dispatch('toggleLoading',{show:false});
            })
        }
    }
};
</script>
