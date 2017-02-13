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
        z-index: 11;
        .msg {
            height: pxTorem(190);
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
    }
</style>
<template>
    <v-modal :show='show' :toggleModal='func' :cover-close='false'>
        <transition name='scale'>
            <div v-show='show' class='v-confirm-content'>
                <h3 class=' msg'>{{msg}}</h3>
                <div class='btns'>
                    <div class='btn-left' @click='close'>取消</div>
                    <div class='btn-right' @click='func()'>确定</div>
                </div>
            </div>
        </transition>
    </v-modal>
   </template>
<script>
    import vModal from 'components/vModal.vue';
    export default {
        name: 'v-confirm',
        components: {
            vModal
        },
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