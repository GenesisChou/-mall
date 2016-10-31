<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-order-item {
    overflow: hidden;
    padding: pxTorem(26) 0;
    border-top: 1px solid $gray-light;
    .img {
        width: pxTorem(160);
        height: pxTorem(120);
    }
    .content {
        overflow: hidden;
        margin-left: pxTorem(180);
        .text-gray {
            margin-top: pxTorem(10);
        }
        /*flex-direction: column;*/
    }
}
</style>
<template>
    <div class='v-order-item  '>
        <img class='img pull-left' :src='img' />
        <div class='content '>
            <strong class='text-huge'>{{name}}</strong>
            <p class='text-large text-gray'> {{integral|parseInt}}积分
                <span class='pull-right'>x{{number}}</span>
            </p>
        </div>
        <!--         <div class='flex flex-center-v text-large'>
            
        </div>
 --></div>
</template>
<script>
import filters from 'libs/filters'
export default {
    props: {
        img: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: '商品名称'
        },
        integral: String,
        number: {
            type: String,
            default: 1
        }

    },
    filters
}
</script>
