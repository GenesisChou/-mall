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
    <div class='activity-list'>
        <div class='search-box bg-base'>
            <v-search placeholder='请输入关键字进行过滤'></v-search>
        </div>
        <v-list-item v-for='activity in activity_list' v-link='{name:"activity_detail",query:{id:activity.id,type:activity.type}}' :title='activity.name' :title-dupty=`${activity.integral|parseInt}积分` img='../src/assets/images/activity-1.png'></v-list-item>
        <div class='load-more text-large  text-sliver flex flex-center-h flex-center-v'>上滑加载更多</div>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSearch from 'components/v_search'
import vListItem from 'components/v_list_item'
export default {

    name: 'activity_list',
    components: {
        vListItem,
        vSearch
    },
    data() {
        return {
          activity_list:[]
        };
    },
    route: {
        data() {
            this.getActivityList();
        }
    },
    methods: {
        //获取活动列表
        getActivityList() {
          this.$http.post(`${APP.HOST}/all_activity`,{sword:''}).then((response)=>{
            let data=response.data;
            this.$set('activity_list',data.info.list);
          },(response)=>{

          });
        },
        //搜索活动
        searchActivity() {

        }
    }
};
</script>
