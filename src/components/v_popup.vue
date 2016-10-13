<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.cover {
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
    <div v-if='show' transition='fade'  @click='close' class='cover'>
        <div class='content '>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {

    name: 'popup',
    props: {
        show: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {

        };
    },
    methods: {
        close() {
            if (event.target==document.querySelector('.cover')) {
                this.show = !this.show;
            }
            // this.show=false;
        }
    }

};
</script>
