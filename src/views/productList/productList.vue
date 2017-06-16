<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .product-list {
        @include clearfix;
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
    }

    .product-list-content {
        flex: 1;
    }

    ul,
    li {
        list-style: none;
    }

    .sort {
        position: relative;
        display: flex;
        margin-top: pxTorem(112);
        border-bottom: 1px solid #d3d4d6;
        background-color: $white;
        color: #babbbe;
        z-index: 2;
        >div {
            @include flex-center; // flex: 1;
            position: relative;
            height: pxTorem(82);
            font-size: pxTorem(30);
            &:nth-child(1) {
                width: pxTorem(220);
                &:after {
                    content: '|';
                    position: absolute;
                    top: 50%;
                    right: 0;
                    color: #f2f3f4;
                    transform: translateY(-50%);
                }
            }
            &:last-child {
                width: pxTorem(220);
                &:after {
                    content: '|';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    color: #f2f3f4;
                    transform: translateY(-50%);
                }
            }
        }
        .by-integral {
            flex: 1;
        }
        .active {
            color: $orange;
        }
        .iconfont {
            font-weight: bold;
        }
    }

    .arrows {
        position: absolute;
        right: pxTorem(40);
        top: 50%;
        transform: translateY( -50%);
        line-height: pxTorem(18);
        .up,
        .down {
            width: 0;
            height: 0;
            border: pxTorem(9) solid #a9aaae;
        }
        .up {
            border-left-color: transparent;
            border-right-color: transparent;
            border-top-color: transparent;
            margin-bottom: pxTorem(6);
            &.active {
                border-bottom-color: $orange;
            }
        }
        .down {
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            &.active {
                border-top-color: $orange;
            }
        }
    }

    .list {
        padding-top: pxTorem(20);
    }

    .list li:last-child {
        margin-bottom: pxTorem(20);
    }

    .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 1;
    }

    .sort-panel {
        position: absolute;
        left: 0;
        right: 0;
        top: pxTorem(190);
        bottom: 0;
        background-color: $white;
        border-top: 1px solid #f2f3f4;
        z-index: 2;
        .class-one-list {
            float: left;
            height: 100%;
            width: pxTorem(220);
            background-color: #f8f8f8;
            border-right: 1px solid #f2f3f4;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
            >li {
                height: pxTorem(80);
                line-height: pxTorem(80);
                text-align: center;
                border-bottom: 1px solid #f2f3f4;
                font-size: pxTorem(30);
                &.active {
                    position: relative;
                    color: #ff4f03;
                    background-color: $white;
                    &:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: pxTorem(4);
                        background-color: #ff4f03;
                    }
                }
                &:last-child {
                    border-bottom: 0;
                }
            }
        }
        .class-two-list {
            overflow: hidden;
            height: 100%;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
            >li {
                width: pxTorem(140);
                height: pxTorem(60);
                margin-left: pxTorem(30);
                margin-top: pxTorem(30);
                font-size: pxTorem(28);
                float: left;
                text-align: center;
                line-height: pxTorem(60);
                color: #a9aaae;
                border: 1px solid #a9aaae;
                border-radius: pxTorem(10);
                &.active {
                    color: #ff4f03;
                    border: 1px solid #ff4f03;
                }
            }
        }
    }
