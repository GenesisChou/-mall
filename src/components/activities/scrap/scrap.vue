<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-scrap {
    position: relative;
    height: pxTorem(600);
    background-image: url('./images/scrap.png');
    background-size: 100%;
}

#lotteryContainer {
    position: absolute;
    overflow: auto;
    width: pxTorem(500);
    height: pxTorem(200);
    left: pxTorem(138);
    top: pxTorem(310);
    background: #ddd;
}

#start {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
            <button class='btn btn-pink' id='start' @click='startActivity'>开始活动</button>
        </div>
    </div>
    <v-alert :show.sync='modal' :type='state.start?true:false' :msg='state.start?"你中奖了":"积分不足"' :btn-text='state.start?"查看":"关闭"' :func='state.start?toOrderDetail:toggleModal'>
    </v-alert>
</template>
<script>
import vAlert from 'components/v_alert'
import Lottery from 'libs/lottery'
import {
    actions
} from 'v_vuex/actions'
import {
    getters
} from 'v_vuex/getters'
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
            drawPercent: 0,
            modal: false,
            result: {},
            lottery: '',
            state: {
                start: false,
                end: false
            },
           clientWidth:document.documentElement.clientWidth,
        };
    },
    watch: {
        drawPercent(value) {
            if (!this.state.end && value >= 40 && this.result.is_win) {
                this.state.end = true;
                this.toggleModal();
            }
        }
    },
    computed: {
        start_enble: function() {
            return (parseInt(this.$parent.user.integral) - parseInt(this.integral)) >= 0 ? true : false;
        }
    },
    methods: {
        //开始活动
        startActivity() {
            this.$set('state.start', this.start_enble);
            if (this.state.start) {
                this.$parent.setUser();
                this.getResult();
                this.setLottery();
            } else {
                this.toggleModal();
            }
        },
        setLottery() {
            this.lottery = new Lottery('lotteryContainer', '#ddd', 'color', this.pxTorem(500), this.pxTorem(200), (drawPercent) => {
                this.$set('drawPercent', drawPercent);
                this.drawPercent = drawPercent;
            });
            this.lottery.init('谢谢参与', 'text');
        },
        //获取结果
        getResult() {
            this.$http.post(`${APP.HOST}/activity_order/${this.activityId}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    this.$set('result', data.data);
                    if (this.result.is_win) {
                        this.lottery.setText(this.result.name);
                    }
                } else {
                    this.$set('result.is_win', false);
                }
            })
        },
        //路由跳转
        toOrderDetail() {
            this.$router.go({
                name: "order_detail",
                query: {
                    order_id: this.result.id
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
    vuex: {
        getters,
        actions
    }
};
</script>
