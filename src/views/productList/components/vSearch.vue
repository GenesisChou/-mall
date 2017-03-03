<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-search {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        width: pxTorem(690);
        height: pxTorem(66);
        border-radius: pxTorem(5);
        background-color: $white;
        input {
            width: pxTorem(610);
            border: 0;
            text-indent: pxTorem(27);
            color: $sliver;
            font-size: pxTorem(28);
        }
        input[type=search]::-webkit-search-cancel-button {
            display: none;
        }
        .iconfont {
            margin-right: pxTorem(35);
            color: $sliver;
            font-size: pxTorem(36);
        }
    }
</style>
<template>
    <div class='v-search ' @submit.prevent>
        <input type='search' :placeholder='placeholder' :value='value' @input='updateValue'  @keyup.enter='search()'>
        <i class='iconfont icon-search ' @click='search()'></i>
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
            value: String
        },
        methods:{
            updateValue(){
                this.$emit('input',event.target.value);
            }
        }

    };
</script>