<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-modal {
    .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 5;
    }
    .content {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 6
    }
}
</style>
<template>
    <section class='v-modal'>
        <transition name='fade'>
            <div v-show='show' @click='close()' class='bg-cover'>
            </div>
        </transition>
        <div v-show='show' class='content '>
            <slot></slot>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        coverClose: {
            type: Boolean,
            default: true
        },
        show: {
            type: Boolean,
            default: false
        },
        toggleModal: Function
    },
    methods: {
        close() {
            if (this.coverClose && event.target.className == 'bg-cover') {
                this.toggleModal();
            }
        }
    }

};
</script>
