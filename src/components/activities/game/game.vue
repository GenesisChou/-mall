<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.game {
    width: 100%;
    height:pxTorem(720);
    background-repeat:no-repeat;
    background-position:center;
}

.start {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    padding: 0;
    width: pxTorem(268);
    height: pxTorem(106);
    font-size: pxTorem(30);
    background:url('./images/start.png');
    background-size:pxTorem(284) pxTorem(126);
    background-repeat:no-repeat;
    background-position-x:inherit;
    z-index:2;
}
.cover{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background-color:rgba(0,0,0,.5);
  z-index:1;
}
.free-time-message{
  position:absolute;
  color:$white;
  left:50%;
  top:65%;
  transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  z-index:2;
}
</style>
<template>
    <div class='game' :style='bg_img'>
        <canvas id="canvas"></canvas>
        <div v-if='!start' class='start' @click='startGame'></div>
        <div v-if='!start' class='cover'></div>
        <div v-if='!start' class='free-time-message'>{{notice}}</div>
    </div>
</template>
<script>
// import './game.js';
export default {
    components: {},
    props:{
        freshFreeTimes:Function,
        activityDetail:Object,
        id:Number,
        notice:String,
        toOrderDetail:Function
    },
    data() {
        return {
            game:'',
            start: false,
            is_win: false,
            order_detail_id: '', //活动结束跳转id
            alert: {
                msg: '谢谢参与',
                btn_text: '关闭',
                callback: function() {}
            },
            bg_img:''
        }
    },
    watch: {
        start(value) {
            if (value) {
                AIR.Game.startGame('#canvas');
                AIR.Game.gameOver((score) => {
                    this.$store.dispatch('toggleAlert',this.alert);
                });
            }
        }
    },
    activated(){
      this.getGameDetail(this.activityDetail.game_id);
    },
    deactivated(){
        if(this.start){
          this.stopGame();
          console.log('game stopped');
        }
    },
    methods: {
        getGameDetail(game_id){
          this.$http.post(`${APP.HOST}/game_detail/${game_id}`, {
              token: APP.TOKEN,
              user_id: APP.USER_ID
          }).then((response) => {
            let data=response.data;
            this.bg_img={
              background:'url('+data.data.pic+')',
              backgroundSize:'100% 100%'
            };
            if(data.data.name=='开心消消乐'){
              this.game=require('http://m.goldmiao.com/yngame/3x.min.js');
            }else if(data.data.name=='棍子忍者'){
              this.game=require('http://m.goldmiao.com/yngame/uWr5e32D.min.js');
            }else if(data.data.name=='逝去的青春'){
              this.game=require('http://m.goldmiao.com/yngame/o3KdlWed.min.js');
            }
          })
        },
        startGame() {
            if(!this.game){
              this.$store.dispatch('toggleAlert',{
                msg:'该活动已下架'
              });
              return;
            }
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/game_activity/${this.id}`, {
                token: APP.TOKEN,
                user_id: APP.USER_ID
            }).then((response) => {
                this.$store.dispatch('toggleLoading');
                let data = response.data;
                if(data.status==APP.SUCCESS){
                  this.freshFreeTimes();
                  this.$store.dispatch('getUserInfor');
                  this.is_win = data.data.is_win;
                  this.$parent.game_start=true;
                  this.start = true;
                  if (this.is_win) {
                      this.alert = {
                          type:'img',
                          img:data.data.pic_thumb,
                          msg: '获得'+data.data.name,
                          callback: this.toOrderDetail(data.data.id),
                          btn_text: '查看'
                      };
                  }
                }else{
                  this.$store.dispatch('toggleAlert',{
                    msg:data.info
                  })
                }
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            })
        },
        stopGame() {
            AIR.Game.stopGame();
        },

    }
}
</script>
