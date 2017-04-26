<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .gold {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-421/2);
        margin-top: pxTorem(-482/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(421);
            height: pxTorem(482);
            overflow: hidden;
            background: url('./images/goldBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left:50%;
            bottom:26%;
            width: pxTorem(186);
            height: pxTorem(186);
            transform:translateX(-50%);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            top: 21%;
            width:90%; 
            height: pxTorem(44);
            line-height: pxTorem(44);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: $white;
        }
        .score {
            position: absolute;
            left: 50%;
            top: 8.5%;
            color: #ffe035;
            font-size: pxTorem(36);
            font-weight: 500;
        }

        .operation {
            position: absolute;
            left: 11%;
            bottom: 7%;
            width: pxTorem(155);
            height: pxTorem(64);
            // background-color:blue;
            &:last-child {
                left: auto;
                right: 9%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='gold'>
            <div class='content'>
                <span class='score'>{{dialog.score}}</span>
                <h3 class='message'>{{dialog.msg}}</h3>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'gold',
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