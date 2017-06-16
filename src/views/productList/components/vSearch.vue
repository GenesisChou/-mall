<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-search {
        position: fixed;
        width: pxTorem(750);
        padding: pxTorem(20) pxTorem(40);
        background-color: $gray-light;
        // box-shadow: 0 0 pxTorem(10) rgba(0, 0, 0, .2);
        z-index: 3;
        transition: .3s;
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
            height: 100%;
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
        &.top {
            position: absolute;
        }
    }
</style>
<template>
    <div class='v-search'>
        <form class='search-box' action='javascript:return true;'>
            <i class='iconfont icon-search ' @click='search'></i>
            <input type='search' placeholder='请输入关键字进行过滤' :value='value' @input='updateValue' @keyup.enter='search' @blur='toggleClear'
                @focus='toggleClear' id='search'>
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
        data() {
            return {
                scroll_event: ''
            };
        },
        computed: {
            router_state() {
                return this.$parent.router_state || {};
            }
        },
        watch: {
            router_state(value) {
                if (value === 'leave') {
                    window.removeEventListener('scroll', this.scroll_event);
                } else if (value === 'enter') {
                    window.addEventListener('scroll', this.scroll_event);
                }
            }
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
        created() {
            this.scroll_event = utils.debounce(() => {
                const height = utils.getScrollTop();
                if (height <= 0) {
                    this.$el.classList.add('top');
                } else {
                    this.$el.classList.remove('top');
                }
            }, 100, 100);
            window.addEventListener('scroll', this.scroll_event);
        }
    };
</script>