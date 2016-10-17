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
    padding-top: pxTorem(31);
    .icon {
        width: pxTorem(50);
        height: pxTorem(50);
    }
    .msg {
        line-height: pxTorem(101);
    }
}
</style>
<template>
    <div class='v-scrap '>
        <p>已刮开 <span class='text-white'>{{drawPercent}}%</span> 区域。</p>
        <div id='lotteryContainer'>
            <button class='btn btn-pink' id='start' @click='startActivity'>开始活动</button>
        </div>
    </div>
    <v-modal :show.sync='modal'>
        <div class='modal-content text-center'>
            <img v-if='is_win' class='icon' src='../../../assets/images/correct-hollow.png' />
            <img v-else class='icon' src='../../../assets/images/error-hollow.png' />
            <h2 class='text-large msg'>{{result.desc}}</h2>
            <button v-if='!is_win' class='btn btn-pink' @click='toggleModal'>关闭</button>
            <button v-else class='btn btn-pink'>查看</button>
        </div>
    </v-modal>
</template>
<script>
import vModal from 'components/v_modal'
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
        }
    },
    components: {
        vModal
    },
    data() {
        return {
            drawPercent: 0,
            modal: false,
            is_win: false,
            result: {},
            end:false
        };
    },
    watch: {
        drawPercent(value) {
            if (!this.end&&value >= 40) {
                this.end=true;
                this.toggleModal();
            }
        }
    },
    methods: {
        startActivity() {
            this.setLottery();
            this.getResult();
        },
        setLottery() {
            var lottery = new Lottery('lotteryContainer', '#ddd', 'color', this.pxTorem(500), this.pxTorem(200), (drawPercent) => {
                this.$set('drawPercent', drawPercent);
                this.drawPercent = drawPercent
            });
            lottery.init('how are you ', 'text');
        },
        getResult() {
            this.$http.post(`${APP.HOST}/activity_order/${this.activityId}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                console.log(data);
                if (data.status == APP.SUCCESS) {

                    this.$set('is_win', data.data.is_win||false);
                    this.$set('result', data.data.item);
                } else {
                    this.$set('is_win', false);
                    this.$set('result.desc', data.info);
                }
            })
        },
        toggleModal() {
            this.modal = !this.modal;
        },
        pxTorem(value) {
            let clientWidth = document.documentElement.clientWidth;
            return value * clientWidth / 750;
        },
    }
};
</script>
