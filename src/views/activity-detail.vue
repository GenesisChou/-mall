<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(205);
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    .cover {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: pxTorem(61);
        background: rgba(0, 0, 0, .4);
    }
}
</style>
<template>
    <div class='activity-detail'>
        <div class='head'>
            <img>
            <div class='cover text-white pd10-l flex flex-center-v'>
                <p class='text-large'>活动名称</p>
            </div>
        </div>
        <div class='body pd10-l pd10-r'>
            <div class='introduction'>
                <h1 class='text-large pd10-t pd10-b'> 活动介绍 </h1>
                <div class='content'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quaerat quasi quibusdam dicta repellendus, laboriosam obcaecati pariatur adipisci, at quidem iste ex vel? Commodi, ipsam libero natus nihil, delectus voluptatibus.
                </div>
            </div>
            <div class='explation'>
                <h1 class='text-large pd10-t pd10-b'> 活动规则 </h1>
                <div class='content'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed dolorum saepe sapiente molestias fugit. Assumenda velit, ullam dicta tenetur mollitia, expedita quis laboriosam consequatur, deleniti enim vitae in distinctio. Incidunt.
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from 'libs/utils'
export default {

    name: 'activity-detail',
    data() {
        return {

        };
    },
    created(){
      utils.setTitle('活动详情');
    },
    methods:{
      getActivityDetail(){

      }
    }
};
</script>
