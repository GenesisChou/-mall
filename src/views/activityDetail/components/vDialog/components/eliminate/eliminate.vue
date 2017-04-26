<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .eliminate {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-456/2);
        margin-top: pxTorem(-692/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(456);
            height: pxTorem(692);
            overflow: hidden;
            background: url('./images/eliminateBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left: 50%;
            top: 47.2%;
            transform: translateX(-50%);
            width: pxTorem(162);
            height: pxTorem(162);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            bottom: 20%;
            width: pxTorem(380);
            height: pxTorem(38);
            line-height: pxTorem(38);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: #904c2e;
        }
        .score {
            position: absolute;
            left: 50%;
            top: 37.4%;
            color: $white;
            font-size: pxTorem(30);
            font-weight: 500;
            transform: translateX(-50%);
        }

        .operation {
            position: absolute;
            left: 5%;
            bottom: 4%;
            width: pxTorem(190);
            height: pxTorem(70);
            &:last-child {
                left: auto;
                right: 5%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='eliminate'>
            <!--<div class='close' @click='close'></div>-->
            <div class='content'>
                <span class='score'>{{dialog.score}}</span>
                <h5 class='message'>{{dialog.msg}}</h5>
                <img class='product' :src='dialog.img'>
                <div class='operation ' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'eliminate',
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