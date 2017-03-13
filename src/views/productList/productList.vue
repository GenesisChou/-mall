<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .product-list{
        padding-bottom:pxTorem(20);
    }
    .space {
        height: pxTorem(112);
    }
    
    ul,
    li {
        list-style: none;
    }
    
    .sort {
        display: flex;
        align-items: center;
        display: -webkit-flex;
        -webkit-align-items: center;
        height: pxTorem(82);
        margin-bottom: pxTorem(20);
        border-bottom: 1px solid #d3d4d6;
        background-color: $white;
        color: #babbbe;
        >div {
            flex: 1;
            -webkit-flex: 1;
            text-align: center;
            font-size: pxTorem(30);
            &:nth-child(1) {
                position: relative;
            }
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
        right: 0;
        top: 50%;
        transform: translateY( -50%);
        -webkit-transform: translateY( -50%);
        line-height: pxTorem(18);
        right: pxTorem(70);
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
</style>
<template>
    <div class='product-list'>
        <v-search :search='searchProduct' v-model='params.sword'></v-search>
        <div class='space'></div>
        <section class='sort'>
            <div @click='sortByIntegral'>
                <span :class='[sort_type!="count"&&sort_type?"active":""]'>消耗积分排序</span>
                <div class='arrows'>
                    <div :class='["up",{active:sort_type=="integral-up"}]'></div>
                    <div :class='["down",{active:sort_type=="integral-down"}]'></div>
                    <!--
                    <i :class='["icon-arrows-up","iconfont",sort_type=="integral-up"?"active":""]'></i>
                    <i :class='["icon-arrows-down","iconfont",sort_type=="integral-down"?"active":""]'></i>
                    -->
                </div>
            </div>
            <div :class='[sort_type=="count"?"active":""]' @click='sortByCount'>
                兑换量优先
            </div>
        </section>
        <ul class='list'>
            <router-link :to='{name:"product_detail",query:{product_id:product.id,integral:product.integral>>0}}' v-for='product in product_list'
                tag='li'>
                <v-list-item :title='product.name' :title-dupty='product.name' :integral='product.integral>>0' :img='product.pic_thumb'></v-list-item>
            </router-link>
        </ul>
        <v-load-more v-if='busy'></v-load-more>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vSearch from './components/vSearch.vue'
    export default {
        name: 'productList',
        components: {
            vSearch
        },
        data() {
            return {
                product_list: [],
                params: {
                    sword: '',
                    p: 1,
                    r: APP.PERPAGE,
                    total: 0,
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    _order: '',

                },
                sort_type: '',
                scroll_event: '',
            };
        },
        computed: {
            busy() {
                return this.params.total > this.params.p;
            }
        },
        activated() {
            let position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
            window.addEventListener('scroll', this.scroll_event);
        },
        created() {
            this.$store.dispatch('toggleLoading');
            this.getProductList().then(() => {
                this.$store.dispatch('toggleLoading');
            }).catch(() => {
                this.$store.dispatch('toggleLoading');
            })
            this.scroll_event = this.getScrollEvent();
        },
        beforeRouteLeave(to, from, next) {
            window.removeEventListener('scroll', this.scroll_event);
            next();
        },
        methods: {
            //获取商品列表
            getProductList() {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/all_product`, this.params).then((response) => {
                        let data = response.data;
                        if (resolve) {
                            resolve(data);
                        }
                        this.params.total = data.data.total;
                        this.product_list = this.product_list.concat(data.data.list);
                    }, (response) => {
                        if (reject) {
                            reject();
                        }
                    })

                })
            },
            //搜索商品
            searchProduct() {
                this.$store.dispatch('toggleLoading');
                this.sort_type = '';
                this.initParams();
                this.getProductList().then((data) => {
                    this.$store.dispatch('toggleLoading');
                    this.loading = true;
                    this.params.total = data.data.total;
                    this.product_list = data.data.list;
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                })
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
                if (this.sort_type == 'integral-up') {
                    this.sort_type = 'integral-down';
                    this.params._order = 'integral:DESC';
                } else {
                    this.sort_type = 'integral-up';
                    this.params._order = 'integral:ASC';
                }
                this.$store.dispatch('toggleLoading');
                this.getProductList().then((data) => {
                    this.product_list = [];
                    this.product_list = this.product_list.concat(data.data.list);
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
                if (this.sort_type != 'count') {
                    this.sort_type = 'count';
                    this.getProductList().then((data) => {
                        this.product_list = [];
                        this.product_list = this.product_list.concat(data.data.list);
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
                        this.params.p++;
                        this.getProductList().then(() => {
                            scroll = true;
                        });
                    }
                }, 500, 500);
            },

        }
    };
</script>