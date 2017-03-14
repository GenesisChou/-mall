<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .ship {
        position: absolute;
        left: pxTorem(-80);
        bottom: pxTorem(-110);
        width: pxTorem(379);
        height: pxTorem(264);
        z-index: 1;
        // -webkit-animation: ship 5s linear infinite;
    }
    
    .people {
        position: absolute;
        left: 0;
        bottom: pxTorem(-98);
        width: pxTorem(187);
        height: pxTorem(319);
        z-index: 3;
        // -webkit-animation: ship 5s linear infinite;
    }
    
    @-webkit-keyframes ship {
        0% {
            -webkit-transform: translateY(0%);
        }
        50% {
            -webkit-transform: translateY(-3%);
        }
        100% {
            -webkit-transform: translateY(0%);
        }
    }
    
    .net {
        position: absolute;
        left: pxTorem(123);
        bottom: pxTorem(32);
        width: pxTorem(400);
        height: pxTorem(5);
        background-color: #831a27;
        z-index: 3;
        transform-origin: left;
        -webkit-transform-origin: left;
        &:before {
            content: '';
            position: absolute;
            right: pxTorem(-125);
            top: pxTorem(-28);
            width: pxTorem(125);
            height: pxTorem(129);
            background-image: url('./images/net.png');
            background-size: 100% 100%;
        }
        &:after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            width: pxTorem(12);
            height: pxTorem(12);
            margin-top: pxTorem(-6);
            border-radius: 50%;
            background-color: #831a27;
        }
        &.ready {
            -webkit-animation: ready 1.5s linear infinite;
        }
        &.one {
            -webkit-animation: one 1s ease-in forwards;
        }
        &.two {
            width: pxTorem(230);
            // -webkit-transform: rotateX(180deg) rotate(-60deg);
            -webkit-animation: two 1s ease-in forwards;
        }
    }
    
    @-webkit-keyframes ready {
        0% {
            width: pxTorem(200);
        }
        50% {
            width: pxTorem(400);
        }
        100% {
            width: pxTorem(200);
        }
    }
    
    @-webkit-keyframes one {
        0% {
            -webkit-transform: rotateX(180deg);
        }
        100% {
            -webkit-transform: rotateX(180deg) rotate(-80deg);
        }
    }
    
    @-webkit-keyframes two {
        0% {
            -webkit-transform: rotateX(180deg);
        }
        100% {
            -webkit-transform: rotateX(180deg) rotate(-100deg);
        }
    }
</style>
<template>
    <div class='v-people'>
        <img class='ship' src='./images/ship.png'>
        <img class='people' src='./images/treasurePeople.png'>
        <div :class='["net",type]'></div>
    </div>
</template>
<script>
    export default {
        name: 'vPeople',
        props: {
            action: String
        },
        data() {
            return {
                type: 'ready'
            }
        },
        watch: {
            action(value) {
                this.type = value || 'ready';
            }
        }
    }
</script>