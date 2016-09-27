<template>
    <div class='bg-gray'>
        <div style='padding:.4rem'>
          <v-search placeholder='请输入关键字进行过滤'></v-search>
        </div>
        <div class='border-t-1'>
            <v-list-item v-for='i in 7' v-link='{name:"goods-detail"}' title='商品名称' title-dupty='200积分'></v-list-item>
        </div>
        <div class='pd10-t pd10-b text-center text-sliver'>上滑加载更多</div>
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
    created(){
      utils.setTitle('商品列表');
    },
    methods:{
      //获取商品列表
      getGoodsList(){

      },
      //搜索商品
      searchGoods(){

      }

    }
};
</script>
