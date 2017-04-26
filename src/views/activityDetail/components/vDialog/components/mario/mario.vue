<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .mario {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-563/2);
        margin-top: pxTorem(-704/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(563);
            height: pxTorem(704);
            overflow: hidden;
            background: url('./images/marioBackground.png') no-repeat;
            background-size: 100% 100%;
            border-radius:pxTorem(10);
        }
        .product {
            position: absolute;
            left:50%;
            top:36%;
            width: pxTorem(206);
            height: pxTorem(206);
            transform:translateX(-50%);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            bottom: 24%;
            width: pxTorem(480);
            height: pxTorem(34);
            line-height: pxTorem(34);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: #904c2e;
        }
        .score {
            position: absolute;
            left: 58%;
            top: 24.6%;
            color: #1fb9db;
            font-size: pxTorem(40);
            font-weight: 500;
        }

        .operation {
            position: absolute;
            left: 11%;
            bottom: 11%;
            width: pxTorem(200);
            height: pxTorem(64);
            &:last-child {
                left: auto;
                right: 10%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='mario'>
            <div class='content'>
                <span class='score'>{{dialog.score}}</span>
                <h4 class='message'>{{dialog.msg}}</h4>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'mario',
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
            }
        }
    };
</script>