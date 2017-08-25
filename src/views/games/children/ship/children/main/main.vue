<style lang='scss' scoped>
  @import '../../../../scss/variable.scss';
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
    <rubbish v-for='item in rubbish' :rubbish='item' :clear-rubbish='clearRubbish' :key='item.key'></rubbish>
    <v-time></v-time>
    <score></score>
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
        full_time: 50,
        rubbish: [],
        adding: true,
        rubbish_add_interval: '',
        speed_interval: '',
      }
    },
    computed: {
      status() {
        return this.$store.state.ship.status;
      },
      time() {
        return this.$store.state.ship.time;
      }
    },
    watch: {
      status(value) {
        if (value === 'start') {
          this.recordingTime();
          this.addingRubbish();
        } else if (value === 'stop') {
          this.stopAddingRubbish();
        } else if (value === 'ready') {

        }
      },
      time(value) {
        this.rubbishAddSpeedUp();
        this.speedUp();
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch('ship/updateStatus', 'stop');
      this.init();
      next();
    },
    created() {
      this.init();
      this.$store.dispatch('ship/updateStatus', 'start');
    },
    methods: {
      init() {
        this.$store.dispatch('ship/updateTime', this.full_time);
        this.$store.dispatch('ship/setSpeed', {
          min: 2,
          max: 20,
        });
        this.$store.dispatch('ship/setRubbishAddSpeed', {
          min: 200,
          max: 1200
        });
        this.rubbish_add_interval = this.getRubbishAddInterval();
        this.speed_interval = this.getSpeedInterval();
      },
      recordingTime() {
        let time = this.full_time,
          timer = setInterval(() => {
            if (time <= 0) {
              clearInterval(timer);
              this.$store.dispatch('ship/updateStatus', 'stop');
            } else {
              this.$store.dispatch('ship/updateTime', --time);
            }
          }, 1000);
      },
      addingRubbish(key = 0) {
        if (this.adding !== true) return;
        setTimeout(() => {
          this.rubbish.push({
            key,
            show: true
          });
          key++;
          this.addingRubbish(key);
        }, this.$store.state.ship.rubbish_add_speed.current)
      },
      stopAddingRubbish() {
        this.adding = false;
      },
      clearRubbish(key) {
        this.rubbish.forEach((element, $index) => {
          if (element.key === key) {
            this.rubbish.splice($index, 1)
          }
          return;
        });
      },
      getSpeedInterval() {
        const speed = this.$store.state.ship.speed,
          min = speed.min,
          max = speed.max;;
        if (this.full_time > 0) {
          return (max - min) / this.full_time;
        }
        return 0;
      },
      getRubbishAddInterval() {
        const speed = this.$store.state.ship.rubbish_add_speed,
          min = speed.min,
          max = speed.max;
        if (this.full_time > 0) {
          return (max - min) / this.full_time;
        }
        return 0;
      },
      speedUp() {
        this.$store.dispatch('ship/updateSpeed', this.$store.state.ship.speed.current + this.speed_interval);
      },
      rubbishAddSpeedUp() {
        this.$store.dispatch('ship/updateRubbishAddSpeed', this.$store.state.ship.rubbish_add_speed.current - this.rubbish_add_interval);
      }
    }
  }
</script>