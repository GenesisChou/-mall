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
    <div class='activity-list'>
        <div class='search-box bg-base'>
            <v-search :search='searchActivity' :params.sync='params'></v-search>
        </div>
        <div class='fill'></div>
        <router-link :to='{name:"activity_detail",query:{activity_id:activity.id,type:activity.type}}' v-for='activity in activity_list'>
            <v-list-item :title-dupty='(activity.integral|parseInt)+"积分"' :img='activity.pic_thumb'></v-list-item>
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
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID
            },

        };
    },
    mounted() {
        this.getActivityList();
        utils.getScrollData(this.activity_list, this.params, this.getActivityList);
    },
    methods: {
        //获取活动列表
        getActivityList() {
            this.searchActivity(this.params, (data) => {
                let activity_list = this.activity_list;
                if (this.params.p <= 1) {
                    this.params.total = data.data.total;
                    this.params.count = data.data.count;
                }
                this.activity_list = data.data.list.concat(activity_list);
            })
        },
        //搜索活动
        searchActivity(params = this.params, callback) {
            this.$http.post(`${APP.HOST}/all_activity`, params).then((response) => {
                let data = response.data;
                if (callback) {
                    callback(data);
                } else {
                    this.activity_list = data.data.list;
                }
            }, (response) => {

            });
        }
    }
};
</script>
