<template>
  <div id='app'>
      <router-view ></router-view>
  </div>
</template>

<script>
import 'assets/scss/common.scss'
import 'assets/scss/reset.scss'
export default {
  created(){
    (function(){
    var scale = 1 / devicePixelRatio;
    document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
    })();
  },
}
</script>