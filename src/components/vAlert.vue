<style lang='scss' scoped>
    @import '../assets/scss/variable';
    .v-alert-content {
        position: fixed;
        left: 50%;
        top: 50%;
        width: pxTorem(600);
        font-size: pxTorem(28);
        text-align: center;
        padding: pxTorem(20);
        background-color: $white;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        border-radius: pxTorem(10);
        background-color: $white;
        z-index: 11;
        .iconfont {
            width: pxTorem(60);
            height: pxTorem(60);
            font-size: pxTorem(40);
            font-weight:bold;
            color:$red;
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
        button{
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
            color:$black;
        }
    }
</style>
<template>
    <v-modal v-model='show' :cover-close='false'>
        <div v-if='show' class='v-alert-content '>
            <img v-if='type=="img"' class='pic' :src='img' alt="">
            <i v-else :class='["iconfont",icon_class]'></i>
            <h3 v-if='msg' class='msg'>{{msg}}</h3>
            <button class='btn btn-orange' @click='func()'>{{btn_text}}</button>
            <i v-if='close_btn' class='close iconfont icon-error-circle' @click='close()'></i>
        </div>
    </v-modal>
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
                if (this.type == 'suprise') {
                    return 'icon-warn';
                }
                if (this.type == 'correct') {
                    return 'icon-correct-circle-hollow';
                }
                if (this.type == 'error') {
                    return 'icon-error-circle';
                }
                if (this.type == 'img') {
                    return '';
                }
            },
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
    }
</script>