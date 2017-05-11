<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-search {
        position: fixed;
        width: pxTorem(750);
        padding: pxTorem(20) pxTorem(40);
        background-color: $gray-light;
        box-shadow: 0 0 pxTorem(10) rgba(0, 0, 0, .2);
        z-index: 1;
        .search-box {
            @include flex-center-v; // width: pxTorem(593);
            height: pxTorem(72);
            border-radius: pxTorem(20);
            background-color: $white;
        }
        .iconfont {
            width: pxTorem(60);
            text-align: center;
            font-size: pxTorem(36);
            color: #bababa;
        }
        .icon-close-circle {
            display: none;
            &.active {
                display: block;
            }
        }
        input {
            flex: 1;
            width: pxTorem(610);
            border: 0;
            font-size: pxTorem(28);
            color: $orange;
            text-shadow: 0 0 0 #bababa;
            -webkit-text-fill-color: transparent;
        }
         ::-webkit-input-placeholder {
            color: #bababa;
        }
        input[type=search]::-webkit-search-cancel-button {
            display: none;
        }
        span {
            font-size: pxTorem(32);
        }
    }
</style>
<template>
    <div class='v-search'>
        <form class='search-box' action='javascript:return true;'>
            <i class='iconfont icon-search ' @click='search'></i>
            <input type='search' placeholder='请输入关键字进行过滤' :value='value' @input='updateValue' @keyup.enter='search' @blur='toggleClear'
                @focus='toggleClear'>
            <i class='iconfont icon-close-circle' @click='clear'></i>
        </form>
        <!--<span @click='clear'>取消</span>-->
    </div>
</template>
<script>
    export default {
        name: 'search',
        props: {
            search: Function,
            value: String
        },
        methods: {
            updateValue(state) {
                this.$emit('input', event.target.value);
            },
            clear() {
                this.$emit('input', '');
            },
            toggleClear(state) {
                event.target.parentElement.querySelector('.icon-close-circle').classList.toggle('active');
            },
        },
    };
</script>