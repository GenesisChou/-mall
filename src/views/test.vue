<style lang='sass' scoped>
@import '../assets/scss/variable.scss';


</style>
<template>
<div class='test'>

    <v-load-more></v-load-more>
</div>
</template>
<script >
import vLoadMore from 'components/v_load_more.vue';
import {
    Swipe,
    SwipeItem
} from 'vue-swipe';

export default {
    components: {
        vLoadMore,
        Swipe,
        SwipeItem
    },
    computed: {},
    mounted() {
      // require('https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css');
      // require('https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js');
      // require('https://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js');
    },
    methods: {

    }
}
</script>
