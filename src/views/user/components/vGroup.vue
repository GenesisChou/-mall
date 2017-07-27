<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-group {
        background: $white;
        margin-bottom:pxTorem(13);
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
    }
</style>
<template>
    <div class='v-group'>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'vGroup',
        mounted() {
            const children = this.$children;
            if (children) {
                const last_child = children[children.length - 1];
                if (last_child.$el) {
                    const message = last_child.$el.querySelector('.message');
                    message.style.borderBottom = 'none';
                }
            }
        }
    };
</script>