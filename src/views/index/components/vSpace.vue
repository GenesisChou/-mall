<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-space {
        width: 100%;
    }
</style>
<template>
    <div class='v-space' :style='style'></div>
</template>
<script>
    export default {
        name: 'vSpace',
        props: {
            layout: Object,
        },
        computed: {
            style() {
                return {
                    height: `${this.layout.height / 100}rem`
                };
            }
        }
    };
</script>