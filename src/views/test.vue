<style lang='sass' scoped>
@import '../assets/scss/variable.scss';

</style>
<template>
    <div class='test'>
      <button class='btn' @click='alert'>alert</button>
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
    alert(){
        this.$store.dispatch('toggleAlert',{
          // type:'img',
          // img:'http://static.justtong.com/uploads/images/goods/20161215/12513458522156ad5b5.png',
          show:true,
          msg:'asdfasdf',
        });
    },
    fuck(){
      console.log('fuck');
    },
    test(){
      console.log('test');
    }
  }
}
</script>
