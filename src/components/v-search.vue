<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
    .search-box {
        height: pxTorem(27);
        padding: 0 $panel-gap;
        input {
            flex: 1;
            border: 0;
        }
    }
</style>
<template>
        <form class='search-box flex flex-center-v border-1 bg-white'>
            <input type='text' placeholder={{placeholder}}>
            <span class='iconfont icon-search '></span>
        </form>
</template>
<script>
export default {
    name: 'search',
    props: {
        placeholder: {
            type: String,
            default: '请输入关键字'
        }
    },

    data() {
        return {

        };
    }
};
</script>
