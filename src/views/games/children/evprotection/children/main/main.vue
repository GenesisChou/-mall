<style lang='scss' scoped>
  @import '../../../../../../assets/scss/variable.scss';
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #74beff url('./images/fish.png') repeat-y center 0/auto pxTorem(1200);
    animation: move 8s infinite linear;
  }

  .operation {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: .15rem;
    text-align: center;
    img {
      width: pxTorem(219);
      height: pxTorem(79);
      &:last-child {
        margin-top: pxTorem(10);
      }
    }
    .space {
      height: pxTorem(40);
    }
  }

  .share-notice {
    position: absolute;
    top: pxTorem(-310);
    left: 50%;
    transform: translateX(-50%);
    width: pxTorem(617);
    height: pxTorem(108);
  }

  @keyframes move {
    from {
      background-position-y: 0;
    }
    to {
      background-position-y: pxTorem(1200);
    }
  }
</style>

<template>
  <div class='main'>
    <!-- <h1>
      <button @click='rank_show=true'>rank</button>
      <button @click='stop'>stop</button>
      <button @click='start'>start</button>
    </h1> -->
    <rubbish v-for='item in rubbish' :rubbish.sync='item' :clear-rubbish='clearRubbish' :speed='speed' :key='item.key' :status='status'></rubbish>
    <v-time :time='time' :left-time='left_time'></v-time>
    <score>
      {{score}}分
    </score>
    <character :status='status' :left-time='left_time'></character>
    <rank :show.sync='rank_show' :callback='restart' :rank-list='rank_list'>
      <div slot='operation' class='operation'>
        <img src='./images/repeat.png' @click='restart'>
        <img src='./images/share.png' @click='share_show=true'>
        <br>
        <img v-if='lottery_avaliable' src='./images/redpacket.png' @click='redpacket_show=true'>
        <div v-else class='space'></div>
      </div>
    </rank>
    <redpacket :show.sync='redpacket_show'></redpacket>
    <v-share-guide :show.sync='share_show'>
      <img class='share-notice' src='../images/shareNotice.png'>
    </v-share-guide>
  </div>
</template>
<script>
  import vTime from './components/time'
  import score from './components/score.vue'
  import character from './components/character'
  import rubbish from './components/rubbish'
  import rank from './components/rank'
  import redpacket from './components/redpacket'
  import vShareGuide from 'components/vShareGuide'
  export default {
    components: {
      vTime,
      score,
      character,
      rubbish,
      rank,
      redpacket,
      vShareGuide
    },
    data() {
      return {
        game_id: '',
        time: 60,
        left_time: 0,
        rubbish: [],
        status: 'ready',
        speed: 1,
        score: 0,
        rank_show: false,
        redpacket_show: false,
        share_show: false,
        first_enter: true,
        rank_list: {
          self: {},
          rank: []
        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      lottery_avaliable() {
        return this.$store.state.games.lottery_infor.lottery_show;
      }
    },
    beforeRouteLeave(to, from, next) {
      this.stop();
      this.rubbish = [];
      if (to.path === `/games/${this.game_id}/evprotection`) {
        this.init();
        this.rank_show = false;
        this.redpacket_show = false;
        this.share_show = false;
        this.first_enter = true;
      }
      next();
    },
    activated() {
      this.game_id = parseInt(this.$route.params.id);
      if (this.first_enter === true) {
        this.init();
        this.start();
        this.first_enter = false;
      }
    },
    methods: {
      init() {
        this.score = 0;
        this.speed = 1;
        this.rubbish = [];
        this.left_time = this.time;
      },
      start() {
        if (this.status === 'start') {
          this.restart();
          return;
        }
        this.status = 'start';
        let key = 0,
          speedUp = this.speedUp(),
          timer_1 = setInterval(() => {
            if (this.left_time === 0) {
              clearInterval(timer_1);
              this.stop();
              setTimeout(() => {
                this.submit().then(data => {
                  this.rank_list = data.data;
                  this.rank_show = true;
                });
              }, 1500);
            } else if (this.status === 'stop') {
              clearInterval(timer_1);
            } else {
              this.left_time--;
              speedUp();
            }
          }, 1000),
          timer_3 = setInterval(() => {
            if (this.status === 'stop') {
              clearInterval(timer_3);
            }
          }, 16);
        this.addingRubbish();
      },
      stop() {
        this.status = 'stop';
      },
      addingRubbish(key = 0, time = 1000) {
        const _this = this;
        if (this.status === 'stop') return;
        setTimeout(() => {
          if (this.status !== 'stop') {
            this.addRubbish(key);
            key++;
            this.addingRubbish(key, getTime());
          }
        }, time);

        function getTime() {
          const time = {
              max: 1000,
              min: 350
            },
            end_time = 15,
            interval = (time.max - time.min) / (_this.time - end_time);
          if (_this.left_time <= end_time) {
            return time.min;
          }
          return time.max - (_this.time - _this.left_time) * interval;
        }
      },
      addRubbish(key = 0) {
        this.rubbish.push({
          key,
          click: (key, score) => {
            this.score += score;
          }
        })
      },
      clearRubbish(key) {
        this.rubbish.forEach((item, $index) => {
          if (item.key === key) {
            this.rubbish.splice($index, 1);
          }
        })
      },
      speedUp() {
        /*
            speed:1-10 越大越快
            当剩余时间为15s(可控)时speed(速度)达到最大10
        */
        const speed = {
            min: 1,
            max: 10,
          },
          end_time = 15,
          interval = (speed.max - speed.min) / (this.time - end_time);
        return () => {
          if (this.speed < speed.max) {
            this.speed = speed.min + (this.time - this.left_time) * interval;
          }
        }
      },
      restart() {
        this.stop();
        this.rank_show = false;
        this.init();
        setTimeout(() => {
          this.start();
        }, 1500);
      },
      submit() {
        return new Promise(resolve => {
          this.$store.dispatch('toggleLoading');
          this.$http.post(`${APP.HOST}/game_score_rank/${this.game_id}`, {
            token: APP.TOKEN,
            media_id: APP.MEDIA_ID,
            user_id: APP.USER_ID,
            open_id: APP.OPEN_ID,
            origin: APP.ORIGIN,
            nickname: this.user.nickname,
            headimg: this.user.headimg,
            game_score: this.score
          }).then((response) => {
            this.$store.dispatch('toggleLoading');
            const data = response.data;
            if (data.status === APP.SUCCESS && typeof resolve === 'function') {
              resolve(data);
            }
          }, (response) => {
            this.$store.dispatch('toggleLoading');
          });
        });
      }
    }
  }
</script>