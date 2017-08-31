<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .lottery {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .header {
        height: pxTorem(492);
        background: #f1f1f1;
        color: #303030;
        text-align: center;
        overflow: hidden;
    }

    .circle {
        position: absolute;
        left: 50%;
        top: -70%;
        transform: translateX(-50%);
        width: pxTorem(1200);
        height: pxTorem(1000);
        background: #d95940;
        border-radius: 50%;
        z-index: 0;
    }

    .avater {
        position: relative;
        border-radius: pxTorem(15);
        width: pxTorem(126);
        height: pxTorem(126);
        margin: pxTorem(60) auto pxTorem(10) auto;
        overflow: hidden;
        border: pxTorem(3) solid $white;
    }

    .avater+h1 {
        padding-bottom: pxTorem(10);
    }

    .money {
        padding-right: pxTorem(15);
        font-size: pxTorem(86);
    }

    .notice {
        position: absolute;
        left: 50%;
        bottom: pxTorem(435);
        transform: translateX(-50%);
        color: #d95940;
        text-align: center;
    }

    .button {
        @include active(#ff9900, 5%);
        position: absolute;
        left: 50%;
        bottom: pxTorem(230);
        width: pxTorem(220);
        height: pxTorem(95);
        line-height: pxTorem(95);
        text-align: center;
        margin-left: pxTorem(-110);
        color: $white;
        background: #ff9900;
        border-radius: pxTorem(10);
        font-size: pxTorem(36);
        box-shadow: 0 pxTorem(5) 0 rgba(0, 0, 0, .2);
    }
</style>

<template>
    <div class='lottery'>
        <header class='header'>
            <div class='circle'></div>
            <div class='avater'>
                <img class='img-responsive' :src='user.headimg'>
            </div>
            <h1><strong>剿灭劣V类 争做西湖环保卫士</strong></h1>
            <h4>恭喜你完成挑战，成为西湖环保<br>卫士！小小奖励，以示敬意~</h4>
            <strong class='money'>23.00</strong>元
        </header>
        <h1 class='notice'>
            红包已发放<br>查看服务通知即可领取
        </h1>
        <div class='button' @click='receive'>
            前往领取
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            receive(){
                alert('恭喜你获得1毛钱');
            }
        }
    }
</script>