<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.block-text {
    height: pxTorem(100);
    line-height: pxTorem(100);
    text-align: center;
}
</style>
<template>
    <h4 :class='["block-text",type]'>
        {{text}}
    </h4>
</template>
<script>
export default {
    name: 'block_text',
    props: {
        text: {
            type: String,
            default: '块级字体'
        },
        type: {
            type: String,
            default: ''
        }
    }

}
</script>
