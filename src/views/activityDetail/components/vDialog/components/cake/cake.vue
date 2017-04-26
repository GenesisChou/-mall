<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .cake {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-480/2);
        margin-top: pxTorem(-608/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(480);
            height: pxTorem(608);
            overflow: hidden;
            background: url('./images/cakeBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left:50%;
            bottom:23.2%;
            width: pxTorem(215);
            height: pxTorem(215);
            transform:translateX(-50%);
        }
        .message {
            position: absolute;
            left: 50%;
            top: 30%;
            width:80%; 
            height: pxTorem(38);
            line-height: pxTorem(38);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: #ee5917;
        }
        .score {
            @include flex-center;
            position: absolute;
            left: 50%;
            top: 19%;
            min-width:pxTorem(108);
            height:pxTorem(60);
            padding:0 pxTorem(20);
            color: #442700;
            font-size: pxTorem(40);
            font-weight: 500;
            transform:translateX(-50%);
            background-color:#f9e900;
            border:1px solid #e4ba3c;
            border-radius:pxTorem(20);
        }

        .operation {
            position: absolute;
            left: 8%;
            bottom: 7%;
            width: pxTorem(180);
            height: pxTorem(64);
            &:last-child {
                left: auto;
                right: 6%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='cake'>
            <div class='content'>
                <span class='score'>{{dialog.score}}</span>
                <h5 class='message'>{{dialog.msg}}</h5>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'cake',
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