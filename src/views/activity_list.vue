<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.load-more {
    height: pxTorem(90);
}

.search-box {
    padding: pxTorem(17) pxTorem(30);
    position: fixed;
}
.fill{
    height: pxTorem(100);
}
</style>
<template>
    <div class='activity-list'>
        <div class='search-box bg-base'>
            <v-search :search='searchActivity' :params.sync='params'></v-search>
        </div>
        <div class='fill'></div>
        <v-list-item v-for='activity in activity_list' v-link='{name:"activity_detail",query:{activity_id:activity.id,type:activity.type}}' :title='activity.name' :title-dupty='(activity.integral|parseInt)+"积分"'  :img='activity.pic_thumb'></v-list-item>        
        <v-back-top></v-back-top>
        <!-- <div class='load-more text-large  text-sliver flex flex-center-h flex-center-v'>上滑加载更多</div> -->
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSearch from 'components/v_search'
import vListItem from 'components/v_list_item'
import vBackTop from 'components/v_back_top'
export default {

    name: 'activity_list',
    components: {
        vListItem,
        vSearch,
        vBackTop
    },
    data() {
        return {
            activity_list: [],
            params: {
                sword: '',
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID
            },

        };
    },
    route: {
        data() {
            this.getActivityList();
            utils.getScrollData(this.activity_list, this.params, this.getActivityList);
        }
    },
    methods: {
        //获取活动列表
        getActivityList() {
            this.searchActivity(this.params, (data) => {
                let activity_list = this.activity_list;
                if (this.params.p <= 1) {
                    this.$set('params.total', data.data.total);
                    this.$set('params.count', data.data.count);
                }
                this.$set('activity_list', data.data.list.concat(activity_list));
            })
        },
        //搜索活动
        searchActivity(params = this.params, func) {
            this.$http.post(`${APP.HOST}/all_activity`, params).then((response) => {
                let data = response.data;
                if (typeof func === 'function') {
                    func(data);
                } else {
                    this.$set('activity_list', data.data.list);
                }
            }, (response) => {

            });
        }
    }
};
</script>
