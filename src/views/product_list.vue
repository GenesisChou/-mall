<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.load-more {
    height: pxTorem(90);
}

.search-box {
    padding: pxTorem(17) pxTorem(30);
    position: fixed;
}

.fill {
    height: pxTorem(100);
}

.sort {
    border-top: 1px solid $gray-light;
    border-bottom: 1px solid $gray-light;
    height: pxTorem(105);
}

.arrows {
    line-height: pxTorem(18);
    font-size: pxTorem(18);
    margin-left: pxTorem(10);
}
</style>
<template>
    <div class='product-list'>
        <div class='search-box bg-base'>
            <v-search :search='searchProduct' :params='params'></v-search>
        </div>
        <div class='fill'></div>
        <div class='sort flex'>
            <div class='flex-item text-huge flex flex-center-h flex-center-v' @click='sortByIntegral'>
                <span :class='[sort_type!="count"&&sort_type?"text-red":""]'>消耗积分排序</span>
                <div class='arrows flex flex-column '>
                    <i :class='["icon-arrows-up","iconfont","text-bold",sort_type=="integral-up"?"text-red":""]'></i>
                    <i :class='["icon-arrows-down","iconfont","text-bold",sort_type=="integral-down"?"text-red":""]'></i>
                </div>
            </div>
            <div :class='["flex-item","text-huge","flex","flex-center-h","flex-center-v",sort_type=="count"?"text-red":""]' @click='sortByCount'>
                兑换量优先
            </div>
        </div>
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
            product_list: '',
            params: {
                sword: '',
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID
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
        getProductList() {
            this.searchProduct(this.params, (data) => {
                let product_list = this.product_list;
                if (this.params.p <= 1) {
                    this.params.total = data.data.total;
                    this.params.count = data.data.count;
                }
                this.product_list = data.data.list.concat(product_list);
            })
        },
        //搜索商品
        searchProduct(params = this.params, callback) {
            this.$http.post(`${APP.HOST}/all_product`, params).then((response) => {
                let data = response.data;
                if (callback) {
                    callback(data);
                } else {
                    this.product_list = data.data.list;
                }
            }, (response) => {

            })
        },
        //消耗积分排序
        sortByIntegral() {
            this.sort_type = this.sort_type == 'integral-up' ? 'integral-down' : 'integral-up';
        },
        //兑换量优先
        sortByCount() {
            this.sort_type = 'count';
        }

    }
};
</script>
