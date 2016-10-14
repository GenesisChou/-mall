<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.body {
    padding: 0 pxTorem(55);
    margin: pxTorem(50) 0 pxTorem(150) 0;
}
</style>
<template>
    <div class='activity-detail'>
        <div class='head bg-base'>
            <component :is='game' :questions='detail.question'></component>
        </div>
        <div class='body '>
            <div class='introduction'>
                {{{detail.content}}}
                <!--                 <h1 class='text-huge title'> <strong>活动介绍</strong> </h1>
                <div class='content text-gray'>
                    {{{detail.content}}}
                </div>
                <div class='explation'>
                    <h1 class='text-huge title'><strong>活动规则</strong>  </h1>
                    <div class='content text-gray'>
                        <pre>

                        {{detail|json}}
                        </pre>
                    </div>
                </div> -->
            </div>
        </div>
</template>
<script>
import {
    quiz,
    scrap
} from 'components/games'
import utils from 'libs/utils'
export default {

    name: 'activity_detail',
    components: {
        quiz,
        scrap
    },
    data() {
        return {
            activity_id: '',
            type: '',
            detail: {},
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
                this.$set('detail', data.data);
            }, (response) => {

            })
        }
    },
};
</script>
