<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .dice {
        position: fixed;
        top: pxTorem(155);
        z-index: 6;
        width: pxTorem(750);
        height: pxTorem(851);
        background: url('./images/diceBackground.png') no-repeat;
        background-size: 100% 100%;

        .product {
            position: absolute;
            left: 50%;
            top: pxTorem(365);
            width: pxTorem(240);
            height: pxTorem(240);
            margin-left: pxTorem(-120);
        }
        .message {
            // display:flex;
            width: pxTorem(615);
            height: pxTorem(100);
            line-height: pxTorem(50);
            margin: pxTorem(220) auto 0 auto;
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
            bottom: pxTorem(84);
            width: pxTorem(360);
            height: pxTorem(112);
            margin-left: pxTorem(-360/2);
        }
    }



  </style>
<template>
    <transition name='enlarge'>
        <div v-show='show' class='dice'>
            <div class='close' @click='close'></div>
            <div class='message'>
                恭喜你获得了<br> {{dialog.msg}}
            </div>
            <img class='product' :src='dialog.img'>
            <!--<h4 class='message'>{{dialog.msg}}</h4>-->
            <div class='operation' @click='func'></div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'dice',
        props: {
            dialog: Object,
            close: Function,
            func: Function,
            show: {
                type: Boolean,
                default: false
            }
        },
    };
</script>