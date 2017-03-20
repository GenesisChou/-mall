<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-modal {
        .bg-cover {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 5;
        }
        .content {
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 6
        }
    }
    
    .v-dialog-content {
        width: pxTorem(574);
        height: pxTorem(553);
        margin-left:pxTorem(-574/2);
        margin-top:pxTorem(-553/2);
        background-color: #eb4a4a;
        border-radius: pxTorem(30);
        .close {
            float: right;
            width: pxTorem(50);
            height: pxTorem(50);
            background-image: url('./images/close.png');
            background-size: pxTorem(34) pxTorem(34);
            background-position: left bottom;
            background-repeat: no-repeat;
        }
        .message {
            @include text-ellipsis;
            width: 100%;
            padding: 0 pxTorem(15);
            height: pxTorem(66);
            line-height: pxTorem(66);
            font-size: pxTorem(38);
            text-align: center;
            font-weight:500;
            color: #ffe433;
        }
        .circle {
            @include flex-center;
            width: pxTorem(230);
            height: pxTorem(230);
            margin: pxTorem(30) auto pxTorem(55);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.faliure {
                background-image: url('./images/faliure.png');
            }
            &.success {
                background-image: url('./images/success.png');
            }
            .pic {
                width: pxTorem(170);
                height: pxTorem(119);
            }
        }
        a {
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
</style>
<template>
    <div class='v-modal'>
        <div v-show='value' class='bg-cover'></div>
        <transition name='scale'>
            <div v-show='value' class='content '>
                <div class='v-dialog-content '>
                    <div class='close' @click='close'></div>
                    <h1 class='message '>{{msg}}</h1>
                    <div :class='["circle",type]'>
                        <img v-if='type=="success"' class='pic' :src='img'>
                    </div>
                    <a @click='func'>{{btn_text}}</a>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'vDialog',
        props: {
            dialog: Object,
            value: Boolean,
            toggleDialog: Function
        },
        computed: {
            alert() {
                return this.dialog || {};
            },
            msg() {
                return this.alert.msg;
            },
            btn_text() {
                return this.alert.btn_text || '关闭';
            },
            type() {
                return this.alert.type || 'faliure';
            },
            img() {
                return this.alert.img;
            },
            callback() {
                return this.alert.callback;
            },
            callback_close() {
                return this.alert.callback_close;
            },
        },
        methods: {
            func() {
                if (this.callback) {
                    this.callback();
                }
                this.$emit('input', false);
            },
            close() {
                if (this.callback_close) {
                    this.callback_close();
                } else if (this.type == 'faliure' && this.callback) {
                    this.callback();
                }
                this.$emit('input', false);
            }
        }


    }
</script>