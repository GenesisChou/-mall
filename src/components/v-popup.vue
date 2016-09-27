<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 1;
}

.content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    border: pxTorem(1) solid $black;
    background: $white;
}
</style>
<template>
    <div v-if='show' class='modal' @click='close'>
        <div class='content'>
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
            if (event.target.className == 'modal') {
                this.show = !this.show;
            }
            // this.show=false;
        }
    }

};
</script>
