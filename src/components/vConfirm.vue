<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    .v-confirm {
        .v-confirm-content {
            position: fixed;
            left: 50%;
            top: 50%;
            width: pxTorem(600);
            border-radius: pxTorem(10);
            overflow: hidden;
            text-align: center;
            margin-left: pxTorem(-300);
            margin-top: pxTorem(-137);
            z-index: 11;
        }
        .msg {
            height:pxTorem(190);
            line-height: pxTorem(190);
            background-color: $white;
        }
        .btns {
            font-size: pxTorem(30);
            overflow: hidden;
        }
        .btn-left,
        .btn-right {
            width: 50%;
            height: pxTorem(84);
            line-height: pxTorem(84);
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
        .btn-left {
            float: left;
            border-top: 1px solid $gray-light;
            background-color: $white;
        }
        .btn-right {
            float: right;
            background-color: $red;
            border-top: 1px solid $red;
            color: $white;
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
    }
</style>
<template>
    <section class='v-confirm'>
        <transition name='scale'>
            <div v-show='show' class='v-confirm-content'>
                <h3 class=' msg'>{{msg}}</h3>
                <div class='btns'>
                    <div class='btn-left' @click='close'>取消</div>
                    <div class='btn-right' @click='func()'>确定</div>
                </div>
            </div>
        </transition>
        <div v-show='show' class='bg-cover'> </div>
    </section>
</template>
<script>
    export default {
        name: 'v-confirm',
        props: {
            show: false,
            msg: String,
            callback: Function
        },
        methods: {
            func() {
                if (this.callback) {
                    this.callback();
                }
                this.close();
            },
            close() {
                this.$store.dispatch('toggleConfirm');
            }
        }
    };
</script>