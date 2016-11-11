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
            <component :is='game' :questions='activity_detail.questions' @getFreeTimes="getFreeTimes" :free-times='parseInt(free_times)'></component>
        </div>
        <div class='body '>
            <div class='introduction'>
                <v-simditor>
                    <template v-if='activity_detail.content'>
                        <v-divider text='详细说明'></v-divider>
                        <section v-html='activity_detail.content'></section>
                    </template>
                    <template v-if='activity_detail.content_prob'>
                        <v-divider text='概率说明'></v-divider>
                        <section v-html='activity_detail.content_prob'></section>
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
import vListItem from 'components/v_list_item.vue'
import vDivider from 'components/v_divider.vue'
import vSimditor from 'components/v_simditor.vue'

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
            free_times: '',
            game: '',
        }
    },
    mounted() {
        this.activity_id = this.$route.query.activity_id;
        this.getActivityDetail();
    },
    methods: {
        //获取活动详情
        getActivityDetail() {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/activity_detail_l/${this.activity_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.$store.dispatch('toggleLoading');
                let data = response.data;
                this.activity_detail = data.data;
                this.loadActivity(data.data.type);
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            })
        },
        //获取免费活动次数
        getFreeTimes() {
            this.$http.post(`${APP.HOST}/get_free_times/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                activity_id: this.activity_id
            }).then((response) => {
                this.free_times = response.data.data.free_times;
            }, (response) => {

            })

        },
        //载入活动
        loadActivity(type) {
            if (type == 1) {
                this.game = 'scrap';
            } else if (type == 2) {
                this.game = 'quiz';
            }
        }

    }
};
</script>
