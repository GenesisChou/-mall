<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-title {
        padding: pxTorem(10) pxTorem(49);
        background-color:$white;
        h1 {
            color: #322f2a;
            font-weight: 500;
            font-size: pxTorem(32);
        }
        h6{
            color:#b1b1b5;
        }
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
            <h1>{{item.title}}</h1>
            <h6 v-if='layout.show_subtitle===1'>{{item.subtitle}}</h6>
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