<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .common {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 6;
    }

    .red-packet {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(527);
        background: url('./images/redPacket.png') no-repeat;
        background-size: 100% 100%;
        .message {
            position: absolute;
            top: pxTorem(210);
            width: 100%;
            height: pxTorem(40);
            padding: 0 pxTorem(60);
            overflow: hidden;
            text-align: center;
            color: $white;
            font-weight: 500;
        }
        .product {
            position: absolute;
            left: 50%;
            top: pxTorem(310);
            width: pxTorem(194);
            height: pxTorem(194);
            margin-left: pxTorem(-194/2);
            padding: pxTorem(12);
            border-radius: pxTorem(10);
            transition: 1s;
            transform-origin: center bottom;
            background-color: $white;
            img {
                width: 100%;
                height: 100%;
                border-radius: pxTorem(10);
            }
        }
        .product.active {
            top: pxTorem(150);
            transform: scale(1.8);
        }
    }

    .main {
        position: relative;
        // top: pxTorem(-30);
        top:0;
        width: pxTorem(634);
        padding-bottom: pxTorem(30);
        background-color: $white;
        border-radius: pxTorem(10);
        .close {
            @include flex-center;
            position: absolute;
            right: pxTorem(-30);
            top: pxTorem(-30);
            width: pxTorem(80);
            height: pxTorem(80);
            background-color: $white;
            border-radius: 50%;
        }
        .iconfont {
            font-size: pxTorem(80);
            color: $orange;
            &:active {
                color: darken($orange, 10%);
            }
        }
        h1 {
            text-align: center;
            padding-top: pxTorem(30);
            padding-bottom: pxTorem(20);
        }
        .container {
            @include flex-center;
            width: pxTorem(632);
            height: pxTorem(358);
            // background-color: #f1f1f1;
            img {
                width: pxTorem(318);
                height: pxTorem(318);
                border-radius: pxTorem(10);
            }
        }
        h4 {
            color: $orange;
            padding: pxTorem(20) pxTorem(36);
        }
        .operation {
            @include flex-center;
            width: pxTorem(563);
            height: pxTorem(88);
            margin: pxTorem(30) auto;
            font-size: pxTorem(38);
        }
    }

   </style>
<template>
    <div v-show='show' class='common'>
        <transition name='enlarge'>
            <div v-if='!content_show&&redpacket_show' class='red-packet'>
                <h4 class='message'>{{dialog.msg}}</h4>
                <div :class='["product",{active:enlarge}]'>
                    <img :src='dialog.img'>
                </div>

            </div>
        </transition>
        <main v-if='content_show' class='main'>
            <div class='close' @click='close'>
                <i class='iconfont icon-close-circle'></i>
            </div>
            <h1>{{dialog.msg}}</h1>
            <div class='container'>
                <img :src='dialog.img'>
            </div>
            <h4>{{dialog.msg}}</h4>
            <div class='operation btn btn-orange' @click='func'>查看使用方法</div>
        </main>
    </div>
</template>
<script>
    export default {
        name: 'common',
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
                redpacket_show: false,
                content_show: false,
                enlarge: false
            };
        },
        mounted() {
            if (this.show) {
                setTimeout(() => {
                    this.redpacket_show = true;
                    setTimeout(() => {
                        this.enlarge = true;
                        setTimeout(() => {
                            this.redpacket_show = false;
                            setTimeout(() => {
                                this.content_show = true;
                            }, 50);
                        }, 1350);
                    }, 600);
                }, 50);
            }
        }
    };
</script>