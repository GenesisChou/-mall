<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-list-item {
        @include active;
        padding: 0 pxTorem(30);
        background-color: $white;
    }
    
    .container {
        @include flex-center-v;
        height: pxTorem(208);
        border-bottom: 1px solid $gray-light;
        .img {
            width: pxTorem(249);
            height: pxTorem(169);
            margin-left: pxTorem(10);
            margin-right: pxTorem(60);
        }
        .describe {
            @include flex;
            text-align: justify;
        }
        h2 {
            height: pxTorem(46);
            line-height: pxTorem(46);
        }
        h6 {
            height: pxTorem(40);
            line-height: pxTorem(40);
            color: #babbbe;
        }
        .integral {
            padding-top: pxTorem(10);
            color: $orange;
        }
        &.no-border {
            border-bottom: none;
        }
    }
</style>
<template>
    <div class='v-list-item'>
        <div :class='["container",{"no-border":noBorder}]'>
            <img class='img' :src='img' />
            <div class='describe'>
                <h2 class='text-ellipsis'>{{title}}</h2>
                <h6 class='text-ellipsis'>{{titleDupty}}</h6>
                <h3 class='integral'>{{integral}}积分</h3>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vListItem',
        props: {
            img: String,
            title: String,
            titleDupty: String,
            integral: Number,
            noBorder: {
                type: Boolean,
                default: false
            }
        },
    };
</script>