</style>
<template>
    <div class='product-list'>
        <div class='product-list-content'>
            <v-search :search='searchProduct' v-model='params.sword'></v-search>
            <section class='sort'>
                <div :class='{active:sort_show}' @click='toggleSort'>
                    分类筛选
                </div>
                <div class='by-integral' @click='sortByIntegral'>
                    <span :class='[sort_type!="count"&&sort_type?"active":""]'>消耗积分排序</span>
                    <div class='arrows'>
                        <div :class='["up",{active:sort_type=="integral-up"}]'></div>
                        <div :class='["down",{active:sort_type=="integral-down"}]'></div>
                    </div>
                </div>
                <div :class='[sort_type=="count"?"active":""]' @click='sortByCount'>
                    兑换量优先
                </div>
            </section>
            <div v-show='sort_show' class='sort-panel'>
                <ul class='class-one-list'>
                    <li @click='searchAllSortProductList'>
                        全部
                    </li>
                    <li :class='{active:item.id===params.class_one_id}' @click='changeClassTwoList(item)' v-for='item in class_one_list'>
                        {{item.title}}
                    </li>
                </ul>
                <ul class='class-two-list' ref='panel'>
                    <li v-show='params.class_one_id!==""' :class='{active:!params.class_two_id}' @click='searchSortProductList'>全部</li>
                    <li :class='{active:item.id===params.class_two_id}' @click='searchSortProductList(item)' v-for='item in class_two_list'>
                        {{item.title}}
                    </li>
                </ul>
            </div>
            <div v-show='sort_show' class='bg-cover'></div>
            <transition-group tag='ul' class='list' name='slide-fade'>
                <router-link v-for='(product,$index) in product_list' :to='{name:"product_detail",query:{product_id:product.id,from:"product_list"}}'
                    tag='li' :key='product.id'>
                    <v-list-item :title='product.name' :title-dupty='product.name_show' :integral='product.integral>>0' :img='product.pic_thumb_new'
                        :no-border='$index==product_list.length-1'></v-list-item>
                </router-link>
            </transition-group>
        </div>
        <v-support :busy='busy'></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vSearch from './components/vSearch.vue';
    import vBackTop from 'components/vBackTop';
    import vListItem from 'components/vListItem';
    export default {
        name: 'productList',
        components: {
            vSearch,
            vBackTop,
            vListItem
        },
        data() {
            return {
                product_list: [],
                params: {
                    sword: '',
                    p: 1,
                    r: APP.PERPAGE,
                    // total: 0,
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    _order: '',
                    class_one_id: '',
                    class_two_id: '',
                },
                sort_type: '',
                scroll_event: '',
                router_state: '',
                busy: false,
                sort_show: false,
                class_one_list: [],
                class_two_list: [],
                first_enter: true,
            };
        },
        watch: {
            sort_show(value) {
                utils.toggleTouchMove(value, this.$refs.panel);
                const search = document.getElementById('search');
                search.disabled = value;
            }
        },
        activated() {
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
            }
            window.addEventListener('scroll', this.scroll_event);
        },
        created() {
            this.getProductClassList();
            this.scroll_event = this.getScrollEvent();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.name === 'index' || !from.name) {
                    vm.first_enter = true;
                    vm.$store.dispatch('toggleLoading');
                    vm.getProductList().then(data => {
                        vm.$store.dispatch('toggleLoading');
                        vm.product_list = data.data.list;
                    }).catch(() => {
                        vm.$store.dispatch('toggleLoading');
                    });
                }
            });
        },
        beforeRouteLeave(to, from, next) {
            this.sort_show = false;
            this.router_state = 'leave';
            this.$store.dispatch('savePosition', position => {
                position[from.name] = utils.getScrollTop();
            });
            if (to.name === 'index') {
                this.initParams();
                this.sort_type = '';
                this.params.class_one_id = '';
                this.params.class_two_id = '';
                this.product_list = [];
                this.class_two_list = [];
            }
            window.removeEventListener('scroll', this.scroll_event);
            next();
        },
        methods: {
            //获取商品列表
            getProductList() {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/all_product`, this.params).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.busy = !(data.data.list.length < 20);
                            if (resolve && typeof resolve === 'function') {
                                resolve(data);
                            }
                        } else {
                            if (reject && typeof reject === 'function') {
                                reject();
                            }
                        }
                    }, (response) => {
                        if (reject && typeof reject === 'function') {
                            reject();
                        }
                    });
                });
            },
            //搜索商品
            searchProduct() {
                this.$store.dispatch('toggleLoading');
                this.sort_type = '';
                this.initParams();
                this.params.class_one_id = '';
                this.params.class_two_id = '';
                this.getProductList().then((data) => {
                    this.$store.dispatch('toggleLoading');
                    this.product_list = data.data.list;
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            //初始化参数
            initParams() {
                this.params.p = 1;
                this.params.r = APP.PERPAGE;
                this.params.token = APP.TOKEN;
                this.params.userid = APP.USER_ID;
                this.params.media_id = APP.MEDIA_ID;
                this.params._order = '';
            },
            //消耗积分排序
            sortByIntegral() {
                this.initParams();
                if (this.sort_type === 'integral-up') {
                    this.sort_type = 'integral-down';
                    this.params._order = 'integral:DESC';
                } else {
                    this.sort_type = 'integral-up';
                    this.params._order = 'integral:ASC';
                }
                this.$store.dispatch('toggleLoading');
                this.getProductList().then((data) => {
                    this.product_list = data.data.list;
                    this.$store.dispatch('toggleLoading');
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            //兑换量优先
            sortByCount() {
                this.initParams();
                this.params._order = 'used_count:DESC';
                this.$store.dispatch('toggleLoading');
                if (this.sort_type !== 'count') {
                    this.sort_type = 'count';
                    this.getProductList().then((data) => {
                        this.product_list = data.data.list;
                        this.$store.dispatch('toggleLoading');
                    }).catch(() => {
                        this.$store.dispatch('toggleLoading');
                    });
                } else {
                    this.$store.dispatch('toggleLoading');
                }
            },
            getScrollEvent() {
                let scroll = true;
                return utils.debounce(() => {
                    if (scroll && this.busy && utils.touchBottom()) {
                        scroll = false;
                        this.params.p = this.product_list.length + 1;
                        this.getProductList().then(data => {
                            this.product_list = this.product_list.concat(data.data.list);
                            scroll = true;
                        });
                    }
                }, 500, 500);
            },
            getProductClassList() {
                this.$http.post(`${APP.HOST}/product_class_list`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.class_one_list = data.data;
                    }
                });
            },
            changeClassTwoList(class_one) {
                if (class_one) {
                    this.params.class_one_id = class_one.id;
                    this.class_two_list = class_one.items;
                }
            },
            searchSortProductList(class_two) {
                this.initParams();
                this.sort_type = '';
                this.params.sword = '';
                // this.params.class_one_id = class_two.parent_id;
                if (class_two) {
                    this.params.class_two_id = class_two.id || '';
                } else {
                    this.params.class_two_id = '';
                }
                this.$store.dispatch('toggleLoading');
                this.getProductList().then((data) => {
                    this.product_list = [];
                    this.product_list = data.data.list;
                    this.$store.dispatch('toggleLoading');
                    this.sort_show = false;
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                    this.sort_show = false;
                });
            },
            searchAllSortProductList() {
                this.initParams();
                this.sort_type = '';
                this.sort_show = false;
                this.params.sword = '';
                this.params.class_one_id = '';
                this.params.class_two_id = '';
                this.class_two_list = [];
                this.$store.dispatch('toggleLoading');
                this.getProductList().then((data) => {
                    this.product_list = data.data.list;
                    this.$store.dispatch('toggleLoading');
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            toggleSort() {
                this.sort_show = !this.sort_show;
                if (this.first_enter && this.class_one_list.length > 0) {
                    this.params.class_one_id = this.class_one_list[0].id;
                    this.changeClassTwoList(this.class_one_list[0]);
                }
                this.first_enter = false;
            }
        }
    };
</script>