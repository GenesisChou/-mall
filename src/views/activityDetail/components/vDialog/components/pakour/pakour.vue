<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .pakour {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-543/2);
        margin-top: pxTorem(-601/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(543);
            height: pxTorem(601);
            overflow: hidden;
            background: url('./images/pakourBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left: 50%;
            bottom: 30.7%;
            width: pxTorem(217);
            height: pxTorem(217);
            transform: translateX(-50%);
        }
        .message {
            position: absolute;
            left: 50%;
            bottom: 18%;
            width: 88%;
            height: pxTorem(50);
            line-height: pxTorem(50);
            font-size: pxTorem(34);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: $white;
        }
        .score {
            position: absolute;
            left: 42%;
            top: 12%;
            color: $white;
            font-size: pxTorem(34);
            span {
                padding: 0 pxTorem(8);
                font-size: pxTorem(66);
                color: #fffa72;
            }
        }

        .operation {
            position: absolute;
            left: 7%;
            bottom: 4.5%;
            width: pxTorem(205);
            height: pxTorem(64);
            //  background:blue;
            &:last-child {
                left: auto;
                right: 9%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='pakour'>
            <div class='content'>
                <div class='score'>你跑了<span>{{dialog.score}}</span>分</div>
                <p class='message'>{{dialog.msg}}</p>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'pakour',
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