<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .reel {
        position: fixed;
        top: pxTorem(163);
        z-index: 6;
        .container {
            margin-top: pxTorem(-30);
            width: pxTorem(750);
            height: pxTorem(726);
            overflow: hidden;
        }
        .content {
            position: relative;
            width: 100%;
            height: 100%;
            background: url('./images/reelBackground.png') no-repeat;
            background-size: 100% 100%;
            transform: translateY(-100%);
            transition: .4s;
            &.active {
                transform: translateY(0);
            }
        }
        .decoration {
            display: flex;
            position: absolute;
            left: 50%;
            top: 0;
            width: pxTorem(650);
            height: pxTorem(240);
            margin-left: pxTorem(-650/2);
        }
        .decoration-left,
        .decoration-right {
            width: 50%;
            height: 100%;
            background: url('./images/reelDecoration.png') no-repeat;
            background-size: pxTorem(650) pxTorem(240);
        }
        .decoration-right {
            background-position-x: pxTorem(-650/2);
        }

        .head {
            width: pxTorem(741);
            height: pxTorem(67);
            margin: 0 auto;
            background: url('./images/reelHead.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left: pxTorem(126);
            top: pxTorem(282);
            width: pxTorem(494);
            height: pxTorem(234);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            top: pxTorem(150);
            width: pxTorem(590);
            height: pxTorem(85);
            margin-left: pxTorem(-590/2);
            color: $white;
            overflow: hidden;
            text-align: center;
            font-size: pxTorem(28);
        }

        .close {
            position: absolute;
            right: pxTorem(10);
            top: pxTorem(-140);
            width: pxTorem(100);
            height: pxTorem(100);
            background: url('./images/close.png') no-repeat;
            background-size: pxTorem(50) pxTorem(50);
            background-position: center;
        }

        .operation {
            position: absolute;
            left: 50%;
            bottom: pxTorem(60);
            width: pxTorem(350);
            height: pxTorem(110);
            margin-left: pxTorem(-350/2);
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
</style>
<template>
    <div v-show='show' class='reel'>
        <div class='close' @click='close'></div>
        <div class='head'></div>
        <div class='container'>
            <div :class='["content",{active:content_show}]'>
                <div class='decoration'>
                    <transition name='left'>
                        <div v-show='decoration_show' class='decoration-left'></div>
                    </transition>
                    <transition name='right'>
                        <div v-show='decoration_show' class='decoration-right'></div>
                    </transition>
                </div>
                <div class='message'>
                    恭喜你获得了<br> {{dialog.msg}}
                </div>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'reel',
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
                content_show: false,
                decoration_show: false
            };
        },
        mounted() {
            if (this.show) {
                setTimeout(() => {
                    this.content_show = true;
                }, 50);
                setTimeout(() => {
                    this.decoration_show = true;
                }, 300);
            }
        }
    };
</script>