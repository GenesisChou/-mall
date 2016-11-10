<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-fade-enter-active, .v-fade-leave-active {
  transition: opacity .5s
}
.v-fade-enter, .v-fade-leave-active {
  opacity: 0
}

.v-confirm-content {
    position: fixed;
    left: 50%;
    top: 50%;
    width: pxTorem(600);
    border-radius: pxTorem(10);
    overflow: hidden;
    text-align: center;
    transform: translate(-50%, -50%);
    z-index: 11;
    .msg {
        line-height: pxTorem(190);
        background-color: $white;
        font-size: pxTorem(32);
    }
    .btns {
        font-size: pxTorem(30);
        >div {
            height: pxTorem(84);
            line-height: pxTorem(84);
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
            &:nth-child(1) {
                border-top: 1px solid $gray-light;
            }
        }
    }
}

.v-confirm .bg-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 10;
}
</style>
<template>
    <section  class='v-confirm'>
        <!-- <transition name='v-fade'> -->
            <div v-show='show' class='bg-cover'> </div>
        <!-- </transition> -->
        <div v-show='show' class='v-confirm-content'>
            <div class=' msg'>{{msg}}</div>
            <div class='flex btns'>
                <div class=' flex-item   bg-white' @click='close'>取消</div>
                <div class=' flex-item  bg-red text-white' @click='func()'>确定</div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'v-confirm',
    props: {
        show: false,
        toggleConfirm: Function,
        msg: {
            type: String,
            default: '你确定要操作吗?'
        },
        callback: Function
    },
    methods: {
        func() {
            if (this.callback) {
                this.callback();
            } else {
                this.close();
            }
        },
        close() {
            this.$store.dispatch('toggleConfirm', {
                msg: this.msg,
                show: false
            });
        }
    }
};
</script>
