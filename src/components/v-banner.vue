<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.banner {
    height: pxTorem(120);
    position: relative;
    .title{
        width: pxTorem(140);
        height: pxTorem(34);
    }
    .link {
        position: absolute;
        right: pxTorem(30);
        bottom: pxTorem(20);
        img {
            width: pxTorem(26);
            height: pxTorem(26);
            margin-left: pxTorem(5);
        }
    }
    .decorate {
        position: absolute;
    }
    .top {
        top: 0;
        right: pxTorem(172);
    }
    .bottom {
        bottom: 0;
        left: pxTorem(172);
    }
}
</style>
<template>
    <div class='banner flex flex-center-v flex-center-h bg-base'>
        <img class='title' v-if='type=="activity"' src='../assets/images/index/hot-activity.png'>
        <img class='title' v-else src='../assets/images/index/hot-product.png'>
        <img class='decorate top' src='../assets/images/index/decorate-top.png'>
        <img class='decorate bottom' src='../assets/images/index/decorate-bottom.png'>
        <div class='link text-small flex flex-center-v'>
            <template v-if='type=="activity"'>
                <span class='text-sliver'>所有活动</span>
                <img src='../assets/images/arrows-right-orange.png'>
            </template>
            <template v-else>
                <span class='text-sliver'>所有商品</span>
                <img src='../assets/images/arrows-right-purple.png'>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'v-banner',
    props: {
        type: {
            type: String,
            default: ''
        }
    }
};
</script>
