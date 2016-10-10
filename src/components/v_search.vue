<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-search {
    width: pxTorem(690);
    height: pxTorem(66);
    border-radius: pxTorem(5);
    input {
            flex: 1;
            border: 0;
            padding:0 pxTorem(27);
    }
    .icon{
        width: pxTorem(37);
        height: pxTorem(37);
        margin-right:pxTorem(44);
    }

}
</style>
<template>
    <form class='v-search flex flex-center-v bg-white' @submit.prevent>
        <input class='text-sliver text-large' type='text' placeholder={{placeholder}} v-model='params.sword'  @keyup.enter='search()'>
        <img class='icon' src='../assets/images/search.png' >
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
        search:Function,
        params:{
            type:Object,
            default:function(){
                return{
                    sword:'',
                    p:1
                };
            }
        }
    }
};
</script>
