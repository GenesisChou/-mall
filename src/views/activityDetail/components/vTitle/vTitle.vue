<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-title {
        position: relative;
        h2 {
            display: flex;
            justify-content: center;
            align-items: center;
            color: $white;
            font-size: pxTorem(34);
            img {
                width: pxTorem(34);
                height: pxTorem(35);
                margin-right: pxTorem(20);
            }
            .red {
                color: #fe7a6f;
            }
        }
        .line {
            position: absolute;
            top: 50%;
            width: pxTorem(218);
            height: pxTorem(3);
            transform: translateY(-50%);
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            &.left {
                left: pxTorem(27);
            }
            &.right {
                right: pxTorem(27);
            }
            &.red {
                background-color: #fe7a6f;
            }
            &.green {
                background-color: #78cc1e;
            }
            &.aquamarine {
                background-color: #2ba7a9;
            }
            &.blue {
                background-color: #29cfff;
            }
            &.navy {
                background-color: #399fae;
            }
            &.brown {
                background-color: #a26a01;
            }
            &.palaceblue {
                background-color: #1081e1;
            }
            &.emerald {
                background-color: #019a88;
            }
            &.army {
                background-color: #1d7233;
            }
            &.purple {
                background-color: #9901aa;
            }
            &.orange {
                background-color: #e76241;
            }
            &.yellow {
                background-color: #e8af00;
            }
        }
    }
</style>
<template>
    <div class='v-title'>
        <h2>
            <img v-if='textColor==="red"' src='./images/recommand_red.png'>
            <img v-else src='./images/recommand.png'>
            <span :class='textColor'>为您推荐</span>
        </h2>
        <div :class='["line","left",color]'></div>
        <div :class='["line","right",color]'></div>
    </div>
</template>
<script>
    export default {
        props: {
            color: String,
            textColor: String,
        },
    };
</script>