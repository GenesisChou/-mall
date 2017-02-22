<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
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
            -webkit-transform: translate(-50%, -50%);
            z-index: 6
        }
    }
    
    .v-dialog-content {
        width: pxTorem(574);
        height: pxTorem(553);
        background-color: #eb4a4a;
        border-radius: pxTorem(30);
        .message {
            font-size: pxTorem(44);
            text-align: center;
            color: #ffe433;
        }
        a {
            display: block;
            width: pxTorem(180);
            height: pxTorem(59);
            margin: 0 auto;
            border-radius: pxTorem(10);
            background-color: #ffe433;
        }
    }
</style>
<template>
    <div class='v-modal'>
        <div v-show='value' class='bg-cover'></div>
        <div v-show='value' class='content '>
            <div class='v-dialog-content '>
                <h1 class='message'></h1>
                <!--
            <img v-if='type=="img"' class='pic' :src='img' alt="">
            <i v-else :class='["iconfont",icon_class]'></i>
            <h3 v-if='msg' class='msg'>{{msg}}</h3>
            <button class='btn btn-red' @click='func()'>{{btn_text}}</button>
            <i v-if='close_btn' class='close iconfont icon-error-circle' @click='close()'></i>
            -->
                <a @click='func'></a>
            </div>
        </div>
    </div>

</template>
<script>
    import vModal from 'components/vModal.vue';
    export default {
        name: 'vDialog',
        components: {
            vModal
        },
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
                this.close();
            },
            close() {
                this.$emit('input', false);
            }
        }


    }
</script>