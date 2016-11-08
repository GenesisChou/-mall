<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-order {
    margin-bottom: pxTorem(22);
    border-top: 1px solid $gray-light;
    border-bottom: 1px solid $gray-light;
    background: $white;
    .order-head {
        font-size: pxTorem(24);
        line-height: pxTorem(66);
        padding: 0 pxTorem(30);
    }
    .order-body {
        padding: pxTorem(26) 0;
        margin:0 pxTorem(30);
        overflow: hidden;
        border-top: 1px solid $gray-light;
        /*border-bottom: 1px solid $gray-light;*/
        .img {
            width: pxTorem(160);
            height: pxTorem(120);
        }
        .detail {
            margin-left: pxTorem(30);
            .text-gray {
                margin-top: pxTorem(10);
            }
        }
    }
}
</style>
<template>
    <div class='v-order'>
        <header class='order-head'>
            订单号：{{order.orderid}}
        </header>
        <section class='order-body flex'>
            <img class='img ' :src='order.product_pic' />
            <div class='detail flex-item'>
                <p class='text-huge'>{{order.product}}</p>
                <p class='text-large text-gray'> {{parseInt(order.integral)}}积分
                    <span class='pull-right'>x1</span>
                </p>
            </div>
        </section>
        <slot > </slot>
    </div>
</template>
<script>
export default {
    props: {
        order: {
            type: Object,
            default: function() {
                return {};
            }
        }

    }
}
</script>
