<style lang='sass' scoped>
@import '../assets/scss/variable';
.modal {
    border-radius: pxTorem(5);
    .modal-content {
        width: pxTorem(500);
        height: pxTorem(260);
        padding-top: pxTorem(30);
        .icon {
            width: pxTorem(50);
            height: pxTorem(50);
        }
        .msg {
            line-height: pxTorem(100);
        }
        .btn {
            letter-spacing: pxTorem(10);
        }
    }
}
</style>
<template>
    <v-modal :show.sync='show' :cover-close='coverClose'>
        <div class='modal bg-white'>
            <div class='modal-content text-center text-large'>
                <img v-if='type' class='icon' src='../assets/images/correct-hollow.png' />
                <img v-else class='icon' src='../assets/images/error-hollow.png' />
                <p class='msg'>{{msg}}</p>
                <div class='flex flex-center-h'>
                    <button class='btn btn-pink flex flex-center-h' @click='func()'>{{btnText}}</button>
                </div>
            </div>
        </div>
    </v-modal>
</template>
<script>
import vModal from 'components/v_modal'
export default {
    components: {
        vModal
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        type: {
            type: Boolean,
            default: true
        },
        msg: {
            type: String,
            default: '正确'
        },
        coverClose:{
            type:Boolean,
            default:true
        },
        btnText: {
            type: String,
            default: '关闭'
        },
        func: {
            type: Function,
            default: function() {
                this.show = !this.show;
            }
        }
    },
}
</script>
