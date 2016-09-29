<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
  .load-more{
    height:pxTorem(90);
  }
  .search-box{
    padding:pxTorem(17) pxTorem(30);
  }
</style>
<template>
    <div class='goods-list'>
        <div class='search-box bg-base'>
            <v-search placeholder='请输入关键字进行过滤'></v-search>
        </div>
        <v-list-item v-for='i in 7' v-link='{name:"goods-detail"}' :color=true title='商品名称' title-dupty='200积分' img='../src/assets/images/goods-1.png'></v-list-item>
        <div class='load-more text-large  text-sliver flex flex-center-h flex-center-v'>上滑加载更多</div>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSearch from 'components/v-search'
import vListItem from 'components/v-list-item'
export default {

    name: 'goods-list',
    components: {
        vListItem,
        vSearch
    },
    data() {
        return {

        };
    },
    created() {
        utils.setTitle('商品列表');
    },
    methods: {
        //获取商品列表
        getGoodsList() {

        },
        //搜索商品
        searchGoods() {

        }

    }
};
</script>
