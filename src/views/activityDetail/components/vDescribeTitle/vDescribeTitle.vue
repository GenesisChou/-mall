<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-describe-title {
        width: pxTorem(214);
        height: pxTorem(58);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #ffffd0;
        font-size: pxTorem(32);
        font-weight: 500;
        padding-left: pxTorem(18);
        padding-top: pxTorem(5);
        &.red {
            background-image: url('./images/redTitle.png');
        }
        &.green {
            background-image: url('./images/greenTitle.png');
        }
        &.blue {
            color: #fc4c60;
            background-image: url('./images/blueTitle.png');
        }
        &.navy {
            color: #007f96;
            background-image: url('./images/blueTitle.png');
        }
        &.aquamarine {
            background-image: url('./images/aquamarineTitle.png');
        }
        &.brown {
            background-image: url('./images/brownTitle.png');
        }
        &.palaceblue {
            color: $white;
            background-image: url('./images/palaceblueTitle.png');
        }
        &.emerald {
            background-image: url('./images/emeraldTitle.png');
        }
        &.army {
            color: $white;
            background-image: url('./images/armyTitle.png');
        }
        &.purple {
            color: #7a1498;
            background-image: url('./images/purpleTitle.png');
        }
        &.orange {
            color: #fef9d4;
            background-image: url('./images/orangeTitle.png');
        }
        &.yellow {
            background-image: url('./images/yellowTitle.png');
        }
    }
</style>
<template>
    <div :class='["v-describe-title",color]'>
        {{text}}
    </div>
</template>
<script>
    export default {
        props: {
            text: String,
            color: String
        }
    };
</script>