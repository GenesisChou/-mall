<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-list-item {
    height: pxTorem(220);
    /*padding: pxTorem(40) 0;*/
    border-bottom: 1px solid $gray-light;
    .img {
        width: pxTorem(180);
        height: pxTorem(140);
        margin: 0 pxTorem(50) 0 pxTorem(56);
    }
    .describe {
        flex: 1;
        height: pxTorem(140);
        .text-huge {
            max-height: pxTorem(105);
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: pxTorem(10);
        }
        /*overflow: hidden;*/
    }
}
</style>
<template>
    <div class='v-list-item flex flex-center-v  bg-white'>
        <img class='img' :src='img' />
        <div class='describe '>
            <div class='text-huge '>{{title}}</div>
            <p :class='color'>{{titleDupty}}</p>
        </div>
    </div>
</template>
<script>
export default {

    name: 'v-list-item',
    props: {
        title: {
            type: String,
            default: ''
        },
        titleDupty: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'text-gray'
        },
        img: {
            type: String,
            default: ''
        }
    }
};
</script>
