<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-order-item {
    padding: pxTorem(26) 0;
    border-bottom: pxTorem(1) solid #c8c8c8;
    .img {
        width: pxTorem(160);
        height: pxTorem(120);
    }
    .content {
        margin-left: pxTorem(30);
        flex-direction: column;
    }
}
</style>
<template>
    <div class='v-order-item flex '>
        <img class='img ' :src='img' />
        <div class='content flex flex-item flex-space-between'>
            <strong class='text-huge'>{{name}}</strong>
            <span class='text-large text-gray'> {{integral|parseInt}}积分 </span>
        </div>
        <div class='flex flex-center-v text-large'>
            x{{number}}
        </div>
    </div>
</template>
<script>
import filters from 'libs/filters'
export default {
    props:{
        img:{
            type:String,
            default:''
        },
        name:{
            type:String,
            default:'商品名称'
        },
        integral:String,
        number:{
            type:String,
            default:1
        }

    },
    filters
}
</script>
