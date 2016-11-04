<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-detail {
    min-height: 100%;
    .v-order {
        border: 0;
    }
    .introduction {
        padding: pxTorem(20);
        border-bottom: 1px solid $gray-light;
    }
    .ticket {
        height: 1rem;
        line-height: 1rem;
        padding-left: pxTorem(20);
    }
}
.add-address{
    padding:pxTorem(20) pxTorem(75);
    .btn{
        font-size: pxTorem(30);
        height: pxTorem(80);
    }
}
</style>
<template>
    <div class='order-detail bg-base'>
        <v-order :order='order_detail'>
            <template v-if='order_detail.ticket_id'>
                <v-block-text text='优惠券码'></v-block-text>
                <div class='text-pink ticket'>{{order_detail.ticket_id}} </div>
            </template>
            <template v-if='product_detail.content_use'>
                <v-block-text text='使用说明'></v-block-text>
                <v-simditor>
                    <article class='introduction' v-html='product_detail.content_use'> </article>
                </v-simditor>
            </template>
        </v-order>
        <div class='add-address'>
            <button class='btn btn-red btn-block'>+请填写收货地址</button>
        </div>
    </div>
</template>
<script>
import vOrder from 'components/v_order.vue'
import vSimditor from 'components/v_simditor.vue'
import vBlockText from 'components/v_block_text.vue'
export default {

    name: 'order_detail',
    components: {
        vOrder,
        vSimditor,
        vBlockText
    },
    data() {
        return {
            order_id: '',
            order_detail: {},
            product_detail: {},
        };
    },
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.getOrderDetail();
    },
    methods: {
        getOrderDetail() {
            this.$http.post(`${APP.HOST}/order_detail/${this.order_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.order_detail = data.data;
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
                this.product_detail = data.data;
            }, (response) => {

            })
        }
    }
};
</script>
