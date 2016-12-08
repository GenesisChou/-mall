<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.activity-detail {
    width: 100%;
    height: 100%;
}

header {
    position: relative;
}
header.expand{
    width: 100%;
    height: 100%;
}

article {
    padding: 0 pxTorem(55);
    overflow: hidden;
    .introduction {
        padding: pxTorem(50) 0;
        .title {
            padding: pxTorem(30) 0;
        }
    }
}

.aword-list {
    .v-list-item:last-child {
        border-bottom: 0;
    }
}
</style>
<template>
    <div class='activity-detail'>
        <header :class='[game_start?"expand":""]'>
            <component :is='activity_type' :questions='activity_detail.questions' :free-times='parseInt(free_times)'></component>
        </header>
        <article>
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
        </article>
        <footer class='aword-list'>
            <v-list-item v-for='item in activity_detail.items' :title='item.name' :title-dupty='item.desc' :img='item.pic'></v-list-item>
        </footer>
</template>
<script>
import {
    quiz,
    scrap,
    game
} from 'components/activities'
import vListItem from 'components/v_list_item.vue'
import vDivider from 'components/v_divider.vue'
import vSimditor from 'components/v_simditor.vue'
import wxConfig from '../wx_config.js'
export default {

    name: 'activity_detail',
    components: {
        quiz,
        scrap,
        game,
        vListItem,
        vDivider,
        vSimditor
    },
    beforeRouteLeave(to, from, next) {
        let game=this.$children[2];
        if(game.start){
            game.stopGame();
        }
        // this.weixin.resetLink();
        next();
    },
    data() {
        return {
            activity_id: '',
            type: '',
            activity_detail: {},
            free_times: '',
            activity_type: '',
            game_start:false,
            weixin:wxConfig()
        }
    },
    mounted() {
        this.activity_id = this.$route.query.activity_id;
        // this.weixin.setLink('activity',this.activity_id);
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
                media_id: APP.MEDIA_ID,
                user_id: APP.USER_ID,
                open_id: APP.OPEN_ID
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
                this.activity_type = 'scrap';
            } else if (type == 2) {
                this.activity_type = 'quiz';
            } else if (type == 3) {
                this.activity_type = 'game';
            }
        },

    }
};
</script>
