<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-ticket {
        margin-top: pxTorem(20);
        padding: pxTorem(20) 0;
        position: relative;
        height: pxTorem(177);
        background-image: url('./images/ticket.png');
        background-size: pxTorem(748) pxTorem(167);
        background-position: 0 pxTorem(10);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        span {
            position: absolute;
            top: 50%;
            left: 40%;
            color: #646565;
            font-size: pxTorem(30);
            transform: translateY(-50%);
        }
    }
</style>
<template>
    <div  class='v-ticket'>
        <span v-if='type==1'> {{orderDetail.ticket_id}} </span>
        <span v-if='type==6'> {{productDetail.ticket_id}} </span>
    </div>
</template>
<script>
    export default {
        name: 'vTicket',
        props: {
            type: Number,
            orderDetail: Object,
            productDetail: Object
        }
    }
</script>