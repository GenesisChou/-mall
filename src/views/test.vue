<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.load-more{
  background:$gray-light;
  text-align:center;
  overflow:hidden;
  span{
    color:$gray;
    font-size:pxTorem(30);
    // float:left;
  }
    .spinner{
      transform:scale(0.5);
      position:absolute;
      left:0;
      top:0;
    }
}
</style>
<template>
    <div class='test'>
      <div class="load-more">
          <div class='spinner'>
          <v-spinner></v-spinner>

          </div>
          <span>加载更多</span>
      </div>
    </div>
</template>
<script >
// import 'libs/games/chuck.js'
import vSpinner from 'components/v_spinner.vue';
export default {
  components:{
    vSpinner
  }
}
</script>
