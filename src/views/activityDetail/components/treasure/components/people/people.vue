<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .ship {
        position: absolute;
        left: pxTorem(-80);
        bottom: pxTorem(-110);
        width: pxTorem(379);
        height: pxTorem(264);
        z-index: 1;
    }

    .people {
        position: absolute;
        left: 0;
        bottom: pxTorem(-98);
        width: pxTorem(187);
        height: pxTorem(319);
        z-index: 3;
    }

    @keyframes ship {
        0% {
            transform: translateY(0%);
        }
        50% {
            transform: translateY(-3%);
        }
        100% {
            transform: translateY(0%);
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
        &:before {
            content: '';
            position: absolute;
            right: pxTorem(-125);
            top: pxTorem(-28);
            width: pxTorem(125);
            height: pxTorem(129);
            background-image: url('./images/net.png');
            background-size: 100% 100%;
            z-index: 1;
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
            z-index: 1;
        }
        &.ready {
            animation: ready 1.5s linear infinite;
        }
        &.one {
            animation: one 1.8s ease-in;
        }
        &.two {
            width: pxTorem(230);
            animation: two 1.8s ease-in;
        }
        &.stop {
            .chest {
                display: block;
            }
        }
        .chest {
            display: none;
            position: absolute;
            right: pxTorem(-130);
            top: pxTorem(-35);
            width: pxTorem(143);
            height: pxTorem(136);
            transform: scale(0.8) rotate(-20deg);
            z-index: 0;
        }
    }

    @keyframes ready {
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

    @keyframes one {
        0% {
            transform: rotateX(180deg);
        }
        50% {
            transform: rotateX(180deg) rotate(-80deg);
        }
        100% {
            transform: rotateX(180deg) rotate(-80deg);
        }
    }

    @keyframes two {
        0% {
            transform: rotateX(180deg);
        }
        50% {
            transform: rotateX(180deg) rotate(-100deg);
        }
        100% {
            transform: rotateX(180deg) rotate(-100deg);
        }
    }
</style>
<template>
    <div class='v-people'>
        <img class='ship' src='./images/ship.png'>
        <img class='people' src='./images/treasurePeople.png'>
        <div :class='["net",type,{stop:state==="stop"}]'>
            <img class='chest' src='./images/chestInNet.png'>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vPeople',
        props: {
            action: String,
            state: String
        },
        data() {
            return {
                type: 'ready',
            };
        },
        watch: {
            action(value) {
                this.type = value || 'ready';
            }
        }
    };
</script>