<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-search {
    width: pxTorem(690);
    height: pxTorem(66);
    line-height: pxTorem(66);
    border-radius: pxTorem(5);
    background-color: $white;
    input {
        width: pxTorem(610);
        border: 0;
        text-indent: 27px;
    }
    input[type=search]::-webkit-search-cancel-button {
        display: none;
    }
    .iconfont {
        float:right;
        margin-right: pxTorem(44);
    }
}
</style>
<template>
    <div class='v-search ' @submit.prevent>
        <input class='text-sliver text-large' type='search' :placeholder='placeholder' v-model='params.sword' @keyup.enter='search()'>
        <i class='iconfont icon-search text-sliver text-huge ' @click='search()'></i>
    </div>
</template>
<script>
export default {
    name: 'search',
    props: {
        placeholder: {
            type: String,
            default: '请输入关键字进行过滤'
        },
        search: Function,
        params: Object,
    }
};
</script>
