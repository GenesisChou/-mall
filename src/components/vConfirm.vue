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
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-direction: column;
            -webkit-justify-content: center;
            height: pxTorem(130);
        }
        .btns {
            display:flex;
            display: -webkit-flex;
            border-top: 1px solid #d3d4d6;
        }
        .btn-left,
        .btn-right {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            -webkit-flex: 1;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            height: pxTorem(100);
            font-size: pxTorem(36);
            text-align: center;
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
        .btn-right {
            color: #ff5000;
        }
    }
</style>
<template>
    <v-modal v-model='show' :cover-close='false'>
        <transition name='scale'>
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