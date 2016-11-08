<style lang='sass' scoped>
@import '../assets/scss/variable';
.modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: pxTorem(10);
    .modal-content {
        width: pxTorem(500);
        padding-top: pxTorem(30);
        .icon {
            width: pxTorem(50);
            height: pxTorem(50);
        }
        .msg {
            font-size: pxTorem(30);
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
    background: rgba(0, 0, 0, .4);
    z-index: 1;
}
</style>
<template>
    <section v-show='show' class='v-alert'>
        <div class='bg-cover'>
            <div class='modal bg-white'>
                <div class='modal-content text-center text-large'>
                    <img v-if='type=="suprise"' class='icon' src='../assets/images/suprise-hollow.png' />
                    <img v-if='type=="correct"' class='icon' src='../assets/images/correct-hollow.png' />
                    <img v-if='type=="error"' class='icon' src='../assets/images/error-hollow.png' />
                    <p class='msg'>{{msg}}</p>
                    <div class='flex flex-center-h'>
                        <button class='btn btn-red btn-large' @click='func()'>{{btnText}}</button>
                    </div>
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
