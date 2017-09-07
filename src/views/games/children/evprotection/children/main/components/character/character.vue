<style lang='scss' scoped>
    @import '../../../../../../../../assets/scss/variable.scss';
    .character {
        position: absolute;
        left: 50%;
        bottom: pxTorem(25);
        width: pxTorem(238);
        height: pxTorem(408);
        margin-left: pxTorem(-238/2);
        .ship {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .net {
            position: absolute;
            left: -56%;
            top: -41%;
            width: pxTorem(223);
            height: pxTorem(244);
        }
        .wave {
            position: absolute;
            &.type-1 {
                left: -55%;
                top: -10%;
                width: pxTorem(530);
                height: pxTorem(474);
                background: url('./images/wave1.png') no-repeat 100% 100%/100% 100%;
            }
            &.type-2 {
                left: -65%;
                top: -10%;
                width: pxTorem(560);
                height: pxTorem(510);
                background: url('./images/wave2.png') no-repeat 100% 100%/100% 100%;
            }
        }
    }
</style>

<template>
    <div class='character'>
        <div :class='["wave","type-"+type]'></div>
        <img class='net' src='./images/net.png'>
        <img class='ship' src='./images/ship.png'>
    </div>
</template>
<script>
    export default {
        props: {
            leftTime: Number,
            status: String
        },
        data() {
            return {
                type: 1,
            }
        },
        created() {
            setInterval(() => {
                this.type = this.type === 1 ? 2 : 1;
            }, 800);
        }
    }
</script>