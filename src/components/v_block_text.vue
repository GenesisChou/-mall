<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.block-text {
    height: pxTorem(100);
}
</style>
<template>
    <div :class='["block-text","flex","flex-center-v","flex-center-h","bg-base","text-large",type]'>
        {{text}}
    </div>
</template>
<script>
export default {
    name: 'block_text',
    props: {
        text: {
            type: String,
            default: '块级字体'
        }
    },
    type: {
        type: String,
        default: ''
    }
}
</script>
