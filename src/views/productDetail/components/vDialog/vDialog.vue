<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .container {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
    }

    .v-dialog-content {
        width: pxTorem(600);
        font-size: pxTorem(28);
        text-align: center;
        padding: pxTorem(20);
        background-color: $white;
        border-radius: pxTorem(10);
        background-color: $white;
        .pic {
            width: pxTorem(262);
            height: pxTorem(262);
        }
        .faliure{
            width: pxTorem(306);
            height: pxTorem(265);
        }
        .msg {
            padding: pxTorem(40) 0;
            margin: auto;
            font-size: pxTorem(34);
            text-align: center;
            width: pxTorem(500);
            color: #3d4244;
        }
        .btn {
            @include active($orange,5%);
            width: pxTorem(300);
            height: pxTorem(80);
            margin: 0 auto;
            margin-bottom: pxTorem(30);
            line-height: pxTorem(80);
            font-size: pxTorem(36);
            background-color: $orange;
            color: $white;
        }
        .btn.faliure {
            @include active(#ff9817,5%);
            background-color: #ff9817;
        }

        .close {
            width: pxTorem(80);
            height: pxTorem(80);
            text-align: center;
            line-height: pxTorem(80);
            position: absolute;
            right: pxTorem(-26);
            top: pxTorem(-26);
            font-size: pxTorem(70);
            color: $orange;
        }
    }

    .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .7);
        z-index: 5;
    }
</style>
<template>
    <div class='v-dialog'>
        <div v-show='show' class='bg-cover'></div>
        <div class='container'>
            <transition name='enlarge'>
                <div v-show='show' class='v-dialog-content'>
                    <img v-if='type==="success"' class='pic' :src='dialog.img'>
                    <img v-else class='faliure' src='./images/faliure.png'>
                    <h3 class='msg'>{{dialog.msg}}</h3>
                    <div :class='["btn",{faliure:type==="faliure"}]' @click='func'>{{dialog.btn_text}}</div>
                    <i class='close iconfont icon-cancel' @click='close'></i>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            dialog: {
                type: Object,
                default () {
                    return {};
                }
            },
            toggleDialog: Function,
            show: Boolean,
        },
        watch: {
            show(value) {
                utils.toggleTouchMove(value);
            }
        },
        computed: {
            type() {
                return this.dialog.type || 'faliure';
            },
            callback() {
                return this.dialog.callback;
            },
            callback_close() {
                return this.dialog.callback_close;
            },
        },
        methods: {
            func() {
                if (this.callback) {
                    this.callback();
                }
                this.toggleDialog();
            },
            close() {
                if (this.callback_close) {
                    this.callback_close();
                } else if (this.type === 'faliure' && this.callback) {
                    this.callback();
                }
                this.toggleDialog();
            }
        }
    };
</script>