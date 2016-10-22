<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-list-item {
    height: pxTorem(220);
    padding: pxTorem(40) 0;
    border-bottom:1px solid $gray-light;
    .img {
        width: pxTorem(180);
        height: pxTorem(140);
        margin: 0 pxTorem(50) 0 pxTorem(56);
    }
}
</style>
<template>
    <div class='v-list-item flex flex-center-v  bg-white'>
        <img class='img'  :src='img'/>
        <div>
            <p class='text-huge'>{{title}}</p>
            <p  class='text-gray'>{{titleDupty}}</p>
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
        color:{
            type:Boolean,
            default:false
        },
        img:{
            type:String,
            default:''
        }
    },
    data() {
        return {
        };
    }
};
</script>
