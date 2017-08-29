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
            left: -56%;
            top: -64%;
            width: pxTorem(627);
            height: pxTorem(694);
        }
    }
</style>

<template>
    <div class='character'>
        <img class='wave' src='./images/wave.png'>
        <img class='net' src='./images/net.png'>
        <img class='ship' src='./images/ship.png'>
    </div>
</template>