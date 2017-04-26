<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .cat {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-640/2);
        margin-top: pxTorem(-640/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(640);
            height: pxTorem(640);
            overflow: hidden;
            background: url('./images/catBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left:50%;
            top:31.5%;
            width: pxTorem(206);
            height: pxTorem(206);
            transform:translateX(-50%);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            bottom: 25%;
            width:70%; 
            height: pxTorem(42);
            line-height: pxTorem(42);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: #904c2e;
        }
        .score {
            position: absolute;
            left: 50%;
            top: 19.5%;
            color: #010101;
            font-size: pxTorem(42);
            font-weight: 500;
            transform:translateX(-50%);
        }

        .operation {
            position: absolute;
            left: 18%;
            bottom: 12%;
            width: pxTorem(200);
            height: pxTorem(64);
            // background-color:blue;
            &:last-child {
                left: auto;
                right: 18%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='cat'>
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
        name: 'cat',
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