<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.body {
    padding: 0 pxTorem(55);
    .introduction{
        padding:pxTorem(50) 0;
    }
}
</style>
<template>
    <div class='activity-detail'>
        <div class='head bg-base'>
            <component :is='game' :questions='activity_detail.questions' :activity-id='activity_id' ></component>
        </div>
        <div class='body '>
            <div class='introduction'>
                {{{activity_detail.content}}}
            </div>
            <v-divider text='奖品列表'></v-divider>
            <ul class='aword-list'>
                <li>
                    <v-list-item v-for='item in activity_detail.items'  :title='item.name' :title-dupty='item.desc' :img='item.pic'></v-list-item>
                </li>
            </ul>
        </div>
</template>
<script>
import {
    quiz,
    scrap
} from 'components/games'
import utils from 'libs/utils'
import vListItem from 'components/v_list_item'
import vDivider from 'components/v_divider'

export default {

    name: 'activity_detail',
    components: {
        quiz,
        scrap,
        vListItem,
        vDivider
    },
    data() {
        return {
            activity_id: '',
            type: '',
            activity_detail: {},
            game: ''
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
            this.getActivityDetail();
        },
    },
    methods: {
        //获取活动详情
        getActivityDetail() {
            this.$http.post(`${APP.HOST}/activity_detail/${this.activity_id}`).then((response) => {
                let data = response.data;
                this.$set('activity_detail', data.data);
            }, (response) => {

            })
        }
    },
};
</script>
