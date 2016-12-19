<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-list {
    min-height: 100%;
    padding-bottom: pxTorem(22);
    background-color: $gray-light;
}
</style>
<template>
<div class='order-list'>
    <ul>
        <router-link v-for='order in order_list' :to='{name:"order_detail",query:{order_id:parseInt(order.id)}}' tag='li'>
            <v-order :img='order.product_pic' :id='order.orderid' :integral='parseInt(order.integral)' :name='order.product'> </v-order>
        </router-link>
    </ul>
    <v-empty v-if='empty'></v-empty>
    <v-back-top></v-back-top>
</div>
</template>
<script>
import utils from 'libs/utils.js'
import vOrder from 'components/order/v_order.vue'
import vEmpty from 'components/order/v_empty.vue'
import vBackTop from 'components/v_back_top.vue'
export default {
    name: 'order_list',
    components: {
        vOrder,
        vEmpty,
        vBackTop
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener('scroll', this.getScrollData);
        next();
    },
    data() {
        return {
            order_list: [],
            params: {
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID
            },
            empty: '',
            scroll: false,
            loading: false
        }
    },
    mounted() {
        this.getOrderList();
        window.addEventListener('scroll', this.getScrollData);
    },
    methods: {
        getScrollData() {
            var self = this;
            this.scroll = true;
                if (self.scroll && utils.touchBottom() && self.params.p < self.params.total && !self.loading) {
                    self.params.p++;
                    self.scroll = false;
                    self.loading = true;
                    self.getOrderList(function() {
                        self.loading = false;
                    });
                }

        },
        getOrderList(callback) {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/order_list/${APP.USER_ID}`, this.params).then((response) => {
                let data = response.data;
                this.$store.dispatch('toggleLoading');
                if (callback) {
                    callback();
                }
                this.params.total = data.data.total;
                this.order_list = this.order_list.concat(data.data.list);
                if (!this.order_list.length > 0) {
                    this.empty = true;
                }
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            })
        }
    }
};
</script>
