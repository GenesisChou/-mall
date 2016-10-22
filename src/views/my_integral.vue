<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(388);
    .main {
        position: relative;
        height: pxTorem(288);
        background-image: url('../assets/images/my_integral/my_integral.png');
        background-repeat: no-repeat;
        background-size: 100%;
        .title {
            position: absolute;
            left: pxTorem(38);
            top: pxTorem(18);
        }
        .number {
            font-size: pxTorem(60);
        }
    }
    .event {
        height: pxTorem(100);
        font-size: pxTorem(30);
        .icon {
            width: pxTorem(50);
            height: pxTorem(47);
            margin-right: pxTorem(28);
        }
    }
}

.record-list {
    padding-top: pxTorem(30);
    > li {
        height: pxTorem(100);
        padding: 0 pxTorem(38);
        border-bottom: 1px solid $gray-light;
    }
    .detail {
        line-height: 0.5rem;
    }
}

.modal-content {
    flex-direction: column;
    width: pxTorem(600);
    padding: pxTorem(50) pxTorem(68);
    border-radius: pxTorem(5);
    p {
        line-height: 1rem;
    }
    button {
        margin-top: pxTorem(90);
    }
}
</style>
<template>
    <div class='my_integral'>
        <div class='head text-center'>
            <div class='main  flex flex-center-v flex-center-h'>
                <p class='title text-white text-large'>当前积分余额:</p>
                <span class=' text-white number' v-text='user.integral|parseInt'></span>
            </div>
            <div class='event flex flex-center-v '>
                <div class='flex-item flex flex-center-v flex-center-h' @click='toggleModal'>
                    <img class='icon' src='../assets/images/store.png'> <span class='text-large'>赚取积分</span>
                </div>
                <div class='flex-item flex flex-center-v flex-center-h' v-link='{name:"order_list"}'>
                    <img class='icon' src='../assets/images/record.png'><span class='text-large'>兑换记录</span>
                </div>
            </div>
        </div>
        <div class='body'>
            <v-block-text text='积分明细' type='text-gray'></v-block-text>
            <ul class='record-list'>
                <li v-for='item in integral_list' class='flex flex-space-between flex-center-v'>
                    <div class='detail'>
                        <span class='text-large'>{{item.name}}</span>
                        <p class='text-gray text-small'>
                            {{item.create_time}}
                        </p>
                    </div>
                    <div class='text-large flex flex-center-v'>{{getPoint(item.point)}} </div>
                </li>
            </ul>
        </div>
        <v-modal :show.sync='modal'>
            <div class='modal-content flex flex-space-between bg-white'>
                <div class='text-large'>
                    <p>您可以通过以下途径赚取积分：</p>
                    <p v-for='item in integral_param'>{{($index+1+'、')+item.name+' +'+item.value}}</p>
                </div>
                <p class='text-center'>
                    <button class='btn btn-blue' @click='toggleModal'>知道了</button>
                </p>
            </div>
        </v-modal>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vModal from 'components/v_modal'
import vBlockText from 'components/v_block_text'
import vBackTop from 'components/v_back_top'
import filters from 'libs/filters'
import actions from 'v_vuex/actions'
import getters from 'v_vuex/getters'
export default {
    name: 'my_integral',
    components: {
        vBlockText,
        vModal,
        vBackTop
    },
    data() {
        return {
            modal: false,
            integral_list: [], //积分明细列表
            integral_param: [] //获取积分的途径
        };
    },
    route: {
        data(transition) {
            this.getUserInfor();
            this.getIntegralList();
            this.getIntegralParam();
        },

    },
    methods: {
        //获取积分赚取分数
        getIntegralParam() {
            this.$http.post(`${APP.HOST}/get_integral_param`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('integral_param', data.data);
            }, (response) => {

            })

        },
        //获取积分明细
        getIntegralList() {
            this.$http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('integral_list', data.data);
            })
        },
        getPoint(point) {
            point = parseInt(point);
            if (point > 0) {
                point = `+${point}`;
            } else if (!point) {
                point = `+0`;
            }
            return point;
        },
        toggleModal() {
            this.modal = !this.modal;
        }
    },
    filters,
    vuex: {
        actions,
        getters
    }
};
</script>
