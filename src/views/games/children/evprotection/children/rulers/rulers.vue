<style lang='scss' scoped>
  @import '../../../../../../assets/scss/variable.scss';
  .rulers {
    width: 100%;
    height: 100%;
    background: #59c6f5;
  }

  .cloud-1 {
    position: absolute;
    left: 0;
    top: pxTorem(-70);
    width: pxTorem(725);
    height: pxTorem(255);
  }

  .cloud-2 {
    position: absolute;
    left: 0;
    bottom: pxTorem(90);
    width: pxTorem(750);
    height: pxTorem(219);
  }

  .content {
    position: absolute;
    left: 0;
    top: pxTorem(130);
    width: pxTorem(691);
    height: pxTorem(914);
    background: url('./images/content.png') no-repeat center center/100% 100%;
    .raiders {
      position: absolute;
      left: 0;
      top: -13%;
      width: pxTorem(375);
      height: pxTorem(181);
    }
    .boy {
      position: absolute;
      right: -9%;
      bottom: -4%;
      width: pxTorem(184);
      height: pxTorem(477);
    }
    .back {
      position: absolute;
      left: 0;
      bottom: -4%;
      width: pxTorem(239);
      height: pxTorem(142);
    }
  }

  .sand {
    position: absolute;
    bottom: 0;
    width: pxTorem(750);
    height: pxTorem(143);
  }
</style>

<template>
  <div class='rulers'>
    <img class='cloud-1' src='./images/cloud1.png'>
    <img class='cloud-2' src='./images/cloud2.png'>
    <div class='content'>
      <img class='raiders' src='./images/raiders.png'>
      <img class='boy' src='./images/boy.png'>
      <img class='back' src='./images/back.png' @click='back'>
    </div>
    <img class='sand' src='./images/sand.png'>
  </div>
</template>
<script>
  export default {
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>