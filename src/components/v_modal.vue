<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.bg-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 1;
}

.content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
<template>
    <transition name='fade'>
        <div v-show='show' @click='close()' class='bg-cover'>
            <div class='content '>
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        coverClose: {
            type: Boolean,
            default: true
        },
        show:{
            type:Boolean,
            default:false
        },
        toggleModal:Function
    },
    methods: {
        close() {
            if (this.coverClose && event.target == document.querySelector('.bg-cover')) {
                this.toggleModal();
            }
        }
    }

};
</script>
