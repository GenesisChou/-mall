<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.load-more {
    height: pxTorem(90);
}

.search-box {
    padding: pxTorem(17) pxTorem(30);
}
</style>
<template>
    <div class='product-list'>
        <div class='search-box bg-base'>
            <v-search  :search='getProductList' :params.sync='params'></v-search>
        </div>
        <v-list-item v-for='product in product_list' v-link='{name:"product_detail",query:{id:product.id}}' :title='product.name' :title-dupty=`${product.integral|parseInt}积分` img='../src/assets/images/product-1.png'></v-list-item>

        <div class='load-more text-large  text-sliver flex flex-center-h flex-center-v'>上滑加载更多</div>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSearch from 'components/v_search'
import vListItem from 'components/v_list_item'
export default {

    name: 'product_list',
    components: {
        vListItem,
        vSearch
    },
    data() {
        return {
            product_list:[],
            params:{
                sword:'',
                p:1
            }
        };
    },
    route: {
        data(transition) {

            this.getProductList();
        }
    },
    methods: {
        //获取商品列表
        getProductList(params=this.params) {
            this.$http.post(`${APP.HOST}/all_product`,params).then((response) => {
                let data = response.data;
                this.$set('product_list', data.data.list);
            }, (response) => {

            })
        },
        //搜索商品
        searchproduct() {

        }

    }
};
</script>
