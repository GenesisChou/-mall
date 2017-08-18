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
        <div v-for='item in layout.items' :style='item|getCod' @click='routerLink(item,layout)'></div>
    </div>
</template>
<script>
    export default {
        name: 'vChunk',
        props: {
            layout: Object,
            routerLink: Function,
        },
        data() {
            return {
                // layout: {
                //     height: 3,
                //     items: [{
                //         cod: {
                //             start: [0, 0],
                //             end: [1, 2]
                //         },
                //         pic_banner_new: 'http://static.justtong.com/uploads/images/goods/20170719/181604596f31642f2e3_250.jpg'
                //     }, {
                //         cod: {
                //             start: [2, 1],
                //             end: [4, 3]
                //         },
                //         pic_banner_new: 'http://static.justtong.com/uploads/images/goods/20170719/181635596f3183db864_250.jpg'
                //     }]
                // }
            };
        },
        filters: {
            getCod(item) {
                const start = item.cod.start,
                    end = item.cod.end,
                    left = utils.pxTorem((Math.abs(start[0])) * 150),
                    top = utils.pxTorem((Math.abs(start[1])) * 150),
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
            },
            getHeight(value) {
                const height = utils.pxTorem(value * 150);
                return {
                    height
                };
            }
        },
    };
</script>