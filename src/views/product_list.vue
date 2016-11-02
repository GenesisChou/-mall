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
</style>
<template>
    <div class='product-list'>
        <div class='search-box bg-base'>
            <v-search :search='searchProduct' :params='params'></v-search>
        </div>
        <div class='fill'></div>
        <router-link :to='{name:"product_detail",query:{product_id:product.id}}' v-for='product in product_list'>
            <v-list-item :title='product.name' :title-dupty='parseInt(product.integral)+"积分"' :img='product.pic_thumb'></v-list-item>
        </router-link>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
import utils from 'libs/utils.js'
import vSearch from 'components/v_search.vue'
import vListItem from 'components/v_list_item.vue'
import vBackTop from 'components/v_back_top.vue'
export default {

    name: 'product_list',
    components: {
        vListItem,
        vSearch,
        vBackTop
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
                userid: APP.USER_ID
            }
        };
    },
    mounted() {
        this.getProductList();
        utils.getScrollData(this.product_list, this.params, this.getProductList);
    },
    methods: {
        //获取商品列表
        getProductList(params = this.params) {
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
        searchProduct(params = this.params, func) {
            this.$http.post(`${APP.HOST}/all_product`, params).then((response) => {
                let data = response.data;
                if (typeof func === 'function') {
                    func(data);
                } else {
                    this.product_list = data.data.list;
                }
            }, (response) => {

            })
        }

    }
};
</script>
