<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-scrap {
    position: relative;
    height: pxTorem(600);
    // background: url('./images/scrap.png') no-repeat;
    // background-size: 100%;
}

#lotteryContainer {
    position: absolute;
    overflow: auto;
    width: pxTorem(500);
    height: pxTorem(200);
    left: pxTorem(138);
    top: pxTorem(310);
    background: $gray-light;
}

#start {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);

    padding: 0;
    width: pxTorem(180);
    height: pxTorem(68);
    line-height: pxTorem(68);
    font-size: pxTorem(30);
    text-indent: pxTorem(12);
    letter-spacing: pxTorem(12);
}

.free-time-message{
  position:absolute;
  left:50%;
  top:75%;
  transform: translateX(-45%);
  -moz-transform: translateX(-45%);
  -webkit-transform: translateX(-45%);
  -o-transform: translateX(-45%);
  z-index:2;
}

</style>
<template>
    <div class='v-scrap' :style='bg_img'>
        <div id='lotteryContainer'>
            <button class='btn btn-red' id='start' @click='startActivity'>开始</button>
        </div>
        <div v-if='!activity_start' class='free-time-message'>{{notice}}</div>
    </div>
</template>
<script>
import Lottery from 'libs/lottery.js'
export default {

    name: 'scrap',
    props: {
        freshFreeTimes:Function,
        activityDetail:Object,
        id:Number,
        notice:String,
        toOrderDetail:Function
    },
    computed:{
        bg_img(){
          return {
            background:'url('+this.activityDetail.pic_banner+')',
            backgroundSize:'100% 100%'
          }
        }
    },
    data() {
        return {
            client_width: document.documentElement.clientWidth, //设备宽度
            modal: false, //控制弹窗状态
            draw_percent: 0, //画布涂抹面积 大于一定值时触发弹窗
            alert: {
                msg: '',
                callback:function(){}
            },
            lottery: '', //画布实例
            activity_start: false, //判断活动状态 1.超出活动次数 2.更新积分失败
            is_win: false, //判断是否中奖
            activity_end: false, //判断活动是否结束
        };
    },
    watch: {
        draw_percent(value) {
            if (this.activity_start && value > 40 && !this.activity_end) {
                this.activity_end = true;
                this.$store.dispatch('toggleAlert',this.alert);
            }
        }
    },
    methods: {
        //开始活动
        startActivity() {
            this.getResult();
        },
        //设置画布
        setLottery(str) {
            this.lottery = new Lottery('lotteryContainer', '#ddd', 'color', this.pxTorem(500), this.pxTorem(200), (draw_percent) => {

                this.draw_percent = draw_percent;
            });
            this.lottery.init(str, 'text');
        },
        //获取活动结果
        getResult() {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/activity_order/${this.id}`, {
                token: APP.TOKEN,
                user_id: APP.USER_ID
            }).then((response) => {
                this.$store.dispatch('toggleLoading');

                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    this.freshFreeTimes();
                    this.$store.dispatch('getUserInfor'); //更新用户信息
                    this.is_win = data.data.is_win;
                    this.activity_start = true;
                    if (this.is_win) {
                        this.setLottery(data.data.name);
                        this.alert = {
                            type:'img',
                            img:data.data.pic_thumb,
                            msg: '获得'+data.data.name,
                            callback: this.toOrderDetail(data.data.id),
                            btn_text: '查看'
                        };
                    } else {
                        this.alert.msg = data.data.name;
                        this.setLottery('谢谢参与');
                    }
                } else {
                    this.$store.dispatch('toggleAlert',{
                      msg:data.info
                    })
                }
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            })
        },
        pxTorem(value) {
            return value * this.client_width / 750;
        },
    },
};
</script>
