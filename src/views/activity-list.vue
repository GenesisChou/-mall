<template>
    <div class='bg-gray'>
        <div style='padding:.4rem'>
          <v-search placeholder='请输入关键字进行过滤'></v-search>
        </div>
        <div class='border-t-1'>
            <v-list-item v-for='i in 7' v-link='{name:"activity-detail"}' title='刮刮卡' title-dupty='这是个活动副标题'></v-list-item>
        </div>
        <div class='pd10-t pd10-b text-center text-sliver'>上滑加载更多</div>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSearch from 'components/v-search'
import vListItem from 'components/v-list-item'
export default {

    name: 'activity-list',
    components: {
        vListItem,
        vSearch
    },
    data() {
        return {

        };
    },
    created(){
      utils.setTitle('活动列表');
    },
    methods:{
      //获取活动列表
      getActivityList(){

      },
      //搜索活动
      searchActivity(){

      }
    }
};
</script>
