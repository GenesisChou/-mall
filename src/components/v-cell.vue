<style lang='sass' scoped>@import '../assets/scss/variable.scss';
.cell {
    height: pxTorem(46);
    padding: 0 $gap*4;
}
.img {
    height: pxTorem(25);
    width: pxTorem(25);
    vertical-align: middle;
    margin-right: $gap;
}
</style>
<template>
<div class='cell flex flex-space-between border-t-1 border-b-1 bg-white' v-link='link'>
    <div class='flex flex-center-v'>
        <img class='img border-1' /> {{msgLeft}}
    </div>
    <div class='flex flex-center-v'>
        {{msgRight}}
        <span class='iconfont icon-arrows-right ' v-if='link'></span>
    </div>
</div>
</template>
<script>
export default {

    name: 'cell',
    props: {
        link: {
            type: Object,
            default: ''
        },
        msgLeft: {
            type: String,
            default: ''
        },
        msgRight: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        };
    }
};
</script>
