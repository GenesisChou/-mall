<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .search-box {
        padding: pxTorem(17) pxTorem(30);
        position: fixed;
        z-index: 1;
        background-color: $gray-light;
    }
    
    .fill {
        height: pxTorem(100);
    }
    
    .sort {
        border-top: 1px solid $gray-light;
        border-bottom: 1px solid $gray-light;
        height: pxTorem(105);
        line-height: pxTorem(105);
        >li {
            width: 50%;
            text-align: center;
            &:nth-child(1) {
                position: relative;
            }
        }
    }
    
    .arrows {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY( -50%);
        -webkit-transform: translateY( -50%);
        line-height: pxTorem(18);
        right: pxTorem(20);
        i {
            font-size: pxTorem(18);
            display: block;
        }
    }
</style>
<template>
    <div class='product-list'>
        <div class='search-box'>
            <v-search :search='searchProduct' :params='params'></v-search>
        </div>
        <div class='fill'></div>
        <ul class='sort list-inline'>
            <li class=' text-huge' @click='sortByIntegral'>
                <span :class='[sort_type!="count"&&sort_type?"text-red":""]'>消耗积分排序</span>
                <div class='arrows'>
                    <i :class='["icon-arrows-up","iconfont","text-bold",sort_type=="integral-up"?"text-red":""]'></i>
                    <i :class='["icon-arrows-down","iconfont","text-bold",sort_type=="integral-down"?"text-red":""]'></i>
                </div>
            </li>
            <li :class='["text-huge",sort_type=="count"?"text-red":""]' @click='sortByCount'>
                兑换量优先
            </li>
        </ul>
        <router-link :to='{name:"product_detail",query:{product_id:product.id,integral:product.integral>>0}}' v-for='product in product_list'
            tag='div'>
            <v-list-item :title='product.name' :title-dupty='~~product.integral+"积分"' :img='product.pic_thumb' color='text-red'></v-list-item>
            </router-link>
            <v-load-more v-if='busy'></v-load-more>
            <v-support v-if='support_show'></v-support>
            <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vSearch from 'components/vSearch.vue'
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
                support_show: false
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
                this.support_show = true;
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