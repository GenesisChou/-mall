<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.load-more {
    height: pxTorem(90);
}

.search-box {
    padding: pxTorem(17) pxTorem(30);
    position: fixed;
    z-index: 1;

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
    -ms-transform: translateY( -50%);
    -moz-transform: translateY( -50%);
    -webkit-transform: translateY( -50%);
    -o-transform: translateY( -50%);
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
        <div class='search-box bg-base'>
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
        <router-link :to='{name:"product_detail",query:{product_id:product.id}}' v-for='product in product_list'>
            <v-list-item :title='product.name' :title-dupty='parseInt(product.integral)+"积分"' :img='product.pic_thumb' color='text-red'></v-list-item>
        </router-link>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
import utils from 'libs/utils.js'
import vSearch from 'components/v_search.vue'
import vListItem from 'components/v_list_item.vue'
import vBackTop from 'components/v_back_top.vue'
import vSpinner from 'components/v_spinner.vue'
export default {

    name: 'product_list',
    components: {
        vListItem,
        vSearch,
        vBackTop,
        vSpinner
    },
    data() {
        return {
            product_list: [],
            params: {
                sword: '',
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID,
                _order: '',

            },
            sort_type: ''
        };
    },
    mounted() {
        this.getProductList();
        utils.getScrollData(this.product_list, this.params, this.getProductList);
    },
    methods: {
        //获取商品列表
        getProductList(callback) {
            this.searchProduct(this.params, (data) => {
                if (callback) {
                    callback();
                }
                let product_list = this.product_list;
                if (this.params.p <= 1) {
                    this.params.total = data.data.total;
                    this.params.count = data.data.count;
                }
                console.log(this.product_list.concat(data.data.list));
                this.product_list = this.product_list.concat(data.data.list);
            })
        },
        //搜索商品
        searchProduct(params = this.params, callback) {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/all_product`, params).then((response) => {
                let data = response.data;
                this.$store.dispatch('toggleLoading');
                if (callback) {
                    callback(data);
                } else {
                    this.product_list = data.data.list;
                }

            }, (response) => {
                this.$store.dispatch('toggleLoading');

            })
        },
        //初始化参数
        initParams() {
            let temp = this.params.sword;
            this.params = {
                sword: temp,
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID,
                _order: ''
            };
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

            this.getProductList(() => {
                this.product_list = [];
            });
        },
        //兑换量优先
        sortByCount() {
            this.initParams();
            this.params._order = 'used_count:DESC';
            if (this.sort_type != 'count') {

                this.sort_type = 'count';
                this.getProductList(() => {
                    this.product_list = [];
                });
            }
        }

    }
};
</script>
