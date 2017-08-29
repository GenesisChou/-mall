<style lang='scss' scoped>
  @import '../../../../../../assets/scss/variable.scss';
  .main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #74beff url('./images/fish.png') 0 0;
    background-size: pxTorem(733) pxTorem(981);
  }
</style>

<template>
  <div class='main'>
    <h1>{{status}}</h1>
    <!-- <rubbish v-for='item in rubbish' :rubbish='item' :clear-rubbish='clearRubbish' :key='item.key'></rubbish> -->
    <v-time :time='time' :left-time='left_time'></v-time>
    <score>
      {{score}}分
    </score>
    <character></character>
  </div>
</template>
<script>
  import vTime from './components/time'
  import score from './components/score.vue'
  import character from './components/character'
  import rubbish from './components/rubbish'
  export default {
    components: {
      vTime,
      score,
      character,
      rubbish
    },
    data() {
      return {
        time: 50,
        left_time: 0,
        rubbish: [],
        status: 'ready',
        speed: 0,
        score: 0
      }
    },
    computed: {},
    watch: {},
    beforeRouteLeave(to, from, next) {},
    created() {
      this.status = 'start';
      this.left_time = this.time;
      let timer = setInterval(() => {
        this.left_time--;
        if (this.left_time === 0) {
          clearInterval(timer);
          this.stop();
        }
      }, 1000);
      this.speedUp();
    },
    methods: {
      stop() {
        this.status = 'stop';
      },
      speedUp() {},
      rubbishAddSpeedUp() {},
      recordingTime() {},
      addingRubbish(key = 0) {},
      stopAddingRubbish() {},
      clearRubbish(key) {},
      getSpeedInterval() {},
      getRubbishAddInterval() {},
    }
  }
</script>