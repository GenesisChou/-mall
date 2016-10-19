<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-search {
    width: pxTorem(690);
    height: pxTorem(66);
    border-radius: pxTorem(5);
    input {
        flex: 1;
        border: 0;
        padding: 0 pxTorem(27);
    }
    input[type=search]::-webkit-search-cancel-button {
        display: none;
    }
    .icon {
        height: pxTorem(37);
        padding-right: pxTorem(44);
    }
}
</style>
<template>
    <form class='v-search flex flex-center-v bg-white' @submit.prevent>
        <input class='text-sliver text-large' type='search' :placeholder='placeholder' v-model='params.sword' @keyup.enter='search()'>
        <img class='icon' src='../assets/images/search.png' @click='search()'>
    </form>
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
        params: {
            type: Object,
            default: function() {
                return {
                    sword: '',
                    p: 1
                };
            }
        }
    }
};
</script>
