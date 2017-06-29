<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .notice {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: pxTorem(80);
        padding-left: pxTorem(24);
        line-height: pxTorem(80);
        background-color: rgba(0, 0, 0, .7);
        font-size: pxTorem(32);
        color: $white;
        z-index: 4;
        span {
            position: relative;
        }
        img {
            position: absolute;
            right: pxTorem(-70);
            top: 0;
            width: pxTorem(63);
            height: pxTorem(22);
            animation: drift infinite 1.5s linear;
        }
        .arrows {
            position: absolute;
            right: pxTorem(20);
            top: 50%;
            transform: translateY(-50%);
            animation: shaking infinite 1.5s linear;
        }
        .icon-arrows-right {
            font-size: bold;
            font-size: pxTorem(36);
            &:last-child {
                margin-left: pxTorem(-30);
                margin-right: 0;
            }
        }
    }

    @keyframes shaking {
        0% {
            right: pxTorem(20);
        }
        25% {
            right: pxTorem(10);
        }
        50% {

            right: pxTorem(20);
        }
        75% {
            right: pxTorem(30);
        }
        100% {
            right: pxTorem(20);
        }
    }


    @keyframes drift {
        0% {
            transform: translateY(0%);
        }
        25% {
            transform: translateY(-10%);
        }
        50% {
            transform: translateY(0%);
        }
        75% {
            transform: translateY(10%);
        }
        100% {
            transform: translateY(0%);
        }
    }
</style>
<template>
    <router-link :to='{name:"qr_code"}' tag='div' class='notice'>
        <span>
            {{title}}
            <img src='./images/come.png' >
        </span>
        <div class='arrows'>
            <i class='iconfont icon-arrows-right'></i>
            <i class='iconfont icon-arrows-right'></i>
        </div>
    </router-link>
</template>
<script>
    export default {
        name: 'vNotice',
        computed: {
            title() {
                return this.$store.state.qr_code.qr_code_tips;
            }
        }
    };
</script>