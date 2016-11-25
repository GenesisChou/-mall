<style lang='sass' scoped>
@import '../assets/scss/variable';
.modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: pxTorem(10);
    z-index: 11;
    .modal-content {
        width: pxTorem(500);
        padding-top: pxTorem(30);
        .icon {
            width: pxTorem(60);
            height: pxTorem(60);
            font-size: pxTorem(40);
        }
        .msg {
            font-size: pxTorem(32);
            line-height: pxTorem(130);
        }
        .btn {
            margin-bottom: pxTorem(40);
            letter-spacing: pxTorem(10);
            text-indent: pxTorem(10);
            width: pxTorem(200);
        }
    }
}

.v-alert .bg-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
}
</style>
<template>
    <section v-show='show' class='v-alert'>
        <div class='bg-cover'>
            <div class='modal bg-white'>
                <div class='modal-content text-center text-large'>
                    <i :class='["icon","text-red","iconfont","text-bold",icon_class]'></i>
                    <p class='msg'>{{msg}}</p>
                    <button class='btn btn-red btn-large' @click='func()'>{{btnText}}</button>
                </div>
            </div>
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
        coverClose: {
            type: Boolean,
            default: true
        },
        btnText: {
            type: String,
            default: '关闭'
        },
        callback: Function
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
            }
        }
    },
    methods: {
        func() {
            this.$store.dispatch('toggleAlert', {
                msg: this.msg,
                btn_text: this.btnText,
                type: this.type,
                cover_close: this.coverClose
            });
            if (this.callback) {
                this.callback();
            }
        }
    }
}
</script>
