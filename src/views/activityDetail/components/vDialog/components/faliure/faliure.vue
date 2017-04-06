<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .faliure {
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 6;
        width: pxTorem(574);
        height: pxTorem(553);
        margin-left: pxTorem(-574/2);
        margin-top: pxTorem(-553/2);
        background-color: #eb4a4a;
        border-radius: pxTorem(30);
        .close {
            float: right;
            width: pxTorem(50);
            height: pxTorem(50);
            background-image: url('./images/faliureClose.png');
            background-size: pxTorem(34) pxTorem(34);
            background-position: left bottom;
            background-repeat: no-repeat;
        }
        .message {
            width: 100%;
            height: pxTorem(66);
            line-height: pxTorem(66);
            padding: 0 pxTorem(15);
            overflow: hidden;
            font-size: pxTorem(38);
            text-align: center;
            font-weight: 500;
            color: #ffe433;
        }
        .circle {
            @include flex-center;
            width: pxTorem(230);
            height: pxTorem(230);
            margin: pxTorem(30) auto pxTorem(55);
            background: url('./images/faliure.png') no-repeat;
            background-size: 100% 100%;
        }
        .operation {
            display: block;
            width: pxTorem(180);
            height: pxTorem(59);
            margin: 0 auto;
            text-align: center;
            line-height: pxTorem(59);
            border-radius: pxTorem(10);
            background-color: #ffe433;
            color: #474747;
            font-size: pxTorem(34);
        }
    }

    .enlarge-enter-active {
        transform: scale(1);
        transform-origin: center center;
        transition: .2s;
    }

    .enlarge-enter {
        transform: scale(0.5); // top: pxTorem(-675);
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='faliure'>
            <div class='close' @click='close'></div>
            <h1 class='message '>{{dialog.msg||'谢谢参与'}}</h1>
            <div class='circle'></div>
            <div class='operation' @click='func'>{{dialog.btn_text||'关闭'}}</div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'faliure',
        props: {
            dialog: Object,
            close: Function,
            func: Function,
            show: {
                type: Boolean,
                default: false
            }
        }
    };
</script>