<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-title {
        padding:pxTorem(10) pxTorem(35);
        background-color:$white;
        font-size:pxTorem(30);
        &.left {
            text-align: left;
        }
        &.center {
            text-align: center;
        }
        &.right {
            text-align: right;
        }
    }
</style>
<template>
    <ul class='v-title-list'>
        <li v-for='item in layout.items' :class='["v-title",style]'>
            {{item.title}}
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vTitle',
        props: {
            layout: Object
        },
        computed: {
            style() {
                const type = this.layout.layout_type;
                if (type === 1) {
                    return 'left';
                } else if (type === 2) {
                    return 'center';
                } else if (type === 3) {
                    return 'right';
                }
            }
        },
    };
</script>