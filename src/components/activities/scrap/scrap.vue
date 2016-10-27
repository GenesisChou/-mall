<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-scrap {
    position: relative;
    height: pxTorem(600);
    background: url('./images/scrap.png') no-repeat;
    background-size: 100%;
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
    padding: 0;
    width: pxTorem(180);
    height: pxTorem(68);
    line-height: pxTorem(68);
    font-size: pxTorem(30);
    text-indent: pxTorem(12);
    letter-spacing: pxTorem(12);
}

.modal-content {
    width: pxTorem(500);
    height: pxTorem(260);
    padding-top: pxTorem(30);
    .icon {
        width: pxTorem(50);
        height: pxTorem(50);
    }
    .msg {
        line-height: pxTorem(100);
    }
}
</style>
<template>
    <div class='v-scrap '>
        <div id='lotteryContainer'>
            <button class='btn btn-pink' id='start' @click='startActivity'>开始</button>
        </div>
    </div>
    <v-alert :show.sync='modal'  :msg='msg' :btn-text='is_win?"查看":"关闭"' :func='is_win?toOrderDetail:toggleModal'>
    </v-alert>
</template>
<script>
import vAlert from 'components/v_alert'
import Lottery from 'libs/lottery'
export default {

    name: 'scrap',
    props: {
        questions: {
            type: Array,
            default: () => {
                return [];
            }
        },
        activityId: {
            type: String,
            default: ''
        },
        integral: {
            type: String,
            default: '0'
        },
    },
    components: {
        vAlert
    },

    data() {
        return {
            clientWidth: document.documentElement.clientWidth, //设备宽度
            modal: false, //控制弹窗状态
            draw_percent: 0, //画布涂抹面积 大于一定值时触发弹窗
            msg: '', //弹窗消息
            lottery: '', //画布实例
            // integral_enough: false, //判断是否有足够积分进行活动
            activity_start: false, //判断活动状态 1.超出活动次数 2.更新积分失败
            is_win: false, //判断是否中奖
            activity_end: false, //判断活动是否结束
            order_detail_id: '' //活动结束跳转id
        };
    },
    watch: {
        draw_percent(value) {
            if (this.activity_start && value > 40 && !this.activity_end) {
                this.$set('activity_end', true);
                this.toggleModal();
            }
        }
    },
    // computed: {
    //     integral_enough: function() {
    //         return (parseInt(this.$parent.user.integral) - parseInt(this.integral)) >= 0 ? true : false;
    //     }
    // },
    methods: {
        //开始活动
        startActivity() {
            // if(this.integral_enough){
            //     this.getResult();
            // }else{
            //     this.$set('msg','积分不足');
            //     this.toggleModal();
            // }
            this.getResult();

        },
        //设置画布
        setLottery(str) {
            this.lottery = new Lottery('lotteryContainer', '#ddd', 'color', this.pxTorem(500), this.pxTorem(200), (draw_percent) => {
                this.$set('draw_percent', draw_percent);
            });
            this.lottery.init(str, 'text');
        },
        //获取活动结果
        getResult() {
            this.$http.post(`${APP.HOST}/activity_order/${this.activityId}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    this.$parent.getUserInfor(); //更新用户信息
                    this.$set('is_win', data.data.is_win);
                    this.$set('activity_start', true);
                    if (this.is_win) {
                        this.setLottery(data.data.name);
                        this.$set('msg', data.data.name);
                        this.$set('order_detail_id', data.data.id);
                    } else {
                        this.$set('msg', '谢谢参与');
                        this.setLottery('谢谢参与');
                    }
                } else {
                    this.$set('msg', data.info);
                    this.toggleModal();
                }
            })
        },
        //路由跳转
        toOrderDetail() {
            this.$router.go({
                name: 'order_detail',
                query: {
                    order_id: this.order_detail_id
                }
            });
        },
        toggleModal() {
            this.modal = !this.modal;
        },
        pxTorem(value) {
            return value * this.clientWidth / 750;
        },
    },
};
</script>
