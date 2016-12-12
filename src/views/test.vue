<style lang='sass' scoped>
@import '../assets/scss/variable.scss';

</style>
<template>
    <div class='test'>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <v-load-more></v-load-more>
    </div>
</template>
<script >
import vLoadMore from 'components/v_load_more.vue';
import utils from 'libs/utils';
export default {
  components:{
    vLoadMore
  },
  computed:{
  },
  mounted(){
    window.addEventListener('scroll',function(){
      if(utils.touchBottom()){
          console.log('bottom');
      }
    })
      // console.log(this.test);
  },
  methods:{
    fuck(){
      console.log('fuck');
    },
    test(){
      console.log('test');
    }
  }
}
</script>
