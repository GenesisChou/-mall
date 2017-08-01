<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-text {
        display: flex;
        margin-bottom: pxTorem(13);
        >div {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: pxTorem(82);
            color: #666666;
            background: $white;
            &:nth-child(1){
                border-right: 1px solid #f2f3f4;
            }
        }
        .integral {
            font-size: pxTorem(30);
            color: #ff5000;
            margin-left: pxTorem(15);
        }
        .icon-integral {
            width: pxTorem(36);
            height: pxTorem(30);
            margin-right: pxTorem(12);
        }
        .icon-records {
            width: pxTorem(32);
            height: pxTorem(32);
            margin-right: pxTorem(12);
        }
    }
</style>
<template>
    <div class='v-text'>
        <div>
            <img class='icon-integral' src='./images/integral.png'>我的积分 <span class='integral'>{{user.integral>>0}}</span>
        </div>
        <router-link :to='{name:"order_list"}' tag='div'>
            <img class='icon-records' src='./images/records.png'>兑换记录
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'vText',
        props: {
            layout: Object
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        }

    };
</script>