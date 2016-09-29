<style lang='sass' scoped>
@import '../assets/scss/variable.scss';

.body {
    padding: 0 pxTorem(55);
    .title {
        margin: pxTorem(50) 0 pxTorem(30) 0;
    }
    .content {
        text-align: justify;
    }
}
</style>
<template>
    <div class='activity-detail'>
        <div class='head bg-base'>
            <component :is='game'></component>
        </div>
        <div class='body '>
            <div class='introduction'>
                <h1 class='text-huge title'> <strong>活动介绍</strong> </h1>
                <div class='content text-gray'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quaerat quasi quibusdam dicta repellendus, laboriosam obcaecati pariatur adipisci, at quidem iste ex vel? Commodi, ipsam libero natus nihil, delectus voluptatibus.
                </div>
            </div>
            <div class='explation'>
                <h1 class='text-huge title'><strong>活动规则</strong>  </h1>
                <div class='content text-gray'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed dolorum saepe sapiente molestias fugit. Assumenda velit, ullam dicta tenetur mollitia, expedita quis laboriosam consequatur, deleniti enim vitae in distinctio. Incidunt.
                </div>
            </div>
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

    name: 'activity-detail',
    components: {
        quiz,
        scrap
    },
    route: {
        data(transtion) {
            if (transtion.to.query.game) {
                this.game = transtion.to.query.game;
            }
        },
    },
    data() {
        return {
            game: 'quiz'
        }
    },
    methods: {
        getActivityDetail() {

        }
    }
};
</script>
