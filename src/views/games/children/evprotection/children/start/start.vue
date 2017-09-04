<style lang='scss' scoped>
  @import '../../../../../../assets/scss/variable.scss';
  .start {
    width: 100%;
    height: 100%;
    background: #59c6f5 url('./images/main.png') no-repeat left bottom/pxTorem(750) pxTorem(818);
  }

  .title {
    position: absolute;
    left: 5%;
    top: pxTorem(145);
    width: pxTorem(635);
    height: pxTorem(226);
  }

  .kite {
    position: absolute;
    right: 0;
    top: 0;
    width: pxTorem(402);
    height: pxTorem(783);
  }

  .button-start {
    position: absolute;
    left: pxTorem(100);
    bottom: pxTorem(106);
    width: pxTorem(236);
    height: pxTorem(112);
    background: url('./images/start.png') no-repeat 100% 100%/100% 100%;
  }

  .button-rulers {
    position: absolute;
    right: pxTorem(100);
    bottom: pxTorem(106);
    width: pxTorem(245);
    height: pxTorem(119);
    background: url('./images/rulers.png') no-repeat 100% 100%/100% 100%;
  }
</style>

<template>
  <div class='start'>
    <img class='kite' src='./images/kite.png'>
    <img class='title' src='./images/title.png'>
    <router-link class='button-start' tag='div' :to='{path:$route.path+"/main",}'></router-link>
    <router-link class='button-rulers' tag='div' :to='{path:$route.path+"/rulers",}'></router-link>
  </div>
</template>