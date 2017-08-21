<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-chunk {
        position: relative;
        overflow: hidden;
        width: pxTorem(750);
        background: $white;
    }
</style>
<template>
    <div class='v-chunk' :style='layout.height|getHeight'>
        <div v-for='item in layout.items' :style='getCod(item)' @click='routerLink(item,layout)'></div>
    </div>
</template>
<script>
    export default {
        name: 'vChunk',
        props: {
            layout: Object,
            routerLink: Function,
        },
        filters: {
            getHeight(value) {
                const height = utils.pxTorem(value * 150);
                return {
                    height
                };
            }
        },
        methods: {
            getCod(item) {
                const cod = JSON.parse(item.cod),
                    start = cod.start,
                    end = cod.end,
                    left = utils.pxTorem((Math.abs(start[0])) * 150),
                    top = utils.pxTorem((Math.abs(start[1] - Math.floor(this.layout.start_point) || 0)) * 150),
                    width = utils.pxTorem((Math.abs(end[0] - start[0])) * 150),
                    height = utils.pxTorem((Math.abs(end[1] - start[1])) * 150);
                return {
                    position: 'absolute',
                    left,
                    top,
                    width,
                    height,
                    background: `url('${item.pic_banner_new}') no-repeat 100% 100%/100% 100%`
                };
            }
        }
    };
</script>