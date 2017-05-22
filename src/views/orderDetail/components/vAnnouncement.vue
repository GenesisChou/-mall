<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-announcement {
        padding: 0 pxTorem(30);
        margin-top: pxTorem(20);
        background-color: $white;
        text-align: justify;
        border-bottom: 1px solid #d3d4d6;
        h3 {
            line-height: pxTorem(76);
            color: #646565;
            border-bottom: 1px solid $gray-light;
        }
        .content {
            padding: pxTorem(20) 0;
        }
    }
</style>
<template>
    <section class='v-announcement'>
        <h3>重要声明</h3>
        <div class='content'>
            <h5>1.除商品本身不能正常兑换外，商品一经兑换，积分概不退还，请用户在兑换前仔细阅读使用规则、使用说明、有效期等重要信息； </h5>
            <h5>2.除活动流程出现异常外，奖品一经发放，参与活动积分概不退还，请用户在参与活动前仔细阅读活动规则、活动说明等重要信息； </h5>
            <h5>3.通过非法途径获得积分后进行的正常兑换（参与活动）行为，或不按照商品使用规则进行兑换，商家有权不提供服务； </h5>
            <h5>4.凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</h5>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'vAnnouncement',
    };
</script>