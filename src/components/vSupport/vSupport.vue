<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-support {
        .support {
            line-height: pxTorem(110);
            color: #a0a7ad;
            border-top: 1px solid #d4d4d6;
            text-align: center;
            &.no-border {
                border-top: none;
            }
        }
        .load-more {
            line-height: pxTorem(80);
            color: #a0a7ad;
            text-align: center;
            border-top: 1px solid #d4d4d6;
        }
    }
</style>
<template>
    <div class='v-support'>
        <h5 class='load-more' v-show='busy'>上滑加载更多</h5>
        <h4 :class='["support",{"no-border":busy}]'> 由{{name}}提供技术支持 </h4>
    </div>
</template>
<script>
    export default {
        name: 'vSupport',
        props: {
            busy: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            name() {
                return APP.NAME;
            },
        },
    };
</script>