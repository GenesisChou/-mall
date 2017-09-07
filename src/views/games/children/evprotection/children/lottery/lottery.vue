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
        top: pxTorem(-880);
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
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 50%;
        width: pxTorem(353);
        height: pxTorem(120);
        line-height: pxTorem(50);
        text-align: center;
        bottom: pxTorem(230);
        transform: translateX(-50%);
        color: $white;
        background: #ff9900;
        border-radius: pxTorem(10);
        font-size: pxTorem(36);
        box-shadow: 0 pxTorem(5) 0 rgba(0, 0, 0, .2);
    }

    .failed {
        color: #d95940;
    }

    .share-notice {
        position: absolute;
        top: pxTorem(-310);
        left: 50%;
        transform: translateX(-50%);
        width: pxTorem(617);
        height: pxTorem(108);
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
            <h4>恭喜你完成挑战，成为西湖环保<br>卫士！<span v-if='type===1'>小小奖励，以示敬意~</span><span class='failed' v-else>暂未获奖，再接再厉~</span></h4>
            <p v-if='type===1'>
                <strong class='money'>{{money}}</strong>元
            </p>
        </header>
        <h1 v-if='type===1' class='notice'>
            红包已发放<br>查看服务通知即可领取
        </h1>
        <div class='button' @click='share_show=true'>
            分享后有机会<br>获得额外抽奖机会
        </div>
        <v-share-guide :show.sync='share_show'>
            <img class='share-notice' src='../images/shareNotice.png'>
        </v-share-guide>
    </div>
</template>
<script>
    import vShareGuide from 'components/vShareGuide'
    export default {
        name: 'lottery',
        components: {
            vShareGuide
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        data() {
            return {
                type: '',
                money: '',
                share_show: false
            }
        },
        created() {
            this.type = parseInt(this.$route.query.type);
            this.money = this.$route.query.money;
        },
    }
</script>