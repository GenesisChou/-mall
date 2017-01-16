<style lang='sass' scoped>
    @import '../assets/scss/variable';
    .v-alert {
        .v-alert-content {
            position: fixed;
            left: 50%;
            top: 50%;
            width: pxTorem(600);
            font-size: pxTorem(28);
            text-align: center;
            padding: pxTorem(20);
            background-color: $white;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            border-radius: pxTorem(10);
            background-color: $white;
            z-index: 11;
        }
        .icon {
            width: pxTorem(60);
            height: pxTorem(60);
            font-size: pxTorem(40);
        }
        .pic {
            width: pxTorem(300);
            height: pxTorem(210);
        }
        .msg {
            padding: pxTorem(40) 0;
            margin: auto;
            font-size: pxTorem(32);
            text-align: center;
            width: pxTorem(400);
        }
        .btn {
            width: pxTorem(300);
            height: pxTorem(78);
            margin: 0 auto;
            margin-bottom: pxTorem(30);
            line-height: pxTorem(78);
            font-size: pxTorem(30);
        }
        .bg-cover {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 10;
        }
        .close {
            position: absolute;
            right: pxTorem(5);
            top: pxTorem(5);
            font-weight: bold;
            font-size: pxTorem(40);
        }
    }
</style>
<template>
    <section class='v-alert'>
        <div v-show='show' class='v-alert-content '>
            <img v-if='type=="img"' class='pic' :src='img' alt="">
            <i v-else :class='["icon","text-red","iconfont","text-bold",icon_class]'></i>
            <h3 class='msg'>{{msg}}</h3>
            <button class='btn btn-red btn-large' @click='func()'>{{btnText}}</button>
            <i v-if='closeBtn' class='close iconfont icon-error-circle' @click='close()'></i>
        </div>
        <div v-show='show' class='bg-cover'>
        </div>
    </section>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'suprise'
            },
            msg: String,
            btnText: {
                type: String,
                default: '关闭'
            },
            img: String,
            callback: Function,
            callbackClose: Function,
            closeBtn: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            //get right icon-class from props's type
            icon_class() {
                if (this.type == 'suprise') {
                    return 'icon-warn';
                } else if (this.type == 'correct') {
                    return 'icon-correct-circle-hollow';
                } else if (this.type == 'error') {
                    return 'icon-error-circle';
                } else if (this.type == 'img') {
                    return '';
                }
            },
        },
        methods: {
            func() {
                this.close();
                if (this.callback) {
                    this.callback();
                }
            },
            close() {
                if (this.callbackClose) {
                    this.callbackClose();
                }
                this.$store.dispatch('toggleAlert');
            }
        }
    }
</script>