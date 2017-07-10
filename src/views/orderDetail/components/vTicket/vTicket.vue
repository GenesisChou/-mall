<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-ticket {
        margin-top: pxTorem(20);
        padding: pxTorem(20) 0;
        position: relative;
        height: pxTorem(177);
        background:url('./images/ticket.png') $white no-repeat center center;
        background-size: pxTorem(750) pxTorem(132);
        border-bottom: 1px solid #d3d4d6;
        span {
            position: absolute;
            top: 50%;
            left: 43%;
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