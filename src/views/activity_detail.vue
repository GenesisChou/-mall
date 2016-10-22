<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.body {
    padding: 0 pxTorem(55);
    overflow: hidden;
    .introduction {
        padding: pxTorem(50) 0;
        .title {
            padding: pxTorem(30) 0;
        }
    }
}
</style>
<template>
    <div class='activity-detail'>
        <div class='head bg-base'>
            <component :is='game' :questions='activity_detail.questions' :activity-id='activity_id' :integral='activity_detail.integral'></component>
        </div>
        <div class='body '>
            <div class='introduction'>
                <v-simditor>
                    <template v-if='activity_detail.content'>
                        <v-divider text='详细说明'></v-divider>
                        {{{activity_detail.content}}}
                    </template>
                    <template v-if='activity_detail.content_prob'>
                        <v-divider text='概率说明'></v-divider>
                        {{{activity_detail.content_prob}}}
                    </template>
                </v-simditor>
            </div>
            <v-divider text='奖品列表'></v-divider>
        </div>
        <div class='aword-list'>
            <v-list-item v-for='item in activity_detail.items' :title='item.name' :title-dupty='item.desc' :img='item.pic'></v-list-item>
        </div>
</template>
<script>
import {
    quiz,
    scrap
} from 'components/activities'
import utils from 'libs/utils'
import vListItem from 'components/v_list_item'
import vDivider from 'components/v_divider'
import vSimditor from 'components/v_simditor'
import actions from 'v_vuex/actions'
import getters from 'v_vuex/getters'

export default {

    name: 'activity_detail',
    components: {
        quiz,
        scrap,
        vListItem,
        vDivider,
        vSimditor
    },
    data() {
        return {
            activity_id: '',
            type: '',
            activity_detail: {},
            game: '',
        }
    },
    route: {
        data(transtion) {
            this.$set('activity_id', transtion.to.query.activity_id);
            this.$set('type', transtion.to.query.type);
            if (this.type == 1) {
                this.$set('game', 'scrap');

            } else if (this.type == 2) {
                this.$set('game', 'quiz');
            }
            // this.getUserInfor();
            this.getActivityDetail();
        },
    },
    methods: {
        //获取活动详情
        getActivityDetail() {
            this.$http.post(`${APP.HOST}/activity_detail/${this.activity_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('activity_detail', utils.resizeImg(data.data));
            }, (response) => {

            })
        },
    },
    vuex: {
        actions,
        getters
    }
};
</script>
