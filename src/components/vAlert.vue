<style lang='scss' scoped>
    @import '../assets/scss/variable';
    .container {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
    }

    .v-alert-content {
        width: pxTorem(600);
        font-size: pxTorem(28);
        text-align: center;
        padding: pxTorem(20);
        background-color: $white;
        border-radius: pxTorem(10);
        background-color: $white;
        .iconfont {
            width: pxTorem(60);
            height: pxTorem(60);
            font-size: pxTorem(40);
            font-weight: bold;
            color: $red;
        }
        .pic {
            width: pxTorem(210);
            height: pxTorem(210);
        }
        .msg {
            padding: pxTorem(40) 0;
            margin: auto;
            font-size: pxTorem(32);
            text-align: center;
            width: pxTorem(500);
        }
        button {
            width: pxTorem(300);
            height: pxTorem(80);
            margin: 0 auto;
            margin-bottom: pxTorem(30);
            line-height: pxTorem(80);
            font-size: pxTorem(30);
        }
        .close {
            position: absolute;
            right: pxTorem(5);
            top: pxTorem(5);
            font-weight: bold;
            font-size: pxTorem(40);
            color: $black;
        }
    }

    .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 5;
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
    <div class='v-alert'>
        <div class='container'>
            <transition name='enlarge'>
                <div v-if='show' class='v-alert-content'>
                    <img v-if='type=="img"' class='pic' :src='img' alt="">
                    <i v-else :class='["iconfont",icon_class]'></i>
                    <h3 v-if='msg' class='msg'>{{msg}}</h3>
                    <button class='btn btn-orange' @click='func()'>{{btn_text}}</button>
                    <i v-if='close_btn' class='close iconfont icon-error-circle' @click='close()'></i>
                </div>
            </transition>
        </div>
        <div v-show='show' class='bg-cover'></div>
    </div>
</template>
<script>
    import vModal from 'components/vModal.vue';
    export default {
        name: 'vAlert',
        components: {
            vModal
        },
        computed: {
            alert() {
                return this.$store.state.v_alert;
            },
            show() {
                return this.alert.show;
            },
            type() {
                return this.alert.type;
            },
            msg() {
                return this.alert.msg;
            },
            btn_text() {
                return this.alert.btn_text || '关闭';
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
            close_btn() {
                return this.alert.close_btn;
            },
            icon_class() {
                if (this.type === 'suprise') {
                    return 'icon-warn';
                }
                if (this.type === 'correct') {
                    return 'icon-correct-circle-hollow';
                }
                if (this.type === 'error') {
                    return 'icon-error-circle';
                }
                if (this.type === 'img') {
                    return '';
                }
            },
        },
        watch: {
            show(value) {
                utils.toggleTouchMove(value);
            }
        },
        methods: {
            func() {
                if (this.callback) {
                    this.callback();
                }
                this.close();
            },
            close() {
                if (this.callback_close) {
                    this.callback_close();
                }
                this.$store.dispatch('toggleAlert');
            }
        }
    };
</script>