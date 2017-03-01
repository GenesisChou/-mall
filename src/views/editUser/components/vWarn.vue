<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
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
            z-index: 6
        }
    }
    
    .v-warn-content {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        width: pxTorem(600);
        height: pxTorem(230);
        margin-left: pxTorem(-600/2);
        margin-top: pxTorem(-230/2);
        background-color: $white;
        border-radius: pxTorem(30);
        .message {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            height: pxTorem(130);
            color: #3d4244;
            h3 {
                width: pxTorem(300);
                text-align:center;
            }
        }
        .operation {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            height: pxTorem(100);
            color: $orange;
            font-size: pxTorem(36);
            border-top: 1px solid $gray-light;
        }
    }
</style>
<template>
    <div class='v-modal'>
        <div v-show='value' class='bg-cover'></div>
        <transition name='scale'>
            <div v-show='value' class='content '>
                <div class='v-warn-content '>
                    <div class='message'>
                        <h3> {{msg}} </h3>
                    </div>
                    <a class='operation' @click='func'>{{btn_text}}</a>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'vWarn',
        props: {
            warn: Object,
            value: Boolean,
            toggleWarn: Function
        },
        computed: {
            alert() {
                return this.warn || {};
            },
            msg() {
                return this.alert.msg;
            },
            btn_text() {
                return this.alert.btn_text || '关闭';
            },
            type() {
                return this.alert.type || 'faliure';
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
                this.$emit('input', false);
            },
            close() {
                if (this.callback_close) {
                    this.callback_close();
                } else if (this.type == 'faliure' && this.callback) {
                    this.callback();
                }
                this.$emit('input', false);
            }
        }


    }
</script>