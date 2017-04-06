<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .circle {
        position: fixed;
        top: pxTorem(270);
        z-index: 6;
        width: pxTorem(750);
        height: pxTorem(675);
        background: url('./images/circleBackground.png') no-repeat;
        background-size: 100% 100%;

        .product {
            position: absolute;
            left: pxTorem(170);
            top: pxTorem(278);
            width: pxTorem(410);
            height: pxTorem(220);
        }
        .message {
            position: absolute;
            left: 50%;
            bottom: pxTorem(112);
            width: pxTorem(420);
            height: pxTorem(42);
            line-height: pxTorem(42);
            font-weight: 500;
            margin-left: pxTorem(-210);
            color: $white;
            overflow: hidden;
            text-align: center;
            font-size: pxTorem(29);
        }

        .close {
            position: absolute;
            right: pxTorem(30);
            top: pxTorem(-253);
            width: pxTorem(100);
            height: pxTorem(100);
            background: url('./images/close.png') no-repeat;
            background-size: pxTorem(50) pxTorem(50);
            background-position: center;
        }

        .operation {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: pxTorem(536);
            height: pxTorem(94);
            margin-left: pxTorem(-536/2);
        }
        .rope {
            position: absolute;
            left: 50%;
            top: pxTorem(-480);
            width: pxTorem(8);
            height: pxTorem(515);
            margin-left: pxTorem(-4);
            background-color: #bc0225;
        }

        .money {
            position: absolute;
            left: 50%;
            display: flex;
            width: pxTorem(557);
            height: pxTorem(233);
            margin-left: pxTorem(-557/2);
            .money-left,
            .money-right {
                width: 50%;
                height: 100%;
                background: url('./images/circleMoney.png') no-repeat;
                background-size: pxTorem(557) pxTorem(233);
            }
            .money-right {
                background-position-x: pxTorem(-557/2);
            }
        }
    }


    .left-enter-active {
        transform: scale(1);
        transition: .7s;
        transform-origin: right bottom;
    }

    .left-enter {
        transform: scale(.2);
    }

    .right-enter-active {
        @extend .left-enter-active;
        transform-origin: left bottom;
    }

    .right-enter {
        @extend .left-enter;
    }


    .drop-enter-active {
        top: pxTorem(270);
        transition: .5s cubic-bezier(0.5, 1, 0.5, 1.1);
    }

    .drop-enter {
        top: pxTorem(-675);
    }
</style>
<template>
    <transition name='drop'>
        <div v-show='show' class='circle'>
            <div class='rope'>
            </div>
            <div class='money'>
                <transition name='left'>
                    <div v-show='money_show' class='money-left'></div>
                </transition>
                <transition name='right'>
                    <div v-show='money_show' class='money-right'></div>
                </transition>
            </div>
            <div class='close' @click='close'></div>
            <img class='product' :src='dialog.img'>
            <h4 class='message'>{{dialog.msg}}</h4>
            <div class='operation' @click='func'></div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'money',
        props: {
            dialog: Object,
            close: Function,
            func: Function,
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                money_show: false
            };
        },
        mounted() {
            if (this.show) {
                setTimeout(() => {
                    this.money_show = true;
                }, 500);
            }
        }
    };
</script>