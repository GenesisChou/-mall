<style lang='scss' scoped>
  @import '../../../../../../assets/scss/variable.scss';
  .start {
    width: 100%;
    height: 100%;
    background: #59c6f5 url('./images/main.png') no-repeat left bottom/pxTorem(750) pxTorem(818);
  }

  .title {
    position: absolute;
    left: 3%;
    top: pxTorem(80);
    width: pxTorem(706);
    height: pxTorem(219);
  }

  .kite {
    position: absolute;
    right: 0;
    top: pxTorem(25);
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
    &.gray {
      background: url('./images/grayStart.png') no-repeat 100% 100%/100% 100%;
    }
  }

  .button-rulers {
    position: absolute;
    right: pxTorem(100);
    bottom: pxTorem(106);
    width: pxTorem(245);
    height: pxTorem(119);
    background: url('./images/rulers.png') no-repeat 100% 100%/100% 100%;
  }

  .signature {
    position: absolute;
    text-align: right;
    font-weight: bold;
    right: pxTorem(30);
    top: pxTorem(325);
    color: #f1bb00;
  }
</style>

<template>
  <div class='start'>
    <img class='kite' src='./images/kite.png'>
    <img class='title' src='./images/title.png'>
    <p class='signature'>西湖区科学技术协会<br>西湖区五水共治工作领导小组办公室</p>
    <router-link v-if='avaliable' class='button-start' tag='div' :to='{path:$route.path+"/main",}'></router-link>
    <div v-else class='button-start gray' @click='showNotice'></div>
    <router-link class='button-rulers' tag='div' :to='{path:$route.path+"/rulers",}'></router-link>
    <v-notice :show.sync='notice_show'>
      {{notice}}
    </v-notice>
  </div>
</template>
<script>
  import vNotice from './components/vNotice.vue';
  export default {
    components: {
      vNotice
    },
    computed: {
      avaliable() {
        return this.$parent.play_avaliable;
      },
      notice() {
        return this.$parent.notice;
      }
    },
    data() {
      return {
        notice_show: false
      }
    },
    methods: {
      showNotice() {
        if (this.notice_show === false) {
          this.notice_show = true;
          setTimeout(() => {
            this.notice_show = false;
          }, 2000);
        }
      }
    }
  }
</script>