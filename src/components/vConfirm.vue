<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
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
        background-color: $white;
        z-index: 11;
        .msg {
            @include flex-center;
            flex-direction: column;
            height: pxTorem(130);
        }
        .btns {
            display: flex;
            border-top: 1px solid #d3d4d6;
        }
        .btn-left,
        .btn-right {
            @include flex-center;
            flex: 1;
            height: pxTorem(100);
            font-size: pxTorem(36);
            text-align: center;
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
        .btn-right {
            color: $orange;
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
    <div class='v-confirm'>
        <transition name='enlarge'>
            <div v-show='show' class='v-confirm-content'>
                <div class='msg'>
                    <h3>{{msg}}</h3>
                    <h3 v-if='msg_second'>{{msg_second}}</h3>
                </div>
                <div class='btns'>
                    <div class='btn-left' @click='close'>取消</div>
                    <div class='btn-right' @click='func()'>确定</div>
                </div>
            </div>
        </transition>
        <div v-show='show' class='bg-cover'></div>
    </div>
</template>
<script>
    export default {
        name: 'vConfirm',
        computed: {
            confirm() {
                return this.$store.state.v_confirm;
            },
            show() {
                return this.confirm.show;
            },
            msg() {
                return this.confirm.msg;
            },
            msg_second() {
                return this.confirm.msg_second;
            },
            callback() {
                return this.confirm.callback;
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
                this.$store.dispatch('toggleConfirm');
            }
        }
    };
</script>